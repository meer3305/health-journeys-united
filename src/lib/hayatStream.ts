import { supabase } from "@/integrations/supabase/client";

// A question typed in the hero prompt bar that should be sent to Hayat
// once the chat panel opens (consumed once).
let pendingAsk: string | null = null;

export function queueHayatAsk(text: string) {
  pendingAsk = text;
  window.dispatchEvent(new Event("open-hayat"));
}

export function consumeHayatAsk(): string | null {
  const t = pendingAsk;
  pendingAsk = null;
  return t;
}

export interface HayatStreamOptions {
  message: string;
  threadId?: string | null;
  onMeta?: (threadId: string) => void;
  onStatus?: (label: string) => void;
  onDelta?: (cumulativeText: string) => void;
  onReset?: () => void;
}

export interface HayatStreamResult {
  reply: string;
  title?: string;
}

/**
 * Sends a message to the hayat-chat edge function and consumes its
 * server-sent-event stream so replies render token-by-token.
 */
export async function streamHayat(opts: HayatStreamOptions): Promise<HayatStreamResult> {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;
  if (!session) throw new Error("Please sign in to chat with Hayat.");

  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/hayat-chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "",
      },
      body: JSON.stringify({ message: opts.message, threadId: opts.threadId ?? undefined }),
    }
  );

  if (!res.ok || !res.body) {
    let msg = `Hayat is unreachable right now (${res.status}).`;
    try {
      const j = await res.json();
      if (j?.error) msg = j.error;
    } catch {
      // non-JSON error body
    }
    throw new Error(msg);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let reply = "";
  let title: string | undefined;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buf.indexOf("\n\n")) >= 0) {
      const rawEvent = buf.slice(0, idx);
      buf = buf.slice(idx + 2);
      for (const line of rawEvent.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        let evt: Record<string, unknown>;
        try {
          evt = JSON.parse(payload);
        } catch {
          continue;
        }
        switch (evt.type) {
          case "meta":
            opts.onMeta?.(evt.threadId as string);
            break;
          case "status":
            opts.onStatus?.(evt.label as string);
            break;
          case "delta":
            reply = evt.text as string;
            opts.onDelta?.(evt.text as string);
            break;
          case "reset":
            reply = "";
            opts.onReset?.();
            break;
          case "error":
            throw new Error((evt.message as string) || "Hayat hit an unexpected error.");
          case "done":
            if (evt.reply) reply = evt.reply as string;
            if (evt.title) title = evt.title as string;
            break;
        }
      }
    }
  }

  return { reply, title };
}
