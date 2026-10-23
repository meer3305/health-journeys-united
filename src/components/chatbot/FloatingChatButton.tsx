import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HayatPanel } from "./HayatPanel";
import mascot from "@/assets/hayat-mascot.asset.json";

export function FloatingChatButton() {
  const [open, setOpen] = useState(false);

  // Open Hayat from anywhere (e.g. the hero "AI Suggestions" button)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-hayat", handler);
    return () => window.removeEventListener("open-hayat", handler);
  }, []);

  return (
    <>
      <AnimatePresence>{open && <HayatPanel onClose={() => setOpen(false)} />}</AnimatePresence>
      {!open && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen(true)}
          className="group fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full shadow-lg ring-2 ring-background transition-shadow"
          style={{ boxShadow: "0 8px 30px rgba(120, 100, 60, 0.35)" }}
          aria-label="Chat with Hayat"
        >
          <img src={mascot.url} alt="Hayat" className="h-full w-full object-cover" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#E03A2F] text-[9px] font-bold text-white shadow">1</span>
        </motion.button>
      )}
    </>
  );
}
