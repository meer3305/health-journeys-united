import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { TreatmentCard } from "@/components/cards/TreatmentCard";
import { WellnessCard } from "@/components/cards/WellnessCard";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { treatments, wellnessPrograms, destinations, reviews, trustStats, howItWorks, virtualCardFeatures } from "@/data/mockData";
import { ClipboardList, Search, Plane, CreditCard, Check, Shield, ArrowRight, Banknote, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const stepIcons = [ClipboardList, Search, Plane];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

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
      <section className="border-b border-border bg-card py-12">
        <Container>
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
                <p className="font-serif text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-28">
        <Container>
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
                  className="group relative rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 transition-colors group-hover:bg-accent/25">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-serif text-sm font-bold text-primary-foreground shadow-md">
                    {step.step}
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Accent divider */}
      <div className="mx-auto flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <div className="h-1.5 w-12 rounded-full bg-accent" />
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Featured Treatments */}
      <section className="bg-muted/30 py-28">
        <Container>
          <SectionHeader title="Featured Treatments" subtitle="Trusted by thousands of international patients" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {treatments.slice(0, 4).map((t, i) => (
              <motion.div key={t.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <TreatmentCard treatment={t} />
              </motion.div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button variant="outline" size="lg" className="gap-2 border-accent text-accent hover:bg-accent/5" asChild>
              <Link to="/treatments">View All Treatments <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Wellness */}
      <section className="py-28">
        <Container>
          <SectionHeader title="Wellness Programs" subtitle="Reset, restore, and renew" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {wellnessPrograms.slice(0, 4).map((p, i) => (
              <motion.div key={p.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <WellnessCard program={p} />
              </motion.div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button variant="outline" size="lg" className="gap-2 border-accent text-accent hover:bg-accent/5" asChild>
              <Link to="/wellness">View All Programs <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Accent divider */}
      <div className="mx-auto flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <div className="h-1.5 w-12 rounded-full bg-accent" />
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* BNPL Section */}
      <section className="py-28 bg-gradient-to-b from-background to-muted/30">
        <Container>
          <div className="grid gap-12 items-center lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Banknote className="h-4 w-4" /> Flexible Payments
              </span>
              <h2 className="mt-6 font-serif text-3xl font-bold sm:text-4xl">
                Buy Now, Pay Later
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Don't let finances delay your treatment. Split any procedure into affordable monthly payments with 0% interest.
              </p>
              <div className="mt-8 space-y-5">
                {[
                  { icon: ShieldCheck, title: "No credit check required", desc: "Quick, soft-check approval in under 2 minutes" },
                  { icon: Clock, title: "Pay in 3, 6, or 12 instalments", desc: "Choose the plan that fits your budget" },
                  { icon: Banknote, title: "0% interest on all plans", desc: "Pay exactly what you see — no hidden fees" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-8 gap-2 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg" size="lg" asChild>
                <Link to="/treatments">Check Your Eligibility <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-sm">
                <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
                  <p className="text-sm text-muted-foreground">Example: Knee Replacement</p>
                  <p className="mt-2 font-serif text-3xl font-bold text-primary">£3,200</p>
                  <div className="mt-6 space-y-3">
                    {[
                      { months: 3, amount: "£1,067/mo" },
                      { months: 6, amount: "£533/mo" },
                      { months: 12, amount: "£267/mo" },
                    ].map((plan) => (
                      <div key={plan.months} className="flex items-center justify-between rounded-xl bg-muted/50 px-5 py-3.5">
                        <span className="text-sm font-medium">{plan.months} months</span>
                        <span className="font-semibold text-primary">{plan.amount}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-center text-xs text-muted-foreground">0% APR · No hidden fees · Cancel anytime</p>
                </div>
                <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl bg-accent/10" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Virtual Card Section */}
      <section className="py-28">
        <Container>
          <div className="grid gap-12 items-center lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                <CreditCard className="h-4 w-4" /> Member Benefits
              </span>
              <h2 className="mt-6 font-serif text-3xl font-bold sm:text-4xl">
                Your Virtual MedXTrawell Card
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                One card for your entire medical travel journey. Access records, priority bookings, and exclusive member benefits worldwide.
              </p>
              <ul className="mt-8 space-y-3">
                {virtualCardFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg" size="lg" asChild>
                <Link to="/signup">Get Your Free Card</Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <motion.div
                whileHover={{ rotateY: 5, rotateX: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-teal-dark p-8 text-primary-foreground shadow-2xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider opacity-70">Virtual Care Card</p>
                    <h3 className="mt-1 font-serif text-2xl font-bold">MedXTrawell</h3>
                  </div>
                  <Shield className="h-8 w-8 opacity-40" />
                </div>
                <div className="mt-10">
                  <p className="font-mono text-lg tracking-widest">•••• •••• •••• 4829</p>
                </div>
                <div className="mt-8 flex items-end justify-between">
                  <div>
                    <p className="text-xs opacity-60">Card Holder</p>
                    <p className="text-sm font-medium">YOUR NAME HERE</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-60">Valid Thru</p>
                    <p className="text-sm font-medium">12/28</p>
                  </div>
                  <CreditCard className="h-6 w-6 opacity-40" />
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Destinations */}
      <section className="bg-muted/30 py-28">
        <Container>
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
      <section className="py-28">
        <Container>
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
      <section className="relative overflow-hidden bg-primary py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--accent)/0.15),transparent_70%)]" />
        <Container className="relative">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
              Are you a hospital or wellness provider?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/70">
              Join our network of verified healthcare providers and connect with thousands of international patients.
            </p>
            <Button size="lg" className="mt-8 gap-2 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg" asChild>
              <Link to="/partners/apply">Apply to be a Partner <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Index;
