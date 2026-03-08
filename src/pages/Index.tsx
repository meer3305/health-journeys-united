import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { TreatmentCard } from "@/components/cards/TreatmentCard";
import { WellnessCard } from "@/components/cards/WellnessCard";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { Carousel3D } from "@/components/Carousel3D";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { MedXTrawellCard3D } from "@/components/MedXTrawellCard3D";
import { SavingsComparison } from "@/components/sections/SavingsComparison";
import { PatientStories } from "@/components/sections/PatientStories";
import { PatientJourney } from "@/components/sections/PatientJourney";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { ComparisonTool } from "@/components/sections/ComparisonTool";
import { CostCalculator } from "@/components/sections/CostCalculator";
import { FindMyTreatmentModal } from "@/components/FindMyTreatmentModal";
import { PartnerApplicationModal } from "@/components/PartnerApplicationModal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { treatments, wellnessPrograms, destinations, reviews, trustStats, howItWorks, virtualCardFeatures } from "@/data/mockData";
import { ClipboardList, Search, Plane, Check, ArrowRight, Banknote, Clock, ShieldCheck, CreditCard, Sparkles, BadgeCheck, Globe, Users, Star, ChevronDown, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const stepIcons = [ClipboardList, Search, Plane];
const trustIcons = [BadgeCheck, Globe, Users, Star];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

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
        className={`relative overflow-hidden rounded-2xl border border-white/20 shadow-lg ${className}`}
        style={{
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
          backdropFilter: "blur(20px) saturate(1.5)",
          WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        }}
      >
        {hov && (
          <div className="pointer-events-none absolute inset-0 opacity-15"
            style={{ background: `radial-gradient(circle at ${50 + rot.y * 4}% ${50 + rot.x * 4}%, rgba(34,211,238,0.4) 0%, transparent 50%)` }} />
        )}
        <div style={{ transform: "translateZ(8px)" }}>{children}</div>
      </motion.div>
    </div>
  );
}

const Index = () => {
  const [findOpen, setFindOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);

  return (
    <div>
      <FindMyTreatmentModal open={findOpen} onClose={() => setFindOpen(false)} />
      <PartnerApplicationModal open={partnerOpen} onClose={() => setPartnerOpen(false)} />

      {/* Hero */}
      <section className="relative flex items-center overflow-hidden min-h-[92vh]">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920"
          alt="Medical facility"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
        <Container className="relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-serif text-4xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-xl sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              World-Class Healthcare. Wherever You Are.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-6 text-lg leading-relaxed text-white/90 drop-shadow sm:text-xl lg:text-2xl"
            >
              Browse treatments, wellness programs and top-rated providers across Turkey, Thailand, India and beyond.
            </motion.p>

            {/* Hero Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-8 rounded-2xl p-1"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center">
                <input
                  type="text"
                  placeholder="Treatment or condition..."
                  className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50 border border-white/10"
                />
                <select className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm text-white/80 focus:outline-none focus:ring-2 focus:ring-accent/50 border border-white/10 appearance-none">
                  <option value="">Preferred country</option>
                  <option>Turkey</option>
                  <option>Thailand</option>
                  <option>India</option>
                  <option>UAE</option>
                  <option>Germany</option>
                </select>
                <select className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm text-white/80 focus:outline-none focus:ring-2 focus:ring-accent/50 border border-white/10 appearance-none">
                  <option value="">Budget range</option>
                  <option>Under £2,000</option>
                  <option>£2,000 – £5,000</option>
                  <option>£5,000 – £10,000</option>
                  <option>£10,000+</option>
                </select>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg animate-pulse-glow"
                    onClick={() => setFindOpen(true)}
                  >
                    <Search className="h-4 w-4" /> Find My Treatment
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="gap-2 shadow-lg transition-all border border-white/20"
                  style={{ background: "linear-gradient(135deg, hsl(187 92% 53%) 0%, hsl(174 78% 26%) 100%)", color: "white", boxShadow: "0 0 20px rgba(34,211,238,0.3)" }}
                  onClick={() => setFindOpen(true)}
                >
                  <Sparkles className="h-4 w-4" /> AI Treatment Finder
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-white/30 text-white hover:bg-white/15 shadow-lg"
                  style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.08)" }}
                  asChild
                >
                  <Link to="/wellness">Explore Wellness</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-white/30 text-white hover:bg-white/15 shadow-lg"
                  style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.08)" }}
                >
                  <Phone className="h-4 w-4" /> Talk to Care Coordinator
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div className="animate-scroll-hint">
              <ChevronDown className="h-6 w-6 text-white/50" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Trust Bar with Icons */}
      <section className="relative overflow-hidden py-14 border-b border-border">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {trustStats.map((stat, i) => {
              const Icon = trustIcons[i];
              return (
                <motion.div
                  key={stat.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="text-center"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <motion.p whileHover={{ scale: 1.05 }} className="font-serif text-3xl font-bold text-primary sm:text-4xl">{stat.value}</motion.p>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
          {/* Trust Badges */}
          <div className="mt-10">
            <TrustBadges />
          </div>
        </Container>
      </section>

      {/* Patient Journey */}
      <PatientJourney />

      {/* How It Works */}
      <section className="py-24 relative overflow-hidden">
        <Container className="relative">
          <SectionHeader title="How It Works" subtitle="Three simple steps to world-class care" />
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div key={step.step} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <Glass3DCard className="p-8 text-center h-full">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
                    >
                      <Icon className="h-7 w-7 text-primary" />
                    </motion.div>
                    <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full font-serif text-sm font-bold text-primary-foreground shadow-lg border border-white/20 bg-primary">{step.step}</div>
                    <h3 className="mt-6 font-serif text-xl font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </Glass3DCard>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Savings Comparison */}
      <SavingsComparison />

      {/* Featured Treatments */}
      <section className="py-24 relative overflow-hidden">
        <Container className="relative">
          <SectionHeader title="Featured Treatments" subtitle="Trusted by thousands of international patients" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {treatments.slice(0, 4).map((t, i) => (
              <motion.div key={t.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <TreatmentCard treatment={t} />
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-14 text-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 shadow-lg" asChild>
                <Link to="/treatments">View All Treatments <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Patient Stories */}
      <PatientStories />

      {/* Featured Wellness */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
        <Container className="relative">
          <SectionHeader title="Wellness Programs" subtitle="Reset, restore, and renew" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {wellnessPrograms.slice(0, 4).map((p, i) => (
              <motion.div key={p.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <WellnessCard program={p} />
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-14 text-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 shadow-lg" asChild>
                <Link to="/wellness">View All Programs <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Cost Calculator */}
      <CostCalculator />

      {/* Virtual Card + BNPL */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
        <Container className="relative">
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <CreditCard className="h-4 w-4" /> Exclusive Member Benefits
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="mt-6 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">Your MedXTrawell Card</motion.h2>
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">One card for your entire medical travel journey — with built-in Buy Now, Pay Later.</motion.p>
          </div>
          <div className="grid gap-16 items-center lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              className="flex justify-center">
              <div className="w-full max-w-md">
                <MedXTrawellCard3D />
                <p className="mt-4 text-center text-xs text-muted-foreground">✦ Hover over the card to see the 3D effect</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
              <h3 className="font-serif text-2xl font-bold">Card Benefits</h3>
              <ul className="mt-6 space-y-3">
                {virtualCardFeatures.map((feature, i) => (
                  <motion.li key={feature} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10"><Check className="h-3.5 w-3.5 text-primary" /></div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <Glass3DCard className="mt-8 p-6">
                <div className="flex items-center gap-2 mb-4"><Banknote className="h-5 w-5 text-accent" /><h4 className="font-serif text-lg font-semibold">Buy Now, Pay Later</h4></div>
                <p className="text-sm text-muted-foreground mb-4">Split any treatment into affordable monthly payments with your MedXTrawell Card.</p>
                <div className="space-y-2.5">
                  {[
                    { icon: ShieldCheck, text: "No credit check — instant approval" },
                    { icon: Clock, text: "3, 6, or 12 month payment plans" },
                    { icon: Banknote, text: "0% interest on all plans" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 text-sm"><item.icon className="h-4 w-4 text-primary shrink-0" /><span>{item.text}</span></div>
                  ))}
                </div>
              </Glass3DCard>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-6">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 shadow-lg" asChild>
                  <Link to="/signup">Get Your Free Card <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Comparison Tool */}
      <ComparisonTool />

      {/* Destinations */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
        <Container className="relative">
          <SectionHeader title="Popular Destinations" subtitle="World-class care in stunning locations" />
          <Carousel3D visibleCount={3}>
            {destinations.slice(0, 8).map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </Carousel3D>
        </Container>
      </section>

      {/* Reviews */}
      <section className="py-24 relative overflow-hidden">
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
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-teal-dark" />
        <Container className="relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="font-serif text-3xl font-bold text-white drop-shadow-lg sm:text-4xl">Are you a hospital or wellness provider?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">Join our network of verified healthcare providers and connect with thousands of international patients.</p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-8 inline-block">
              <Button size="lg" className="gap-2 bg-accent text-accent-foreground shadow-lg hover:bg-accent/90" style={{ boxShadow: "0 0 25px rgba(34,211,238,0.4)" }} onClick={() => setPartnerOpen(true)}>
                Apply to be a Partner <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Index;
