import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingChatButton } from "@/components/chatbot/FloatingChatButton";

interface MainLayoutProps {
  children: ReactNode;
  hideNavFooter?: boolean;
}

export function MainLayout({ children, hideNavFooter = false }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {!hideNavFooter && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideNavFooter && <Footer />}
      <FloatingChatButton />
    </div>
  );
}
