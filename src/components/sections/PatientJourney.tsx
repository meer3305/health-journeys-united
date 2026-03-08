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
    <section className="py-24 relative overflow-hidden">
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            🗺️ Your Journey
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">Your Health Journey, Simplified</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">From your first enquiry to full recovery, we handle every step.</p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-neon-green hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-6 md:pl-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-background border border-accent/20 shadow-md"
                  style={{ boxShadow: "0 0 15px rgba(34,211,238,0.15)" }}
                >
                  <step.icon className="h-7 w-7 text-primary" />
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {i + 1}
                  </div>
                </motion.div>
                <div className="pt-2">
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
