import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { ClipboardList, Users, Phone, Calendar, Plane, HeartPulse } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Submit Condition", desc: "Share your health needs and preferences" },
  { icon: Users, title: "Get Provider Matches", desc: "AI matches you with verified hospitals" },
  { icon: Phone, title: "Consultation Call", desc: "Speak with your matched provider" },
  { icon: Calendar, title: "Treatment Booking", desc: "Confirm dates, pricing & logistics" },
  { icon: Plane, title: "Travel Coordination", desc: "Flights, transfers & accommodation arranged" },
  { icon: HeartPulse, title: "Recovery Support", desc: "Post-treatment care & follow-ups" },
];

export function PatientJourney() {
  return (
    <section className="py-14 relative overflow-hidden">
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            🗺️ Your Journey
          </span>
          <h2 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">Your Health Journey, Simplified</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">From your first enquiry to full recovery, we handle every step.</p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-neon-green hidden md:block" />

        <div className="space-y-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 md:pl-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background border border-accent/20 shadow-sm"
                >
                  <step.icon className="h-5 w-5 text-primary" />
                  <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {i + 1}
                  </div>
                </motion.div>
                <div>
                  <h3 className="font-semibold text-sm">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
