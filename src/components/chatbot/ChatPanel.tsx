import { useState, useEffect, useRef } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
}

const quickReplies = ["Find a treatment", "Explore wellness programs", "Talk to a human"];

const botResponses: Record<string, string[]> = {
  "Find a treatment": [
    "Great! I can help you find the right treatment. What type of treatment are you looking for?",
    "We have excellent options in orthopaedics, dentistry, fertility, cosmetic surgery, and more across Turkey, Thailand, India, and Greece.",
    "I'd recommend starting with our Treatment Catalog — you can filter by specialty, destination, and budget. Would you like me to take you there?",
  ],
  "Explore wellness programs": [
    "Wonderful! We offer a range of wellness programs — from stress & burnout retreats to longevity programmes.",
    "Our most popular programs are in Bali, Switzerland, and Portugal. Durations range from 5 to 14 days.",
    "Would you like to browse all wellness programs, or tell me what you're looking for?",
  ],
  "Talk to a human": [
    "Of course! I'll connect you with one of our care coordinators.",
    "Sarah M., our Senior Care Coordinator, is available. She can help with treatment planning, pricing, and travel logistics.",
    "In the meantime, you can also email us at hello@medxtrawell.com or call +44 20 1234 5678.",
  ],
};

interface ChatPanelProps {
  onClose: () => void;
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "bot", text: "Hi! 👋 Welcome to MedXTrawell. I'm here to help you find the right treatment or wellness program. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setShowQuickReplies(false);
    setInput("");
    setTyping(true);

    const responses = botResponses[text] || ["Thanks for your message! A care coordinator will get back to you shortly."];
    responses.forEach((r, i) => {
      setTimeout(() => {
        if (i === responses.length - 1) setTyping(false);
        setMessages((prev) => [...prev, { id: `${Date.now()}-${i}`, role: "bot", text: r }]);
      }, (i + 1) * 800);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-20 right-4 z-50 flex h-[480px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-accent/20 bg-card shadow-2xl sm:bottom-6 sm:right-6 sm:w-[380px]"
      style={{ boxShadow: "0 0 30px rgba(34,211,238,0.1), 0 20px 40px rgba(0,0,0,0.15)" }}
    >
      <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
            <span className="font-serif text-sm font-bold">M</span>
          </div>
          <div>
            <p className="text-sm font-semibold">MedXTrawell Assistant</p>
            <p className="text-xs opacity-70">Usually replies instantly</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-full p-1 hover:bg-primary-foreground/10 transition-colors" aria-label="Close chat">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-muted text-foreground rounded-bl-sm"
            }`}>{msg.text}</div>
          </motion.div>
        ))}
        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-muted px-4 py-3 text-sm text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              Assistant is typing...
            </div>
          </motion.div>
        )}
        {showQuickReplies && (
          <div className="flex flex-wrap gap-2 pt-2">
            {quickReplies.map((qr) => (
              <motion.button
                key={qr}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSend(qr)}
                className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/10"
              >
                {qr}
              </motion.button>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-border p-3">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && input.trim() && handleSend(input.trim())}
            placeholder="Type a message..."
            className="flex-1 rounded-xl border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Chat message input"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => input.trim() && handleSend(input.trim())}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
