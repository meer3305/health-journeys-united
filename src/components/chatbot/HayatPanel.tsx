import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, Loader2, PanelLeft, Plus, Trash2, Sparkles, CalendarCheck, HeartHandshake, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import mascot from "@/assets/hayat-mascot.asset.json";
import { Logo } from "@/components/brand/Logo";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Thread {
  id: string;
  title: string;
  updated_at: string;
}

const quickReplies = [
  { label: "Find a treatment", icon: Stethoscope },
  { label: "Schedule an appointment", icon: CalendarCheck },
  { label: "Explore wellness programs", icon: Sparkles },
  { label: "After-care check-in", icon: HeartHandshake },
];

const GREETING =
  "Hi! I'm Hayat, your personal care companion. 🌿 I can help you find the right treatment, schedule appointments with world-class providers, answer any questions, and check in on your recovery after treatment. How are you feeling today?";

export function HayatPanel({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showThreads, setShowThreads] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollDown = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollDown();
  }, [messages, sending, scrollDown]);

  // Load threads when opened / user changes
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("chat_threads")
        .select("id, title, updated_at")
        .order("updated_at", { ascending: false })
        .limit(30);
      if (cancelled) return;
      const list = (data ?? []) as Thread[];
      setThreads(list);
      if (list.length) {
        setActiveThreadId(list[0].id);
      } else {
        setActiveThreadId(null);
        setMessages([]);
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [user]);

  // Load messages for active thread
  useEffect(() => {
    if (!activeThreadId) { setMessages([]); return; }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("chat_messages")
        .select("id, role, content")
        .eq("thread_id", activeThreadId)
        .order("created_at", { ascending: true })
        .limit(200);
      if (cancelled) return;
      setMessages((data ?? []) as ChatMessage[]);
    })();
    return () => { cancelled = true; };
  }, [activeThreadId]);

  const send = async (text: string) => {
    const msg = text.trim();
    if (!msg || sending) return;
    setInput("");
    setSending(true);
    const optimistic: ChatMessage = { id: `tmp-${Date.now()}`, role: "user", content: msg };
    setMessages((prev) => [...prev, optimistic]);
    try {
      const { data, error } = await supabase.functions.invoke("hayat-chat", {
        body: { message: msg, threadId: activeThreadId },
      });
      if (error) throw new Error(error.message || "Hayat is unreachable right now.");
      const res = data as { threadId: string; reply: string; title?: string };
      setActiveThreadId(res.threadId);
      if (res.reply) {
        setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "assistant", content: res.reply }]);
      }
      // Refresh thread list (title may have changed)
      const { data: tData } = await supabase
        .from("chat_threads")
        .select("id, title, updated_at")
        .order("updated_at", { ascending: false })
        .limit(30);
      setThreads((tData ?? []) as Thread[]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { id: `err-${Date.now()}`, role: "assistant", content: `Sorry — ${(e as Error).message || "something went wrong."} Please try again.` },
      ]);
    } finally {
      setSending(false);
    }
  };

  const newThread = () => {
    setActiveThreadId(null);
    setMessages([]);
    setShowThreads(false);
  };

  const deleteThread = async (id: string) => {
    await supabase.from("chat_threads").delete().eq("id", id);
    const remaining = threads.filter((t) => t.id !== id);
    setThreads(remaining);
    if (activeThreadId === id) {
      setActiveThreadId(remaining[0]?.id ?? null);
      setMessages([]);
    }
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-20 right-4 z-50 flex h-[520px] w-[360px] max-w-[calc(100vw-2rem)] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-2xl sm:bottom-6 sm:right-6 sm:w-[380px]"
      >
        <img src={mascot.url} alt="Hayat" className="h-24 w-24 rounded-full object-cover shadow-lg" />
        <div>
          <p className="font-sans text-lg font-bold">Hi, I'm Hayat</p>
          <p className="mt-1 text-sm text-muted-foreground">Sign in so I can save our conversations, schedule your appointments and follow up on your recovery.</p>
        </div>
        <Link to="/auth" onClick={onClose} className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          Sign in to chat
        </Link>
        <button onClick={onClose} className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted" aria-label="Close chat">
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-20 right-4 z-50 flex h-[560px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:bottom-6 sm:right-6"
    >
      {/* Header */}
      <div className="relative flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <button onClick={() => setShowThreads((s) => !s)} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted" aria-label="Conversations">
          <PanelLeft className="h-4.5 w-4.5" />
        </button>
        <img src={mascot.url} alt="Hayat" className="h-10 w-10 rounded-full object-cover shadow" />
        <div className="min-w-0">
          <p className="font-sans text-sm font-bold">Hayat</p>
          <p className="text-xs text-muted-foreground">Your care companion · always here</p>
        </div>
        <button onClick={onClose} className="ml-auto rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted" aria-label="Close chat">
          <X className="h-5 w-5" />
        </button>

        {/* Thread drawer */}
        <AnimatePresence>
          {showThreads && (
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-y-0 left-0 z-10 flex w-64 flex-col border-r border-border bg-card shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Logo className="text-[10px]" /> Chats
                </span>
                <button onClick={newThread} className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20" aria-label="New conversation">
                  <Plus className="h-3.5 w-3.5" /> New
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {threads.length === 0 && <p className="px-2 py-6 text-center text-xs text-muted-foreground">No conversations yet</p>}
                {threads.map((t) => (
                  <div
                    key={t.id}
                    className={`group mb-1 flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm transition-colors ${
                      t.id === activeThreadId ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <button onClick={() => { setActiveThreadId(t.id); setShowThreads(false); }} className="min-w-0 flex-1 truncate text-left">
                      {t.title}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deleteThread(t.id); }} className="opacity-0 transition-opacity group-hover:opacity-60 hover:!opacity-100" aria-label="Delete conversation">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="flex items-start gap-2.5">
              <img src={mascot.url} alt="Hayat" className="h-8 w-8 shrink-0 rounded-full object-cover shadow" />
              <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-card px-4 py-2.5 text-sm text-foreground shadow-sm border border-border">
                {GREETING}
              </div>
            </div>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && <img src={mascot.url} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover shadow" />}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card text-foreground rounded-bl-sm shadow-sm border border-border"
                  }`}
                >
                  {msg.content.split("\n").map((line, i) => (
                    <p key={i} className={i > 0 ? "mt-2" : ""} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
                  ))}
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                {quickReplies.map((qr) => (
                  <motion.button
                    key={qr.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => send(qr.label)}
                    className="flex items-start gap-2 rounded-xl border border-border bg-card p-3 text-left text-xs font-medium text-foreground shadow-sm transition-colors hover:border-primary/40"
                  >
                    <qr.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    {qr.label}
                  </motion.button>
                ))}
              </div>
            )}
            {sending && (
              <div className="flex items-start gap-2.5">
                <img src={mascot.url} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover shadow" />
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Hayat is thinking…
                </div>
              </div>
            )}
          </>
        )}
        <div ref={bottomRef} />
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
    </motion.div>
  );
}
