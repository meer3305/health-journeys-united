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
import { ClipboardList, Search, Plane, CreditCard, Check, Shield } from "lucide-react";

const stepIcons = [ClipboardList, Search, Plane];

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
      <section className="border-b border-border bg-muted/50 py-10">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {trustStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <Container>
          <SectionHeader title="How It Works" subtitle="Three simple steps to world-class care" />
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={step.step} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Accent divider */}
      <div className="mx-auto h-1 w-24 rounded-full bg-accent" />

      {/* Featured Treatments */}
      <section className="bg-muted/30 py-24">
        <Container>
          <SectionHeader title="Featured Treatments" subtitle="Trusted by thousands of international patients" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {treatments.slice(0, 4).map((t) => (
              <TreatmentCard key={t.id} treatment={t} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/5" asChild>
              <Link to="/treatments">View All Treatments</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Wellness */}
      <section className="py-24">
        <Container>
          <SectionHeader title="Featured Wellness Programs" subtitle="Reset, restore, and renew" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {wellnessPrograms.slice(0, 4).map((p) => (
              <WellnessCard key={p.id} program={p} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/5" asChild>
              <Link to="/wellness">View All Programs</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Accent divider */}
      <div className="mx-auto h-1 w-24 rounded-full bg-accent" />

      {/* Virtual Card Section */}
      <section className="py-24">
        <Container>
          <div className="grid gap-12 items-center lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                <CreditCard className="h-4 w-4" /> New Feature
              </span>
              <h2 className="mt-6 font-serif text-3xl font-bold sm:text-4xl">
                Your Virtual MedXTrawell Card
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
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
              <Button className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90" size="lg" asChild>
                <Link to="/signup">Get Your Free Card</Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-teal-dark p-8 text-primary-foreground shadow-2xl">
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
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Destinations */}
      <section className="bg-muted/30 py-24">
        <Container>
          <SectionHeader title="Popular Destinations" subtitle="World-class care in stunning locations" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {destinations.slice(0, 8).map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section className="py-24">
        <Container>
          <SectionHeader title="What Our Patients Say" />
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </Container>
      </section>

      {/* Partner CTA */}
      <section className="bg-primary py-24">
        <Container>
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
              Are you a hospital or wellness provider?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/70">
              Join our network of verified healthcare providers and connect with thousands of international patients.
            </p>
            <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/partners/apply">Apply to be a Partner</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Index;
