import { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { TreatmentCard } from "@/components/cards/TreatmentCard";
import { MatchMeModal } from "@/components/MatchMeModal";
import { treatments, specialties } from "@/data/mockData";
import { SlidersHorizontal, X, Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Treatments = () => {
  const [specialty, setSpecialty] = useState("All Specialties");
  const [country, setCountry] = useState("All Destinations");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [accreditedOnly, setAccreditedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [matchOpen, setMatchOpen] = useState(false);
  const [mode, setMode] = useState<"choose" | "match" | "browse">("choose");

  const filtered = useMemo(() => {
    return treatments.filter((t) => {
      if (specialty !== "All Specialties" && t.specialty !== specialty) return false;
      if (country !== "All Destinations" && t.country !== country) return false;
      if (t.price < priceRange[0] || t.price > priceRange[1]) return false;
      if (accreditedOnly && !t.accredited) return false;
      return true;
    });
  }, [specialty, country, priceRange, accreditedOnly]);

  const handleMatchResults = (filters: Record<string, string>) => {
    setMode("browse");
    // Simple filter mapping
    if (filters.destination && filters.destination !== "No preference") {
      setCountry(filters.destination);
    }
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold">Specialty</h4>
        <div className="space-y-2">
          {specialties.map((s) => (
            <button key={s} onClick={() => setSpecialty(s)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                specialty === s ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
              }`}>{s}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-semibold">Destination</h4>
        <div className="space-y-2">
          {["All Destinations", "Turkey", "Greece", "India", "Thailand", "UAE"].map((c) => (
            <button key={c} onClick={() => setCountry(c)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                country === c ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
              }`}>{c}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-semibold">Price Range</h4>
        <input type="range" min={0} max={10000} step={100} value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])} className="w-full accent-primary" />
        <p className="mt-1 text-sm text-muted-foreground">Up to £{priceRange[1].toLocaleString()}</p>
      </div>
      <div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={accreditedOnly} onChange={(e) => setAccreditedOnly(e.target.checked)} className="rounded accent-primary" />
          Accredited providers only
        </label>
      </div>
    </div>
  );

  if (mode === "choose") {
    return (
      <div>
        <HeroSection title="Find Your Treatment" subtitle="Get matched to the perfect treatment, or browse our full catalog." compact />
        <section className="py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold">How would you like to start?</h2>
              <p className="mt-3 text-muted-foreground">Let us find your perfect match, or explore treatments on your own.</p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <button onClick={() => { setMode("match"); setMatchOpen(true); }}
                  className="flex flex-col items-center rounded-2xl border-2 border-accent/30 bg-accent/5 p-10 text-center transition-all hover:border-accent hover:shadow-lg">
                  <Sparkles className="h-12 w-12 text-accent" />
                  <h3 className="mt-4 font-serif text-xl font-semibold">Match Me</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Answer a few questions and we'll recommend the best treatments for you.</p>
                </button>
                <button onClick={() => setMode("browse")}
                  className="flex flex-col items-center rounded-2xl border-2 border-border p-10 text-center transition-all hover:border-primary hover:shadow-lg">
                  <Search className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 font-serif text-xl font-semibold">Search Manually</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Browse all treatments with filters by specialty, destination, and price.</p>
                </button>
              </div>
            </div>
          </Container>
        </section>
        <MatchMeModal type="treatment" open={matchOpen} onClose={() => { setMatchOpen(false); if (mode === "match") setMode("choose"); }} onResults={handleMatchResults} />
      </div>
    );
  }

  return (
    <div>
      <HeroSection title="Find Your Treatment" subtitle="Browse verified treatments across specialties and destinations worldwide." compact />
      <section className="py-12">
        <Container>
          <div className="mb-6 flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 border-accent text-accent" onClick={() => { setMatchOpen(true); }}>
              <Sparkles className="h-4 w-4" /> Match Me Instead
            </Button>
          </div>
          <div className="flex flex-col gap-8 lg:flex-row">
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-6 font-serif text-lg font-semibold">Filters</h3>
                <FilterSidebar />
              </div>
            </aside>

            <div className="lg:hidden">
              <Button variant="outline" onClick={() => setShowFilters(true)} className="mb-4 gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </Button>
            </div>

            <div className="flex-1">
              <p className="mb-6 text-sm text-muted-foreground">{filtered.length} treatments found</p>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((t) => (
                  <TreatmentCard key={t.id} treatment={t} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-lg text-muted-foreground">No treatments match your filters.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { setSpecialty("All Specialties"); setCountry("All Destinations"); setPriceRange([0, 10000]); setAccreditedOnly(false); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setShowFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
            </div>
            <FilterSidebar />
            <Button className="mt-6 w-full bg-accent text-accent-foreground" onClick={() => setShowFilters(false)}>Apply Filters</Button>
          </div>
        </div>
      )}
      <MatchMeModal type="treatment" open={matchOpen} onClose={() => setMatchOpen(false)} onResults={handleMatchResults} />
    </div>
  );
};

export default Treatments;
