import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";

// Lazy load non-critical pages
const Treatments = lazy(() => import("./pages/Treatments"));
const TreatmentDetail = lazy(() => import("./pages/TreatmentDetail"));
const Wellness = lazy(() => import("./pages/Wellness"));
const WellnessDetail = lazy(() => import("./pages/WellnessDetail"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PartnersApply = lazy(() => import("./pages/PartnersApply"));
const About = lazy(() => import("./pages/About"));
const DestinationPage = lazy(() => import("./pages/DestinationPage"));
const ProviderProfile = lazy(() => import("./pages/ProviderProfile"));
const DoctorProfile = lazy(() => import("./pages/DoctorProfile"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
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
          <Route path="/providers/:slug" element={<MainLayout><ProviderProfile /></MainLayout>} />
          <Route path="/doctors/:slug" element={<MainLayout><DoctorProfile /></MainLayout>} />
          <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
        </Routes>
      </Suspense>
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
