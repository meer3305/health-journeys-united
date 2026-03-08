import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ProviderCard } from "@/components/cards/ProviderCard";
import { TreatmentCard } from "@/components/cards/TreatmentCard";
import { destinations, treatments } from "@/data/mockData";
import { Check, MapPin } from "lucide-react";
import { useState } from "react";

const sections = [
  { key: "overview", label: "Overview" },
  { key: "providers", label: "Providers" },
  { key: "treatments", label: "Treatments" },
  { key: "why", label: "Why Choose" },
  { key: "map", label: "Map" },
];

const DestinationPage = () => {
  const { country: slug } = useParams();
  const destination = destinations.find((d) => d.slug === slug) || destinations[0];
  const [activeSection, setActiveSection] = useState("overview");
  const countryTreatments = treatments.filter((t) => t.country === destination.country);
  const countryProviders = countryTreatments;

  // Destination selector tabs
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px]">
        <img src={destination.image} alt={destination.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <Container className="absolute bottom-0 left-0 right-0 pb-10">
          <span className="text-5xl">{destination.flag}</span>
          <h1 className="mt-2 font-serif text-4xl font-bold text-background sm:text-5xl">
            Medical Travel in {destination.name}
          </h1>
          <p className="mt-2 text-lg text-background/80">{destination.description}</p>
        </Container>
      </section>

      {/* Destination switcher */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            <span className="mr-2 text-sm font-medium text-muted-foreground shrink-0">Destinations:</span>
            {destinations.map((d) => (
              <Link
                key={d.slug}
                to={`/destinations/${d.slug}`}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  d.slug === slug ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <span>{d.flag}</span> {d.name}
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* Section tabs */}
      <div className="border-b border-border bg-card">
        <Container>
          <div className="flex gap-1 overflow-x-auto">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`whitespace-nowrap px-5 py-3.5 text-sm font-medium transition-colors ${
                  activeSection === s.key ? "border-b-2 border-accent text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Content */}
      <section className="py-16">
        <Container>
          {activeSection === "overview" && (
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-serif text-3xl font-bold">Why {destination.name}?</h2>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{destination.description}</p>
                {destination.topSpecialties && (
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Top Specialties</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {destination.topSpecialties.map((s) => (
                        <span key={s} className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                {destination.stats && (
                  <div className="grid grid-cols-2 gap-4">
                    {destination.stats.map((stat) => (
                      <div key={stat.label} className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
                        <p className="font-serif text-3xl font-bold text-primary">{stat.value}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === "providers" && (
            <div>
              <SectionHeader title={`Featured Providers in ${destination.name}`} />
              {countryProviders.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {countryProviders.map((t) => (
                    <ProviderCard key={t.id} name={t.provider} specialty={t.specialty}
                      location={`${t.city}, ${t.country}`} rating={t.rating} reviewCount={t.reviewCount}
                      image={t.image} accredited={t.accredited} />
                  ))}
                </div>
              ) : (
                <p className="py-12 text-center text-muted-foreground">No providers listed yet for {destination.name}. Check back soon!</p>
              )}
            </div>
          )}

          {activeSection === "treatments" && (
            <div>
              <SectionHeader title={`Treatments in ${destination.name}`} />
              {countryTreatments.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {countryTreatments.map((t) => (
                    <TreatmentCard key={t.id} treatment={t} />
                  ))}
                </div>
              ) : (
                <p className="py-12 text-center text-muted-foreground">No treatments listed yet for {destination.name}.</p>
              )}
            </div>
          )}

          {activeSection === "why" && destination.whyChoose && (
            <div className="mx-auto max-w-2xl">
              <SectionHeader title={`Why Choose ${destination.name}?`} />
              <ul className="space-y-4">
                {destination.whyChoose.map((reason) => (
                  <li key={reason} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-lg text-muted-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeSection === "map" && (
            <div>
              <SectionHeader title={`Our Providers Across ${destination.name}`} />
              <div className="flex h-96 items-center justify-center rounded-xl bg-muted border border-border">
                <div className="text-center">
                  <MapPin className="mx-auto h-12 w-12 text-muted-foreground/30" />
                  <p className="mt-3 text-muted-foreground">Interactive map placeholder — {destination.name}</p>
                  <p className="text-sm text-muted-foreground">{destination.providerCount} providers across the country</p>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default DestinationPage;
