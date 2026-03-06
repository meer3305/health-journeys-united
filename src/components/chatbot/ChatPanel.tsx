import { useState } from "react";
import { X, Send } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
}

const quickReplies = [
  "Find a treatment",
  "Explore wellness programs",
  "Talk to a human",
];

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
    "In the meantime, you can also email us at hello@medivoyage.com or call +44 20 1234 5678.",
  ],
};

interface ChatPanelProps {
  onClose: () => void;
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "bot", text: "Hi! 👋 Welcome to MediVoyage. I'm here to help you find the right treatment or wellness program. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const handleSend = (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setShowQuickReplies(false);

    const responses = botResponses[text] || [
      "Thanks for your message! A care coordinator will get back to you shortly. In the meantime, feel free to browse our treatments and wellness programs.",
    ];

    responses.forEach((r, i) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: `${Date.now()}-${i}`, role: "bot", text: r }]);
      }, (i + 1) * 800);
    });

    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
            <span className="font-serif text-sm font-bold">M</span>
          </div>
          <div>
            <p className="text-sm font-semibold">MediVoyage Assistant</p>
            <p className="text-xs opacity-70">Usually replies instantly</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-full p-1 hover:bg-primary-foreground/10">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {showQuickReplies && (
          <div className="flex flex-wrap gap-2 pt-2">
            {quickReplies.map((qr) => (
              <button
                key={qr}
                onClick={() => handleSend(qr)}
                className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
              >
                {qr}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && input.trim() && handleSend(input.trim())}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={() => input.trim() && handleSend(input.trim())}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
