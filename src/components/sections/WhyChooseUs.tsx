import { motion } from "framer-motion";
import { BadgeCheck, Users, Banknote, Sparkles, Plane, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Verified Global Providers",
    description: "Every hospital and clinic in our network is vetted, accredited, and continuously monitored for quality and patient outcomes.",
  },
  {
    icon: Users,
    title: "Dedicated Care Coordinators",
    description: "Your personal coordinator manages everything — from medical consultations to hotel bookings — so you can focus on your health.",
  },
  {
    icon: Banknote,
    title: "Transparent Pricing",
    description: "No hidden fees, ever. See a full cost breakdown before you book, including treatment, travel, accommodation, and transfers.",
  },
  {
    icon: Sparkles,
    title: "Personalised Treatment Matching",
    description: "Our AI-powered system analyses your health profile to recommend the best providers, destinations, and treatment plans for your needs.",
  },
  {
    icon: Plane,
    title: "End-to-End Travel Support",
    description: "From visa assistance and flight booking to airport transfers and recovery accommodation — we handle every detail of your journey.",
  },
  {
    icon: ShieldCheck,
    title: "Post-Treatment Follow-Up",
    description: "Your care doesn't end at the airport. We provide 3 months of follow-up consultations and 24/7 support after your return home.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.3 },
  }),
};

export function WhyChooseUs() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      <Container className="relative">
        <SectionHeader
          title="Why Choose MedXTrawell?"
          subtitle="Trusted by thousands of patients worldwide for safe, affordable, world-class healthcare"
        />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:shadow-lg hover:border-primary/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 font-serif text-lg font-semibold text-card-foreground">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
