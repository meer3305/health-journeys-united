import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ProviderCard } from "@/components/cards/ProviderCard";
import { treatments } from "@/data/mockData";
import { Check } from "lucide-react";

const turkeyProviders = treatments.filter((t) => t.country === "Turkey");

const whyTurkey = [
  "Up to 70% savings compared to UK/US prices",
  "JCI-accredited hospitals with cutting-edge technology",
  "Over 1 million medical tourists annually",
  "English-speaking medical staff",
  "Beautiful recovery destinations",
  "Short flights from Europe (3–4 hours)",
];

const stats = [
  { value: "1M+", label: "Medical tourists/year" },
  { value: "46", label: "JCI-accredited hospitals" },
  { value: "70%", label: "Average savings" },
  { value: "#4", label: "Global ranking" },
];

const DestinationTurkey = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px]">
        <img
          src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920"
          alt="Istanbul skyline"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <Container className="absolute bottom-0 left-0 right-0 pb-10">
          <span className="text-4xl">🇹🇷</span>
          <h1 className="mt-2 font-serif text-4xl font-bold text-background sm:text-5xl">Turkey</h1>
          <p className="mt-2 text-lg text-background/80">The world's leading destination for medical tourism</p>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-muted/50 py-8">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Providers */}
      <section className="py-20">
        <Container>
          <SectionHeader title="Featured Providers in Turkey" />
          <div className="grid gap-4 sm:grid-cols-2">
            {turkeyProviders.map((t) => (
              <ProviderCard
                key={t.id}
                name={t.provider}
                specialty={t.specialty}
                location={`${t.city}, ${t.country}`}
                rating={t.rating}
                reviewCount={t.reviewCount}
                image={t.image}
                accredited={t.accredited}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Why Turkey */}
      <section className="bg-muted/30 py-20">
        <Container>
          <SectionHeader title="Why Choose Turkey?" />
          <div className="mx-auto max-w-2xl">
            <ul className="space-y-4">
              {whyTurkey.map((reason) => (
                <li key={reason} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Map placeholder */}
      <section className="py-20">
        <Container>
          <SectionHeader title="Our Providers Across Turkey" />
          <div className="flex h-80 items-center justify-center rounded-xl bg-muted">
            <p className="text-muted-foreground">Interactive map placeholder — Istanbul, Ankara, Antalya</p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default DestinationTurkey;
