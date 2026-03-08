import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingChatButton } from "@/components/chatbot/FloatingChatButton";
import { motion } from "framer-motion";

interface MainLayoutProps {
  children: ReactNode;
  hideNavFooter?: boolean;
}

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

export function MainLayout({ children, hideNavFooter = false }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {!hideNavFooter && <Navbar />}
      <motion.main
        className="flex-1"
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        transition={pageTransition.transition}
      >
        {children}
      </motion.main>
      {!hideNavFooter && <Footer />}
      <FloatingChatButton />
    </div>
  );
}
