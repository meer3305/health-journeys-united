import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { ChatPanel } from "./ChatPanel";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && <ChatPanel onClose={() => setOpen(false)} />}
      </AnimatePresence>
      {!open && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-shadow"
          style={{ boxShadow: "0 0 20px rgba(34,211,238,0.4), 0 0 40px rgba(34,211,238,0.15)" }}
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>
      )}
    </>
  );
}
