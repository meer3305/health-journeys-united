import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { TreatmentCard } from "@/components/cards/TreatmentCard";
import { WellnessCard } from "@/components/cards/WellnessCard";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { treatments, wellnessPrograms, destinations, reviews, trustStats, howItWorks } from "@/data/mockData";
import { ClipboardList, Search, Plane } from "lucide-react";

const stepIcons = [ClipboardList, Search, Plane];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <HeroSection
        title="World-Class Healthcare. Wherever You Are."
        subtitle="Browse treatments, wellness programs and top-rated providers across Turkey, Thailand and India."
        backgroundImage="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920"
        primaryCta={{ label: "Find a Treatment", href: "/treatments" }}
        secondaryCta={{ label: "Explore Wellness Programs", href: "/wellness" }}
      />

      {/* Trust Bar */}
      <section className="border-b border-border bg-muted/50 py-8">
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
      <section className="py-20">
        <Container>
          <SectionHeader title="How It Works" subtitle="Three simple steps to world-class care" />
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={step.step} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Featured Treatments */}
      <section className="bg-muted/30 py-20">
        <Container>
          <SectionHeader title="Featured Treatments" subtitle="Trusted by thousands of international patients" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {treatments.slice(0, 4).map((t) => (
              <TreatmentCard key={t.id} treatment={t} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/treatments">View All Treatments</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Wellness */}
      <section className="py-20">
        <Container>
          <SectionHeader title="Featured Wellness Programs" subtitle="Reset, restore, and renew" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wellnessPrograms.slice(0, 4).map((p) => (
              <WellnessCard key={p.id} program={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/wellness">View All Programs</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Destinations */}
      <section className="bg-muted/30 py-20">
        <Container>
          <SectionHeader title="Popular Destinations" subtitle="World-class care in stunning locations" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {destinations.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section className="py-20">
        <Container>
          <SectionHeader title="What Our Patients Say" />
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </Container>
      </section>

      {/* Partner CTA */}
      <section className="bg-primary py-20">
        <Container>
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
              Are you a hospital or wellness provider?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/70">
              Join our network of verified healthcare providers and connect with thousands of international patients.
            </p>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <Link to="/partners/apply">Apply to be a Partner</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Index;
