import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ProviderCard } from "@/components/cards/ProviderCard";
import { TreatmentCard } from "@/components/cards/TreatmentCard";
import { destinations, treatments } from "@/data/mockData";
import { Check, MapPin, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
    }
  };

  // Reset section when destination changes
  useEffect(() => { setActiveSection("overview"); }, [slug]);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <motion.img
          key={destination.slug}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <Container className="absolute bottom-0 left-0 right-0 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="text-5xl drop-shadow-lg">{destination.flag}</span>
            <h1 className="mt-3 font-serif text-4xl font-bold text-white drop-shadow-lg sm:text-5xl">
              Medical Travel in {destination.name}
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-white/85 drop-shadow">{destination.description}</p>
          </motion.div>
        </Container>
      </section>

      {/* Destination switcher — horizontal slider */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/98 backdrop-blur-xl">
        <Container>
          <div className="flex items-center gap-2 py-3">
            <button onClick={() => scroll("left")} className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div ref={scrollRef} className="flex flex-1 items-center gap-2 overflow-x-auto scroll-smooth no-scrollbar">
              {destinations.map((d) => (
                <Link
                  key={d.slug}
                  to={`/destinations/${d.slug}`}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    d.slug === slug
                      ? "bg-primary text-primary-foreground shadow-md scale-105"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:shadow-sm"
                  }`}
                >
                  <span className="text-base">{d.flag}</span> {d.name}
                </Link>
              ))}
            </div>
            <button onClick={() => scroll("right")} className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Container>
      </div>

      {/* Section tabs */}
      <div className="border-b border-border bg-card">
        <Container>
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`relative whitespace-nowrap px-5 py-4 text-sm font-medium transition-colors ${
                  activeSection === s.key ? "text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
                {activeSection === s.key && (
                  <motion.div
                    layoutId="dest-tab-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Content */}
      <section className="py-16">
        <Container>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${slug}-${activeSection}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
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
                            <span key={s} className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <Button className="mt-8 gap-2 bg-accent text-accent-foreground" asChild>
                      <Link to="/treatments">Browse Treatments in {destination.name} <ArrowRight className="h-4 w-4" /></Link>
                    </Button>
                  </div>
                  <div>
                    {destination.stats && (
                      <div className="grid grid-cols-2 gap-4">
                        {destination.stats.map((stat) => (
                          <motion.div
                            key={stat.label}
                            whileHover={{ scale: 1.03 }}
                            className="rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                          >
                            <p className="font-serif text-3xl font-bold text-primary">{stat.value}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeSection === "providers" && (
                <div>
                  <SectionHeader title={`Featured Providers in ${destination.name}`} />
                  {countryTreatments.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {countryTreatments.map((t) => (
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
                    {destination.whyChoose.map((reason, i) => (
                      <motion.li
                        key={reason}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <span className="text-lg text-foreground">{reason}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {activeSection === "map" && (
                <div>
                  <SectionHeader title={`Our Providers Across ${destination.name}`} />
                  <div className="flex h-96 items-center justify-center rounded-2xl bg-muted border border-border overflow-hidden">
                    <div className="text-center">
                      <MapPin className="mx-auto h-12 w-12 text-muted-foreground/30" />
                      <p className="mt-3 text-muted-foreground">Interactive map placeholder — {destination.name}</p>
                      <p className="text-sm text-muted-foreground">{destination.providerCount} providers across the country</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>
    </div>
  );
};

export default DestinationPage;
