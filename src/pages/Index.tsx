import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { TreatmentCard } from "@/components/cards/TreatmentCard";
import { WellnessCard } from "@/components/cards/WellnessCard";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { MedXTrawellCard3D } from "@/components/MedXTrawellCard3D";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { treatments, wellnessPrograms, destinations, reviews, trustStats, howItWorks, virtualCardFeatures } from "@/data/mockData";
import { ClipboardList, Search, Plane, Check, ArrowRight, Banknote, Clock, ShieldCheck, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const stepIcons = [ClipboardList, Search, Plane];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

function Glass3DCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setRot({
      x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -5,
      y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5,
    });
  };

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setRot({ x: 0, y: 0 }); }}
        animate={{ rotateX: rot.x, rotateY: rot.y, scale: hov ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className={`relative overflow-hidden rounded-2xl border border-white/20 shadow-xl ${className}`}
        style={{
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
          backdropFilter: "blur(20px) saturate(1.5)",
          WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        }}
      >
        {hov && (
          <div className="pointer-events-none absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(circle at ${50 + rot.y * 4}% ${50 + rot.x * 4}%, rgba(255,255,255,0.5) 0%, transparent 50%)` }} />
        )}
        <div style={{ transform: "translateZ(12px)" }}>{children}</div>
      </motion.div>
    </div>
  );
}

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <HeroSection
        title="World-Class Healthcare. Wherever You Are."
        subtitle="Browse treatments, wellness programs and top-rated providers across Turkey, Thailand, India and beyond."
        backgroundImage="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920"
        primaryCta={{ label: "Find a Treatment", href: "/treatments" }}
        secondaryCta={{ label: "Explore Wellness Programs", href: "/wellness" }}
      />

      {/* Trust Bar */}
      <section className="relative overflow-hidden py-14 border-b border-white/10">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)",
          backdropFilter: "blur(16px)",
        }} />
        <Container className="relative">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {trustStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  className="font-serif text-3xl font-bold text-primary sm:text-4xl"
                >
                  {stat.value}
                </motion.p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-28 relative overflow-hidden">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-20 right-20 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />
        <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 9, repeat: Infinity, delay: 2 }} className="absolute bottom-20 left-10 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
        <Container className="relative">
          <SectionHeader title="How It Works" subtitle="Three simple steps to world-class care" />
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div
                  key={step.step}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Glass3DCard className="p-8 text-center h-full">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{ background: "linear-gradient(135deg, hsl(174 65% 28% / 0.15), hsl(174 65% 28% / 0.05))" }}
                    >
                      <Icon className="h-7 w-7 text-primary" />
                    </motion.div>
                    <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full font-serif text-sm font-bold text-white shadow-lg border border-white/20"
                      style={{ background: "linear-gradient(135deg, hsl(38 55% 52%), hsl(38 55% 42%))" }}>
                      {step.step}
                    </div>
                    <h3 className="mt-6 font-serif text-xl font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </Glass3DCard>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Accent divider */}
      <div className="mx-auto flex items-center gap-3 px-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <motion.div animate={{ scaleX: [1, 1.5, 1] }} transition={{ duration: 3, repeat: Infinity }} className="h-1.5 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Featured Treatments */}
      <section className="py-28 relative overflow-hidden">
        <Container className="relative">
          <SectionHeader title="Featured Treatments" subtitle="Trusted by thousands of international patients" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {treatments.slice(0, 4).map((t, i) => (
              <motion.div key={t.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <TreatmentCard treatment={t} />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                className="gap-2 shadow-xl border border-white/20"
                style={{ background: "linear-gradient(135deg, hsl(38 55% 52%), hsl(38 55% 42%))", color: "white" }}
                asChild
              >
                <Link to="/treatments">View All Treatments <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Featured Wellness */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
        <motion.div animate={{ y: [0, -18, 0], x: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-32 left-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <Container className="relative">
          <SectionHeader title="Wellness Programs" subtitle="Reset, restore, and renew" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {wellnessPrograms.slice(0, 4).map((p, i) => (
              <motion.div key={p.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <WellnessCard program={p} />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                className="gap-2 shadow-xl border border-white/20"
                style={{ background: "linear-gradient(135deg, hsl(38 55% 52%), hsl(38 55% 42%))", color: "white" }}
                asChild
              >
                <Link to="/wellness">View All Programs <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Accent divider */}
      <div className="mx-auto flex items-center gap-3 px-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <motion.div animate={{ scaleX: [1, 1.5, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} className="h-1.5 w-16 rounded-full bg-gradient-to-r from-accent to-primary" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Virtual Card + BNPL */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
        <motion.div animate={{ y: [0, -25, 0] }} transition={{ duration: 9, repeat: Infinity }} className="absolute top-10 right-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
        <Container className="relative">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-primary border border-white/20"
              style={{
                background: "linear-gradient(135deg, hsl(174 65% 28% / 0.1), hsl(174 65% 28% / 0.03))",
                backdropFilter: "blur(8px)",
              }}
            >
              <CreditCard className="h-4 w-4" /> Exclusive Member Benefits
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl"
            >
              Your MedXTrawell Card
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed"
            >
              One card for your entire medical travel journey — with built-in Buy Now, Pay Later.
            </motion.p>
          </div>

          <div className="grid gap-16 items-center lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md">
                <MedXTrawellCard3D />
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  ✦ Hover over the card to see the 3D effect
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-serif text-2xl font-bold">Card Benefits</h3>
              <ul className="mt-6 space-y-3">
                {virtualCardFeatures.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, hsl(174 65% 28% / 0.15), hsl(174 65% 28% / 0.05))" }}>
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Glass3DCard className="mt-8 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Banknote className="h-5 w-5 text-accent" />
                  <h4 className="font-serif text-lg font-semibold">Buy Now, Pay Later</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Split any treatment into affordable monthly payments with your MedXTrawell Card.</p>
                <div className="space-y-2.5">
                  {[
                    { icon: ShieldCheck, text: "No credit check — instant approval" },
                    { icon: Clock, text: "3, 6, or 12 month payment plans" },
                    { icon: Banknote, text: "0% interest on all plans" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 text-sm">
                      <item.icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </Glass3DCard>

              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} className="mt-6">
                <Button
                  size="lg"
                  className="gap-2 shadow-xl border border-white/20"
                  style={{ background: "linear-gradient(135deg, hsl(38 55% 52%), hsl(38 55% 42%))", color: "white" }}
                  asChild
                >
                  <Link to="/signup">Get Your Free Card <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Destinations */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
        <motion.div animate={{ y: [0, -15, 0], x: [0, 12, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-20 right-20 h-56 w-56 rounded-full bg-accent/5 blur-3xl" />
        <Container className="relative">
          <SectionHeader title="Popular Destinations" subtitle="World-class care in stunning locations" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.slice(0, 8).map((d, i) => (
              <motion.div key={d.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <DestinationCard destination={d} />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section className="py-28 relative overflow-hidden">
        <motion.div animate={{ y: [0, 18, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-20 left-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <Container className="relative">
          <SectionHeader title="What Our Patients Say" />
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {reviews.map((r, i) => (
              <motion.div key={r.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <ReviewCard review={r} />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partner CTA */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(174 65% 22%) 0%, hsl(174 65% 15%) 100%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(38_55%_52%/0.15),transparent_70%)]" />
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-10 right-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-white drop-shadow-lg sm:text-4xl">
              Are you a hospital or wellness provider?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
              Join our network of verified healthcare providers and connect with thousands of international patients.
            </p>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} className="mt-8 inline-block">
              <Button
                size="lg"
                className="gap-2 shadow-xl border border-white/20"
                style={{ background: "linear-gradient(135deg, hsl(38 55% 52%), hsl(38 55% 42%))", color: "white" }}
                asChild
              >
                <Link to="/partners/apply">Apply to be a Partner <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Index;
