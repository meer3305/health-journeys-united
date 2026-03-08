import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, CalendarCheck, Plane, Heart, Activity, Phone, ChevronDown } from "lucide-react";

interface JourneyStep {
  title: string;
  icon: React.ElementType;
  description: string;
  details: string;
  duration: string;
}

const steps: JourneyStep[] = [
  {
    title: "Initial Consultation",
    icon: MessageSquare,
    description: "Free video consultation with your specialist",
    details: "Share your medical history, discuss your goals, and receive a preliminary treatment plan. Our care coordinator will guide you through every question.",
    duration: "30–60 min",
  },
  {
    title: "Treatment Booking",
    icon: CalendarCheck,
    description: "Confirm your plan and secure your date",
    details: "Choose your preferred date, review the all-inclusive cost breakdown, and confirm with a small deposit. Our team arranges everything from there.",
    duration: "1–2 days",
  },
  {
    title: "Travel Preparation",
    icon: Plane,
    description: "We handle your travel logistics",
    details: "Receive your travel pack with visa guidance, hotel booking, airport transfer details, and a pre-arrival checklist. A coordinator contacts you 48 hours before departure.",
    duration: "1–2 weeks",
  },
  {
    title: "Surgery / Treatment",
    icon: Heart,
    description: "World-class care at a top facility",
    details: "Your coordinator meets you at the airport and accompanies you to the hospital. The medical team briefs you, performs the procedure, and monitors your recovery on-site.",
    duration: "1–3 days",
  },
  {
    title: "Recovery Period",
    icon: Activity,
    description: "Recover at your hotel with regular check-ins",
    details: "Rest comfortably with daily check-ins from your medical team. Enjoy light sightseeing if cleared. Attend a follow-up examination before departure.",
    duration: "3–14 days",
  },
  {
    title: "Follow-up Care",
    icon: Phone,
    description: "Ongoing support after you return home",
    details: "Receive a detailed post-treatment care plan. Schedule virtual follow-up appointments at 2 weeks, 1 month, and 3 months. 24/7 support line available.",
    duration: "3 months",
  },
];

export function TreatmentJourneyTimeline({ className = "" }: { className?: string }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-foreground">Treatment Journey</h3>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-0">
          {steps.map((step, i) => {
            const isOpen = expanded === i;
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="relative flex w-full items-start gap-4 py-4 text-left group"
                >
                  {/* Node */}
                  <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isOpen
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-card text-muted-foreground group-hover:border-primary/50"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-semibold transition-colors ${isOpen ? "text-primary" : "text-foreground"}`}>
                        {step.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{step.duration}</span>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-14 mb-4 rounded-xl border border-border bg-muted/50 p-4">
                        <p className="text-sm leading-relaxed text-muted-foreground">{step.details}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
