import { useState, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
  Check, Globe, BadgeCheck, Users, TrendingUp, ArrowRight,
  HeartPulse, BarChart3, Handshake, ShieldCheck, Zap, Award,
  Building2, Stethoscope, Star
} from "lucide-react";
import { partnerBenefits, currentPartners } from "@/data/mockData";
import { motion } from "framer-motion";
import { PartnerApplicationModal } from "@/components/PartnerApplicationModal";

const benefitIcons: Record<string, any> = { globe: Globe, badge: BadgeCheck, users: Users, trending: TrendingUp };

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.22 } }),
};

const stats = [
  { value: "500+", label: "Partner Providers", icon: Building2 },
  { value: "50K+", label: "Patients Connected", icon: HeartPulse },
  { value: "35+", label: "Countries", icon: Globe },
  { value: "4.8★", label: "Average Rating", icon: Star },
];

const howItWorks = [
  { step: "01", title: "Apply Online", description: "Fill out a short application with your facility details, specialties, and accreditations.", icon: Handshake },
  { step: "02", title: "Get Verified", description: "Our team reviews your credentials, certifications, and patient outcomes within 3 business days.", icon: ShieldCheck },
  { step: "03", title: "Go Live", description: "Your profile goes live on our platform — start receiving patient inquiries immediately.", icon: Zap },
];

const whyPartner = [
  { title: "Global Patient Reach", description: "Access thousands of international patients actively seeking quality healthcare abroad.", icon: Globe },
  { title: "Zero Listing Fees", description: "No upfront costs. We only succeed when you do — performance-based model.", icon: BarChart3 },
  { title: "Dedicated Account Manager", description: "Your own relationship manager to optimise your listing and maximise bookings.", icon: Users },
  { title: "Trust & Credibility", description: "JCI-verified badge, patient reviews, and quality scores that build patient confidence.", icon: Award },
  { title: "Patient Coordination", description: "We handle travel logistics, visa support, and transfers — you focus on care.", icon: HeartPulse },
  { title: "Data & Insights", description: "Real-time analytics on patient inquiries, conversion rates, and market trends.", icon: TrendingUp },
];

const testimonials = [
  { quote: "Since joining MedXTrawell, we've seen a 40% increase in international patient inquiries. The platform handles everything from initial contact to post-treatment follow-up.", name: "Dr. Mehmet Kaya", role: "Medical Director", org: "Istanbul Health Centre" },
  { quote: "The dedicated account manager truly understands our needs. Our profile conversion rate has doubled since we optimised it with their team.", name: "Dr. Priya Sharma", role: "Chief of Surgery", org: "Apollo Medical Delhi" },
  { quote: "What sets MedXTrawell apart is their patient coordination. Patients arrive prepared and confident, which leads to better outcomes for everyone.", name: "Dr. Somchai Lee", role: "Director", org: "Bangkok International Hospital" },
];

function Glass3DCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setRot({
      x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -4,
      y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 4,
    });
  };

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setRot({ x: 0, y: 0 }); }}
        animate={{ rotateX: rot.x, rotateY: rot.y, scale: hov ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`relative overflow-hidden rounded-2xl border border-border/50 shadow-md ${className}`}
        style={{
          transformStyle: "preserve-3d",
          background: "hsl(var(--card))",
        }}
      >
        {hov && (
          <div className="pointer-events-none absolute inset-0 opacity-10"
            style={{ background: `radial-gradient(circle at ${50 + rot.y * 4}% ${50 + rot.x * 4}%, hsl(var(--accent)) 0%, transparent 50%)` }} />
        )}
        <div style={{ transform: "translateZ(8px)" }}>{children}</div>
      </motion.div>
    </div>
  );
}

const PartnersApply = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <PartnerApplicationModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-28">
        <div className="absolute inset-0">
          <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-10 right-[10%] h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-10 left-[5%] h-48 w-48 rounded-full bg-accent/8 blur-3xl" />
        </div>
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm border border-white/20">
              <Handshake className="h-4 w-4" /> Partner Program
            </span>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Grow Your Practice. <br />Reach Global Patients.
            </h1>
            <p className="mt-6 text-lg text-white/80 leading-relaxed sm:text-xl">
              Join 500+ world-class hospitals and clinics connecting with thousands of international patients through MedXTrawell.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-8 inline-block">
              <Button
                size="lg"
                onClick={() => setModalOpen(true)}
                className="gap-2 bg-accent text-accent-foreground font-semibold shadow-xl transition-shadow hover:shadow-[0_0_24px_rgba(34,211,238,0.4)]"
              >
                Apply to Be a Partner <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Stats */}
      <section className="relative -mt-12 z-10 pb-16">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Glass3DCard className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-serif text-2xl font-bold text-foreground sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </Glass3DCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Partner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">Why Partner With Us?</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We provide everything you need to attract international patients, build trust, and grow your practice globally.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyPartner.map((item, i) => (
              <motion.div key={item.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Glass3DCard className="h-full p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </Glass3DCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-muted-foreground">Get started in three simple steps</p>
          </motion.div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {howItWorks.map((step, i) => (
              <motion.div key={step.step} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Glass3DCard className="relative h-full p-8 text-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md">
                    {step.step}
                  </div>
                  <div className="mx-auto mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                    <step.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </Glass3DCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partner Testimonials */}
      <section className="py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">What Our Partners Say</h2>
            <p className="mt-4 text-muted-foreground">Hear from healthcare providers already on the platform</p>
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Glass3DCard className="h-full p-7">
                  <div className="flex gap-1 text-accent">
                    {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">"{t.quote}"</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Stethoscope className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}, {t.org}</p>
                    </div>
                  </div>
                </Glass3DCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Current Partners */}
      <section className="py-20 bg-muted/30">
        <Container>
          <h2 className="text-center font-serif text-2xl font-bold">Trusted by Leading Providers</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">World-class hospitals and clinics across 35+ countries</p>
          <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {currentPartners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
              >
                <Glass3DCard className="p-5 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.15 }}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"
                  >
                    <span className="font-serif text-lg font-bold text-primary">{p.logo}</span>
                  </motion.div>
                  <p className="mt-3 text-xs font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.country}</p>
                </Glass3DCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-10 right-[15%] h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Grow Your Practice?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/80 leading-relaxed">
              Join 500+ providers already connecting with international patients. No listing fees. Dedicated support. Results within weeks.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["3-day review", "Zero listing fees", "Dedicated manager"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium text-white">
                  <Check className="h-3.5 w-3.5" /> {item}
                </span>
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-8 inline-block">
              <Button
                size="lg"
                onClick={() => setModalOpen(true)}
                className="gap-2 bg-accent text-accent-foreground font-semibold shadow-xl transition-shadow hover:shadow-[0_0_24px_rgba(34,211,238,0.4)]"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default PartnersApply;
