import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ProviderCard } from "@/components/cards/ProviderCard";
import { TreatmentCard } from "@/components/cards/TreatmentCard";
import { Destination3DCard } from "@/components/cards/Destination3DCard";
import { Carousel3D } from "@/components/Carousel3D";
import { destinations, treatments } from "@/data/mockData";
import {
  Check, MapPin, ArrowRight, Building2, Users, TrendingDown,
  Star, Stethoscope, Plane, ShieldCheck, Globe, Heart,
  Banknote, Clock, HeartPulse
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.2 } }),
};

const sections = [
  { key: "overview", label: "Overview" },
  { key: "stats", label: "Statistics" },
  { key: "hospitals", label: "Top Hospitals" },
  { key: "treatments", label: "Treatments" },
  { key: "savings", label: "Savings" },
  { key: "travel", label: "Travel Tips" },
];

// Rich destination data
const destinationData: Record<string, any> = {
  turkey: {
    stats: [
      { value: "700+", label: "Accredited Hospitals", icon: Building2 },
      { value: "1.5M", label: "International Patients/yr", icon: Users },
      { value: "70%", label: "Average Savings vs UK", icon: TrendingDown },
      { value: "4.7★", label: "Average Rating", icon: Star },
    ],
    topHospitals: [
      { name: "Istanbul Health Centre", slug: "istanbul-health-centre", location: "Istanbul", rating: 4.8, specialties: ["Orthopaedics", "Dental", "Cosmetic"], patients: "15K+", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600" },
      { name: "Acıbadem Hospital", slug: "istanbul-health-centre", location: "Istanbul", rating: 4.9, specialties: ["Oncology", "Cardiology", "Neurology"], patients: "25K+", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600" },
      { name: "Memorial Hospital", slug: "istanbul-health-centre", location: "Ankara", rating: 4.7, specialties: ["IVF", "Bariatric", "Ophthalmology"], patients: "20K+", image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600" },
    ],
    topTreatments: [
      { name: "Hair Transplant", ukPrice: 8000, localPrice: 1500, savings: 81 },
      { name: "Dental Implants", ukPrice: 2500, localPrice: 600, savings: 76 },
      { name: "Knee Replacement", ukPrice: 14000, localPrice: 3200, savings: 77 },
      { name: "Rhinoplasty", ukPrice: 7000, localPrice: 2800, savings: 60 },
      { name: "LASIK Eye Surgery", ukPrice: 5000, localPrice: 1200, savings: 76 },
      { name: "Gastric Sleeve", ukPrice: 9000, localPrice: 3000, savings: 67 },
    ],
    travelTips: [
      { title: "Visa", description: "UK citizens can get an e-Visa online in minutes. Valid for 90 days.", icon: Globe },
      { title: "Flights", description: "Direct flights from London (3.5 hrs). Budget airlines offer fares from £60 return.", icon: Plane },
      { title: "Recovery", description: "Istanbul offers excellent recovery hotels near hospitals. Many include nursing support.", icon: Heart },
      { title: "Language", description: "All major hospitals have English-speaking staff and dedicated international patient departments.", icon: Users },
      { title: "Currency", description: "Turkish Lira (₺). Credit cards widely accepted. Great exchange rates for GBP/EUR/USD.", icon: Banknote },
      { title: "Best Time", description: "Spring (Apr–Jun) and Autumn (Sep–Nov) offer mild weather ideal for recovery.", icon: Clock },
    ],
    whyChoose: [
      "World-class JCI-accredited hospitals",
      "Up to 80% savings on treatments",
      "Short flight from Europe (2–4 hours)",
      "All-inclusive treatment packages",
      "Rich culture and post-treatment tourism",
      "English-speaking medical staff",
    ],
  },
};

// Fallback for other destinations
const getDestData = (slug: string) => {
  if (destinationData[slug]) return destinationData[slug];
  return {
    stats: [
      { value: "200+", label: "Hospitals", icon: Building2 },
      { value: "500K+", label: "International Patients", icon: Users },
      { value: "60%", label: "Average Savings", icon: TrendingDown },
      { value: "4.6★", label: "Rating", icon: Star },
    ],
    topHospitals: [],
    topTreatments: [
      { name: "General Surgery", ukPrice: 10000, localPrice: 4000, savings: 60 },
    ],
    travelTips: [
      { title: "Getting There", description: "Major international airports with direct connections.", icon: Plane },
      { title: "Medical Standards", description: "JCI and internationally accredited facilities available.", icon: ShieldCheck },
    ],
    whyChoose: ["Quality healthcare at affordable prices", "International patient support"],
  };
};

const DestinationPage = () => {
  const { country: slug } = useParams();
  const destIndex = destinations.findIndex((d) => d.slug === slug);
  const destination = destIndex >= 0 ? destinations[destIndex] : destinations[0];
  const [activeSection, setActiveSection] = useState("overview");
  const countryTreatments = treatments.filter((t) => t.country === destination.country);
  const destData = getDestData(slug || "");

  useEffect(() => { setActiveSection("overview"); }, [slug]);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <motion.img
          key={destination.slug}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <Container className="absolute bottom-0 left-0 right-0 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <span className="text-5xl drop-shadow-lg">{destination.flag}</span>
            <h1 className="mt-3 font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Medical Travel in {destination.name}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/85">{destination.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(destination.topSpecialties || []).slice(0, 4).map((s: string) => (
                <span key={s} className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium text-white">{s}</span>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Quick Stats */}
      <section className="relative -mt-10 z-10 pb-8">
        <Container>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {destData.stats.map((s: any, i: number) => (
              <motion.div key={s.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="rounded-2xl border border-border bg-card p-5 text-center shadow-md">
                <s.icon className="mx-auto h-5 w-5 text-primary mb-2" />
                <p className="font-serif text-2xl font-bold text-foreground sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Destination Carousel */}
      <section className="py-10 bg-muted/30">
        <Container>
          <h2 className="mb-6 text-center font-serif text-xl font-bold">Explore Destinations</h2>
          <Carousel3D>
            {destinations.map((d) => (
              <Destination3DCard key={d.id} destination={d} />
            ))}
          </Carousel3D>
        </Container>
      </section>

      {/* Section Tabs */}
      <div className="border-b border-border bg-card sticky top-16 z-20">
        <Container>
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`relative whitespace-nowrap px-5 py-4 text-sm font-medium transition-colors ${
                  activeSection === s.key ? "text-primary" : "text-muted-foreground hover:text-foreground"
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
              transition={{ duration: 0.2 }}
            >
              {activeSection === "overview" && (
                <div className="grid gap-12 lg:grid-cols-2">
                  <div>
                    <h2 className="font-serif text-3xl font-bold">Why {destination.name}?</h2>
                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{destination.description}</p>
                    {destData.whyChoose && (
                      <ul className="mt-8 space-y-3">
                        {destData.whyChoose.map((reason: string, i: number) => (
                          <motion.li key={reason} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="flex items-center gap-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                              <Check className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm text-foreground">{reason}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                    <Button className="mt-8 gap-2 bg-primary hover:bg-primary/90" asChild>
                      <Link to="/treatments">Browse Treatments in {destination.name} <ArrowRight className="h-4 w-4" /></Link>
                    </Button>
                  </div>
                  <div>
                    {destination.topSpecialties && (
                      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <h3 className="font-serif text-lg font-bold mb-4">Top Specialties</h3>
                        <div className="space-y-3">
                          {destination.topSpecialties.map((s: string) => (
                            <div key={s} className="flex items-center gap-3 rounded-xl bg-muted/40 p-3">
                              <HeartPulse className="h-5 w-5 text-accent" />
                              <span className="text-sm font-medium">{s}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeSection === "stats" && (
                <div>
                  <h2 className="font-serif text-3xl font-bold text-center">{destination.name} Medical Tourism</h2>
                  <p className="mt-3 text-center text-muted-foreground">Key statistics about healthcare in {destination.name}</p>
                  <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {destData.stats.map((s: any, i: number) => (
                      <motion.div key={s.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                        <s.icon className="mx-auto h-8 w-8 text-primary mb-4" />
                        <p className="font-serif text-4xl font-bold text-foreground">{s.value}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                      </motion.div>
                    ))}
                  </div>
                  {destination.stats && (
                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {destination.stats.map((stat: any) => (
                        <div key={stat.label} className="rounded-xl border border-border bg-muted/30 p-5 text-center">
                          <p className="font-serif text-2xl font-bold text-primary">{stat.value}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeSection === "hospitals" && (
                <div>
                  <h2 className="font-serif text-3xl font-bold">Top Hospitals in {destination.name}</h2>
                  <p className="mt-3 text-muted-foreground">JCI-accredited and internationally recognised facilities</p>
                  {destData.topHospitals.length > 0 ? (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {destData.topHospitals.map((h: any, i: number) => (
                        <motion.div key={h.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                          <Link to={`/providers/${h.slug}`} className="group block rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                            <div className="relative h-40 overflow-hidden">
                              <img src={h.image} alt={h.name} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" loading="lazy" />
                              <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-primary flex items-center gap-1">
                                <Star className="h-3 w-3 fill-accent text-accent" /> {h.rating}
                              </div>
                            </div>
                            <div className="p-5">
                              <h3 className="font-semibold group-hover:text-primary transition-colors">{h.name}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {h.location}</p>
                              <p className="text-xs text-muted-foreground mt-1">{h.patients} international patients</p>
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {h.specialties.map((s: string) => (
                                  <span key={s} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{s}</span>
                                ))}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-8">
                      {countryTreatments.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                          {countryTreatments.map((t) => (
                            <ProviderCard key={t.id} name={t.provider} specialty={t.specialty}
                              location={`${t.city}, ${t.country}`} rating={t.rating} reviewCount={t.reviewCount}
                              image={t.image} accredited={t.accredited} />
                          ))}
                        </div>
                      ) : (
                        <p className="py-12 text-center text-muted-foreground">Hospital listings coming soon for {destination.name}.</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeSection === "treatments" && (
                <div>
                  <h2 className="font-serif text-3xl font-bold">Treatments in {destination.name}</h2>
                  {countryTreatments.length > 0 ? (
                    <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {countryTreatments.map((t) => (
                        <TreatmentCard key={t.id} treatment={t} />
                      ))}
                    </div>
                  ) : (
                    <p className="py-12 text-center text-muted-foreground">No treatments listed yet for {destination.name}.</p>
                  )}
                </div>
              )}

              {activeSection === "savings" && (
                <div>
                  <h2 className="font-serif text-3xl font-bold text-center">Average Savings vs UK</h2>
                  <p className="mt-3 text-center text-muted-foreground">See how much you could save on popular treatments in {destination.name}</p>
                  <div className="mt-10 space-y-4 max-w-3xl mx-auto">
                    {destData.topTreatments.map((t: any, i: number) => (
                      <motion.div key={t.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">{t.name}</h3>
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">Save {t.savings}%</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="w-16 text-xs text-muted-foreground">UK</span>
                            <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                              <div className="h-full bg-muted-foreground/20 rounded-full" style={{ width: "100%" }} />
                            </div>
                            <span className="text-sm font-semibold w-20 text-right text-muted-foreground">£{t.ukPrice.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-16 text-xs text-primary font-medium">{destination.name}</span>
                            <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${(t.localPrice / t.ukPrice) * 100}%` }} />
                            </div>
                            <span className="text-sm font-bold w-20 text-right text-primary">£{t.localPrice.toLocaleString()}</span>
                          </div>
                        </div>
                        <p className="mt-3 text-center text-sm font-semibold text-green-600">
                          You save £{(t.ukPrice - t.localPrice).toLocaleString()}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "travel" && (
                <div>
                  <h2 className="font-serif text-3xl font-bold text-center">Travel Tips for {destination.name}</h2>
                  <p className="mt-3 text-center text-muted-foreground">Everything you need to know before your trip</p>
                  <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {destData.travelTips.map((tip: any, i: number) => (
                      <motion.div key={tip.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 mb-4">
                          <tip.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold">{tip.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
                      </motion.div>
                    ))}
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
