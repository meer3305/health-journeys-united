import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Treatments from "./pages/Treatments";
import TreatmentDetail from "./pages/TreatmentDetail";
import Wellness from "./pages/Wellness";
import WellnessDetail from "./pages/WellnessDetail";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PartnersApply from "./pages/PartnersApply";
import About from "./pages/About";
import DestinationPage from "./pages/DestinationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<MainLayout><Index /></MainLayout>} />
        <Route path="/treatments" element={<MainLayout><Treatments /></MainLayout>} />
        <Route path="/treatments/:slug" element={<MainLayout><TreatmentDetail /></MainLayout>} />
        <Route path="/wellness" element={<MainLayout><Wellness /></MainLayout>} />
        <Route path="/wellness/:slug" element={<MainLayout><WellnessDetail /></MainLayout>} />
        <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
        <Route path="/partners/apply" element={<MainLayout><PartnersApply /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/destinations/:country" element={<MainLayout><DestinationPage /></MainLayout>} />
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CurrencyProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </CurrencyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
