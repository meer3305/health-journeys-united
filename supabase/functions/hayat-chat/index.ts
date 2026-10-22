import { createClient } from 'npm:@supabase/supabase-js@2';
import catalog from '../_shared/catalog.json' with { type: 'json' };

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? Deno.env.get('SUPABASE_PUBLISHABLE_KEY')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const MODEL = 'google/gemini-3.8-flash';

const SYSTEM_PROMPT = `You are Hayat, the warm, thoughtful care concierge for TrawellCare — a premium medical travel & wellness platform. You speak in clear, friendly English, use short paragraphs, and a heart emoji sparingly. You are NOT a doctor: never diagnose, never give medical advice beyond general guidance, and add a light disclaimer when discussing medical specifics.

Your job, in order of priority:
1. DISCOVERY — When someone wants treatment, ask gentle questions ONE AT A TIME (not a wall of questions) to learn: what they need, preferred destination (if any), budget, preferred travel window, and whether a companion is travelling. Use their answers to recommend 2-3 specific options from the CATALOG below, explaining price, duration and what's included.
2. SCHEDULING — Once the user picks an option and confirms a date, call the create_booking tool to schedule the appointment. Confirm the details back to the user after booking (provider, country, date). Never invent prices; use catalog prices. If the user asks about something not in the catalog, be honest and offer to connect a care coordinator.
3. QUERIES — Answer questions about treatments, providers, destinations, savings, travel logistics, documents needed, and how TrawellCare works. Use the CATALOG and destination facts.
4. AFTER-CARE FOLLOW-UPS — The user's current bookings are listed below. For bookings with status 'completed', proactively offer after-care follow-ups: ask how recovery is going, check for pain/swelling/red flags, remind about follow-up appointments and medication schedules, and suggest when to contact their provider. For 'pending'/'confirmed' bookings, help with preparation (documents, fasting instructions, travel). Offer follow-up check-ins at sensible intervals.

TOOLS:
- create_booking: schedule an appointment. Requires treatment_name; include provider, country, price, preferred_date (YYYY-MM-DD) and notes when known.
- list_bookings: show the user's current bookings.
- update_booking_status: change a booking's status. Only these values: pending, confirmed, completed, cancelled. When a user says a treatment went well / is finished, mark it completed (this triggers after-care follow-ups).
- rename_thread: give the conversation a short descriptive title (max 5 words) once you understand what it is about.

CATALOG (Treatments):
${JSON.stringify((catalog as any).treatments)}

CATALOG (Wellness programs):
${JSON.stringify((catalog as any).wellness)}

DESTINATION FACTS: Turkey — up to 70% savings, strong in hair, dental, orthopaedics; Thailand — up to 65%, cosmetic & wellness; India — up to 80%, cardiac & ortho; UAE — up to 40%, premium; Greece — fertility; Germany — up to 30%, oncology & cardiac.

Keep replies under 180 words unless the user asks for detail. When you recommend treatments, format as a short list with name, country, price and duration.`;

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'create_booking',
      description: 'Schedule an appointment / booking for the current user',
      parameters: {
        type: 'object',
        properties: {
          treatment_name: { type: 'string' },
          provider: { type: 'string' },
          country: { type: 'string' },
          price: { type: 'number' },
          preferred_date: { type: 'string', description: 'YYYY-MM-DD' },
          notes: { type: 'string' },
        },
        required: ['treatment_name'],
      },
    },
  },
  {
    type: 'function',
    function: { name: 'list_bookings', description: "List the user's current bookings", parameters: { type: 'object', properties: {} } },
  },
  {
    type: 'function',
    function: {
      name: 'update_booking_status',
      description: "Change a booking's status. Allowed: pending, confirmed, completed, cancelled",
      parameters: {
        type: 'object',
        properties: { booking_id: { type: 'string' }, status: { type: 'string', enum: ['pending', 'confirmed', 'completed', 'cancelled'] } },
        required: ['booking_id', 'status'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'rename_thread',
      description: 'Rename the conversation with a short title (max 5 words)',
      parameters: { type: 'object', properties: { title: { type: 'string' } }, required: ['title'] },
    },
  },
];

const ALLOWED_STATUSES = new Set(['pending', 'confirmed', 'completed', 'cancelled']);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}

async function callGateway(messages: unknown[]) {
  const res = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Lovable-API-Key': LOVABLE_API_KEY },
    body: JSON.stringify({ model: MODEL, messages, tools: TOOLS, tool_choice: 'auto', max_tokens: 1200 }),
    signal: AbortSignal.timeout(60_000),
  });
  if (!res.ok) {
    const t = await res.text();
    const msg = res.status === 429 ? 'AI rate limit reached. Try again in a moment.' : res.status === 402 ? 'AI credits exhausted. Add credits in workspace settings.' : `AI error (${res.status})`;
    console.error('hayat gateway error', res.status, t);
    throw Object.assign(new Error(msg), { status: res.status });
  }
  return res.json();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Unauthorized' }, 401);

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { global: { headers: { Authorization: authHeader } } });
    const { data: userData } = await userClient.auth.getUser();
    const user = userData?.user;
    if (!user) return json({ error: 'Unauthorized' }, 401);

    const body = await req.json().catch(() => ({}));
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const threadId: string | undefined = body.threadId;
    if (!message && !threadId) return json({ error: 'message required' }, 400);

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const uid = user.id;

    // Resolve or create the thread (always owner-scoped).
    let thread = threadId
      ? (await admin.from('chat_threads').select('*').eq('id', threadId).eq('user_id', uid).maybeSingle()).data
      : null;
    if (threadId && !thread) return json({ error: 'Thread not found' }, 404);
    if (!thread) {
      const { data: created, error: tErr } = await admin
        .from('chat_threads')
        .insert({ user_id: uid, title: message.slice(0, 40) || 'New conversation' })
        .select()
        .single();
      if (tErr) throw tErr;
      thread = created;
    }

    // Load history (last 40 messages).
    const { data: history } = await admin
      .from('chat_messages')
      .select('role, content')
      .eq('thread_id', thread.id)
      .order('created_at', { ascending: true })
      .limit(200);
    const priorMessages = (history ?? []).slice(-40);

    // Save the user message.
    if (message) {
      const { error: mErr } = await admin.from('chat_messages').insert({ thread_id: thread.id, user_id: uid, role: 'user', content: message });
      if (mErr) throw mErr;
    }

    // User context: profile + bookings.
    const [{ data: profile }, { data: bookings }] = await Promise.all([
      admin.from('profiles').select('full_name, country, conditions, allergies, medications, treatment_interests').eq('id', uid).maybeSingle(),
      admin.from('bookings').select('id, treatment_name, provider, country, price, status, preferred_date, created_at').eq('user_id', uid).order('created_at', { ascending: false }).limit(20),
    ]);

    const contextMsg = {
      role: 'system',
      content: `CONTEXT — Signed-in user: ${profile?.full_name || user.email || 'Guest'} (location: ${profile?.country || 'unknown'}). Health profile: conditions=${profile?.conditions || 'none listed'}, allergies=${profile?.allergies || 'none listed'}, medications=${profile?.medications || 'none listed'}.\nCURRENT BOOKINGS (JSON): ${JSON.stringify(bookings ?? [])}`,
    };

    // Conversation for the model.
    const convo: any[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      contextMsg,
      ...priorMessages.map((m) => ({ role: m.role, content: m.content })),
    ];
    if (message) convo.push({ role: 'user', content: message });

    // Agentic tool loop (bounded).
    let reply = '';
    let titleUpdated = false;
    for (let hop = 0; hop < 5; hop++) {
      const aiJson = await callGateway(convo);
      const choice = aiJson.choices?.[0]?.message;
      reply = choice?.content ?? '';
      const toolCalls = choice?.tool_calls ?? [];

      if (!toolCalls.length) break;

      convo.push(choice);
      for (const call of toolCalls) {
        let result: unknown;
        try {
          const args = typeof call.function?.arguments === 'string' ? JSON.parse(call.function.arguments) : (call.function?.arguments ?? {});
          const name = call.function?.name;
          if (name === 'create_booking') {
            const insert: Record<string, unknown> = { user_id: uid, treatment_name: String(args.treatment_name).slice(0, 200), status: 'pending' };
            if (args.provider) insert.provider = String(args.provider).slice(0, 200);
            if (args.country) insert.country = String(args.country).slice(0, 80);
            if (typeof args.price === 'number' && isFinite(args.price)) insert.price = args.price;
            if (typeof args.preferred_date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(args.preferred_date)) insert.preferred_date = args.preferred_date;
            if (args.notes) insert.notes = String(args.notes).slice(0, 1000);
            const { data, error } = await admin.from('bookings').insert(insert).select('id, treatment_name, provider, country, price, preferred_date, status').single();
            result = error ? { error: error.message } : { booked: data };
          } else if (name === 'list_bookings') {
            const { data, error } = await admin.from('bookings').select('id, treatment_name, provider, country, price, status, preferred_date').eq('user_id', uid).order('created_at', { ascending: false });
            result = error ? { error: error.message } : { bookings: data };
          } else if (name === 'update_booking_status') {
            const status = String(args.status ?? '');
            if (!ALLOWED_STATUSES.has(status)) result = { error: 'Invalid status' };
            else {
              const { data, error } = await admin
                .from('bookings')
                .update({ status })
                .eq('id', String(args.booking_id))
                .eq('user_id', uid)
                .select('id, treatment_name, status')
                .maybeSingle();
              result = error ? { error: error.message } : data ? { updated: data } : { error: 'Booking not found' };
            }
          } else if (name === 'rename_thread') {
            const title = String(args.title ?? '').slice(0, 60);
            await admin.from('chat_threads').update({ title }).eq('id', thread.id).eq('user_id', uid);
            titleUpdated = true;
            result = { ok: true };
          } else {
            result = { error: 'Unknown tool' };
          }
        } catch (e) {
          result = { error: (e as Error).message };
        }
        convo.push({ role: 'tool', tool_call_id: call.id, content: JSON.stringify(result) });
      }
    }

    // Persist the assistant reply.
    if (reply) {
      const { error: aErr } = await admin.from('chat_messages').insert({ thread_id: thread.id, user_id: uid, role: 'assistant', content: reply });
      if (aErr) throw aErr;
      await admin.from('chat_threads').update({ updated_at: new Date().toISOString() }).eq('id', thread.id);
    }

    const { data: refreshed } = await admin.from('chat_threads').select('title, updated_at').eq('id', thread.id).maybeSingle();

    return json({ threadId: thread.id, reply, title: titleUpdated ? refreshed?.title : undefined, updatedAt: refreshed?.updated_at });
  } catch (e) {
    const err = e as Error & { status?: number };
    console.error('hayat-chat error', err);
    return json({ error: err.message || 'Unexpected error' }, err.status && err.status >= 400 && err.status < 500 ? err.status : 500);
  }
});
