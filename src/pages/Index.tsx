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
      <section className="border-b border-border bg-card/80 backdrop-blur-sm py-12">
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
                  className="group relative rounded-2xl glass-card p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent font-serif text-sm font-bold text-accent-foreground shadow-md">
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
      <div className="mx-auto flex items-center gap-3 px-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Featured Treatments */}
      <section className="py-28">
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
            <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg" asChild>
              <Link to="/treatments">View All Treatments <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Wellness */}
      <section className="relative py-28 overflow-hidden">
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
          <div className="mt-14 text-center">
            <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg" asChild>
              <Link to="/wellness">View All Programs <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Accent divider */}
      <div className="mx-auto flex items-center gap-3 px-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Virtual Card + BNPL Combined Section */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
        <Container className="relative">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
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
            {/* 3D Card */}
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

            {/* Features + BNPL */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-serif text-2xl font-bold">Card Benefits</h3>
              <ul className="mt-6 space-y-3">
                {virtualCardFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl glass-card p-6">
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
              </div>

              <Button className="mt-6 gap-2 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg" size="lg" asChild>
                <Link to="/signup">Get Your Free Card <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Destinations */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
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
