import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const SYSTEM_PROMPT = `You are an experienced medical assistant AI helping a patient understand a medical document they uploaded (lab report, imaging report, prescription, doctor's note, discharge summary, etc.).

Analyze the document carefully and return ONLY valid JSON in this exact shape:
{
  "record_type": "lab_report | imaging | prescription | consultation | discharge_summary | vaccination | other",
  "summary": "2-4 sentence plain-English summary of what this document is and what it says",
  "key_findings": [
    { "label": "Finding name (e.g. Hemoglobin)", "value": "actual value with unit", "status": "normal | low | high | abnormal | info", "note": "short explanation in plain English" }
  ],
  "recommendations": [
    "Actionable, patient-friendly suggestion 1",
    "Suggestion 2"
  ],
  "extracted_text": "the raw text content you can read from the document, cleaned up"
}

Rules:
- Be accurate. If a value is normal, mark it normal.
- If you cannot read the document, set record_type to "other", summary explaining why, and empty arrays.
- Never invent values that are not in the document.
- Always add a brief disclaimer in the last recommendation that this is not medical advice.`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Unauthorized' }, 401);

    const userClient = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY') ?? Deno.env.get('SUPABASE_PUBLISHABLE_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData } = await userClient.auth.getUser();
    const user = userData?.user;
    if (!user) return json({ error: 'Unauthorized' }, 401);

    const { recordId } = await req.json();
    if (!recordId) return json({ error: 'recordId required' }, 400);

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: record, error: recErr } = await admin
      .from('medical_records')
      .select('*')
      .eq('id', recordId)
      .eq('user_id', user.id)
      .maybeSingle();
    if (recErr || !record) return json({ error: 'Record not found' }, 404);

    // Download file from storage
    const { data: fileBlob, error: dlErr } = await admin.storage
      .from('medical-records')
      .download(record.file_path);
    if (dlErr || !fileBlob) {
      await admin.from('medical_records').update({ status: 'failed', error: dlErr?.message ?? 'Download failed' }).eq('id', recordId);
      return json({ error: 'Download failed' }, 500);
    }

    const buf = new Uint8Array(await fileBlob.arrayBuffer());
    const base64 = btoa(String.fromCharCode(...buf));
    const mime = record.file_type || fileBlob.type || 'application/octet-stream';

    // Build multimodal content
    const userContent: any[] = [
      { type: 'text', text: `Please analyze this medical document named "${record.file_name}" and return the JSON described.` },
    ];
    if (mime.startsWith('image/')) {
      userContent.push({ type: 'image_url', image_url: { url: `data:${mime};base64,${base64}` } });
    } else {
      userContent.push({
        type: 'file',
        file: { filename: record.file_name, file_data: `data:${mime};base64,${base64}` },
      });
    }

    const aiRes = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Lovable-API-Key': LOVABLE_API_KEY },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userContent },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!aiRes.ok) {
      const t = await aiRes.text();
      let msg = t;
      if (aiRes.status === 429) msg = 'AI rate limit reached. Try again in a moment.';
      if (aiRes.status === 402) msg = 'AI credits exhausted. Add credits in workspace settings.';
      await admin.from('medical_records').update({ status: 'failed', error: msg }).eq('id', recordId);
      return json({ error: msg }, aiRes.status);
    }

    const aiJson = await aiRes.json();
    const raw = aiJson.choices?.[0]?.message?.content ?? '{}';
    let parsed: any = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      const m = raw.match(/\{[\s\S]*\}/);
      if (m) try { parsed = JSON.parse(m[0]); } catch {}
    }

    const update = {
      status: 'complete',
      record_type: parsed.record_type ?? 'other',
      summary: parsed.summary ?? '',
      key_findings: Array.isArray(parsed.key_findings) ? parsed.key_findings : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
      extracted_text: parsed.extracted_text ?? '',
      raw_analysis: parsed,
      error: null,
    };

    await admin.from('medical_records').update(update).eq('id', recordId);
    return json({ ok: true, analysis: update });
  } catch (e) {
    console.error('analyze-medical-record error', e);
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}