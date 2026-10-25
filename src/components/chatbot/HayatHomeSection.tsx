import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Stethoscope, CalendarCheck, HeartHandshake, MessageCircle, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import mascot from "@/assets/hayat-mascot.asset.json";

interface Msg {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Hi! I'm Hayat, your personal care companion 🌿 Tell me what you need and I'll suggest the right treatment — then schedule everything for you.";

const suggestions = [
  {
    icon: Stethoscope,
    title: "I need a treatment",
    desc: "Tell me your symptoms and budget — I'll suggest options with prices and durations.",
    prompt: "I'm looking for a treatment. Can you suggest the best options for me?",
  },
  {
    icon: CalendarCheck,
    title: "Schedule an appointment",
    desc: "Pick a treatment and a date — I'll book it with a top provider for you.",
    prompt: "I'd like to schedule an appointment. Please help me book one.",
  },
  {
    icon: HeartHandshake,
    title: "After-care check-in",
    desc: "Finished your treatment? I'll follow up on your recovery and reminders.",
    prompt: "I've completed my treatment. Can you do an after-care check-in?",
  },
];

const highlights = [
  { icon: Sparkles, title: "Instant suggestions", text: "Personal treatment matches from 25+ procedures across 6 countries — in seconds." },
  { icon: CalendarCheck, title: "Books it all", text: "Appointments, dates and providers — Hayat schedules everything inside the chat." },
  { icon: HeartHandshake, title: "Stays with you", text: "After-care follow-ups, preparation checklists and recovery check-ins." },
];

export function HayatHomeSection() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const send = useCallback(
    async (text: string) => {
      const msg = text.trim();
      if (!msg || sending) return;
      setInput("");
      setSending(true);
      setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", content: msg }]);
      try {
        const { data, error } = await supabase.functions.invoke("hayat-chat", {
          body: { message: msg, threadId },
        });
        if (error) throw new Error(error.message || "Hayat is unreachable right now.");
        const res = data as { threadId: string; reply: string };
        setThreadId(res.threadId);
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, role: "assistant", content: res.reply || "I'm here — ask me anything about treatments, booking or recovery." },
        ]);
      } catch (e) {
        setMessages((prev) => [
          ...prev,
          { id: `e-${Date.now()}`, role: "assistant", content: `Sorry — ${(e as Error).message || "something went wrong."} Please try again.` },
        ]);
      } finally {
        setSending(false);
      }
    },
    [sending, threadId]
  );

  return (
    <section id="hayat" className="relative overflow-hidden py-24 bg-muted/30">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Intro */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> Meet Hayat
            </span>
            <h2 className="mt-5 font-serif text-3xl font-bold leading-tight sm:text-4xl">
              Your AI care companion — right here, right now
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Chat with Hayat below. She asks the right questions, suggests treatments with real prices, and schedules your appointment — all in one conversation.
            </p>
            <ul className="mt-8 space-y-5">
              {highlights.map((h, i) => (
                <motion.li key={h.title} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                    <h.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{h.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{h.text}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Embedded chat card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto w-full max-w-md"
          >
            <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-xl">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-border bg-card px-5 py-4">
                <img src={mascot.url} alt="Hayat" className="h-11 w-11 rounded-full object-cover shadow" />
                <div>
                  <p className="font-sans font-bold">Hayat</p>
                  <p className="text-xs text-muted-foreground">Your care companion · always here</p>
                </div>
                <span className="ml-auto flex h-2.5 w-2.5 rounded-full bg-emerald-500" aria-label="Online" />
              </div>

              {!user ? (
                <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
                  <img src={mascot.url} alt="Hayat" className="h-24 w-24 rounded-full object-cover shadow-lg" />
                  <p className="font-sans text-lg font-bold">Hi, I'm Hayat</p>
                  <p className="text-sm text-muted-foreground">Sign in so I can suggest treatments, schedule your appointments and follow up on your recovery.</p>
                  <Link to="/auth" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                    Sign in to chat
                  </Link>
                </div>
              ) : (
                <>
                  {/* Messages */}
                  <div ref={scrollRef} className="h-[380px] space-y-3 overflow-y-auto p-5">
                    <div className="flex items-start gap-2.5">
                      <img src={mascot.url} alt="Hayat" className="h-8 w-8 shrink-0 rounded-full object-cover shadow" />
                      <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-2.5 text-sm shadow-sm">
                        {GREETING}
                      </div>
                    </div>
                    {messages.map((m) => (
                      <div key={m.id} className={`flex items-start gap-2.5 ${m.role === "user" ? "justify-end" : ""}`}>
                        {m.role === "assistant" && <img src={mascot.url} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover shadow" />}
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                            m.role === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm border border-border bg-card shadow-sm"
                          }`}
                        >
                          {m.content.split("\n").map((line, i) => (
                            <p key={i} className={i > 0 ? "mt-2" : ""} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
                          ))}
                        </div>
                      </div>
                    ))}
                    {sending && (
                      <div className="flex items-start gap-2.5">
                        <img src={mascot.url} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover shadow" />
                        <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Hayat is thinking…
                        </div>
                      </div>
                    )}
                    {/* Suggested conversation cards */}
                    {messages.length === 0 && !sending && (
                      <div className="space-y-2 pt-2">
                        {suggestions.map((s) => (
                          <motion.button
                            key={s.title}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => send(s.prompt)}
                            className="flex w-full items-start gap-3 rounded-2xl border border-border bg-card p-3.5 text-left shadow-sm transition-colors hover:border-primary/40"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                              <s.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{s.title}</p>
                              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Composer */}
                  <div className="border-t border-border bg-card p-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && input.trim() && send(input)}
                        placeholder="Tell Hayat how you feel…"
                        className="flex-1 rounded-xl border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        aria-label="Chat message input"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => input.trim() && send(input)}
                        disabled={sending || !input.trim()}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                        aria-label="Send message"
                      >
                        <Send className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
              <MessageCircle className="h-3.5 w-3.5" /> Your conversations are saved and follow you across devices.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
