import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Treatments from "./pages/Treatments";
import TreatmentDetail from "./pages/TreatmentDetail";
import Wellness from "./pages/Wellness";
import WellnessDetail from "./pages/WellnessDetail";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PartnersApply from "./pages/PartnersApply";
import About from "./pages/About";
import DestinationTurkey from "./pages/DestinationTurkey";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Dashboard has its own layout */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* All other pages use MainLayout */}
          <Route path="/" element={<MainLayout><Index /></MainLayout>} />
          <Route path="/treatments" element={<MainLayout><Treatments /></MainLayout>} />
          <Route path="/treatments/:slug" element={<MainLayout><TreatmentDetail /></MainLayout>} />
          <Route path="/wellness" element={<MainLayout><Wellness /></MainLayout>} />
          <Route path="/wellness/:slug" element={<MainLayout><WellnessDetail /></MainLayout>} />
          <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
          <Route path="/partners/apply" element={<MainLayout><PartnersApply /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/destinations/turkey" element={<MainLayout><DestinationTurkey /></MainLayout>} />
          <Route path="/destinations/:country" element={<MainLayout><DestinationTurkey /></MainLayout>} />
          <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
