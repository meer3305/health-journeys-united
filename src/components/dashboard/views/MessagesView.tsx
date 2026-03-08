import { motion } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  sender: "user" | "coordinator";
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  { id: "1", sender: "coordinator", text: "Hi James! I'm Sarah, your dedicated care coordinator. How can I help you today?", time: "10:00 AM" },
  { id: "2", sender: "user", text: "Hi Sarah! I had a question about my upcoming dental implant appointment in Ankara.", time: "10:05 AM" },
  { id: "3", sender: "coordinator", text: "Of course! Your appointment at Ankara Smile Clinic is confirmed for March 15th. Would you like me to arrange airport transfers and hotel accommodation?", time: "10:06 AM" },
  { id: "4", sender: "user", text: "Yes please! And could you send me the pre-treatment checklist?", time: "10:08 AM" },
  { id: "5", sender: "coordinator", text: "Absolutely! I'll send over the checklist and book the transfers. I've also arranged a complimentary city tour for you during recovery. 😊", time: "10:10 AM" },
];

export function MessagesView() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate coordinator reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "coordinator",
          text: "Thanks for your message! I'll look into that and get back to you shortly.",
          time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-[calc(100vh-10rem)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="font-serif text-sm font-bold text-primary">SM</span>
        </div>
        <div>
          <h3 className="font-semibold">Sarah M.</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Online · Senior Care Coordinator
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto rounded-2xl border border-border bg-muted/20 p-4 space-y-3">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border text-foreground rounded-bl-md"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`mt-1 text-[10px] ${msg.sender === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 rounded-xl border border-input bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <Button onClick={sendMessage} className="gap-2">
          <Send className="h-4 w-4" /> Send
        </Button>
      </div>
    </motion.div>
  );
}
