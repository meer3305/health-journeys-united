import { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { WellnessCard } from "@/components/cards/WellnessCard";
import { MatchMeModal } from "@/components/MatchMeModal";
import { wellnessPrograms, wellnessTypes, wellnessCategories } from "@/data/mockData";
import { SlidersHorizontal, X, Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Wellness = () => {
  const [type, setType] = useState("All Types");
  const [category, setCategory] = useState("all");
  const [country, setCountry] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [matchOpen, setMatchOpen] = useState(false);
  const [mode, setMode] = useState<"choose" | "match" | "browse">("choose");

  const allCountries = ["All", ...Array.from(new Set(wellnessPrograms.map((p) => p.country)))];

  const filtered = useMemo(() => {
    return wellnessPrograms.filter((p) => {
      if (type !== "All Types" && p.type !== type) return false;
      if (category !== "all" && p.category !== category) return false;
      if (country !== "All" && p.country !== country) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [type, category, country, priceRange]);

  const handleMatchResults = (filters: Record<string, string>) => {
    setMode("browse");
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold">Category</h4>
        <div className="space-y-2">
          {wellnessCategories.map((c) => (
            <button key={c.key} onClick={() => setCategory(c.key)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                category === c.key ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
              }`}>{c.label}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-semibold">Program Type</h4>
        <div className="space-y-2">
          {wellnessTypes.map((t) => (
            <button key={t} onClick={() => setType(t)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                type === t ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
              }`}>{t}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-semibold">Location</h4>
        <div className="space-y-2">
          {allCountries.map((c) => (
            <button key={c} onClick={() => setCountry(c)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                country === c ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
              }`}>{c}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-semibold">Price Range</h4>
        <input type="range" min={0} max={5000} step={100} value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])} className="w-full accent-primary" />
        <p className="mt-1 text-sm text-muted-foreground">Up to £{priceRange[1].toLocaleString()}</p>
      </div>
    </div>
  );

  if (mode === "choose") {
    return (
      <div>
        <HeroSection title="Wellness Programs" subtitle="Curated health and wellness retreats to help you reset, restore, and renew." compact />
        <section className="py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold">Find Your Perfect Program</h2>
              <p className="mt-3 text-muted-foreground">Let us match you, or browse by category.</p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <button onClick={() => { setMode("match"); setMatchOpen(true); }}
                  className="flex flex-col items-center rounded-2xl border-2 border-accent/30 bg-accent/5 p-10 text-center transition-all hover:border-accent hover:shadow-lg">
                  <Sparkles className="h-12 w-12 text-accent" />
                  <h3 className="mt-4 font-serif text-xl font-semibold">Match Me</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Answer a few questions and we'll recommend the best wellness programs.</p>
                </button>
                <button onClick={() => setMode("browse")}
                  className="flex flex-col items-center rounded-2xl border-2 border-border p-10 text-center transition-all hover:border-primary hover:shadow-lg">
                  <Search className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 font-serif text-xl font-semibold">Search Manually</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Browse retreats, outdoor adventures, indoor programs, and holistic experiences.</p>
                </button>
              </div>
            </div>
          </Container>
        </section>
        <MatchMeModal type="wellness" open={matchOpen} onClose={() => { setMatchOpen(false); if (mode === "match") setMode("choose"); }} onResults={handleMatchResults} />
      </div>
    );
  }

  return (
    <div>
      <HeroSection title="Wellness Programs" subtitle="Curated health and wellness retreats to help you reset, restore, and renew." compact />
      <section className="py-12">
        <Container>
          {/* Category tabs */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            {wellnessCategories.map((c) => (
              <button key={c.key} onClick={() => setCategory(c.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === c.key ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>{c.label}</button>
            ))}
            <Button variant="outline" size="sm" className="ml-auto gap-2 border-accent text-accent" onClick={() => setMatchOpen(true)}>
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
              <p className="mb-6 text-sm text-muted-foreground">{filtered.length} programs found</p>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <WellnessCard key={p.id} program={p} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-lg text-muted-foreground">No programs match your filters.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { setType("All Types"); setCategory("all"); setCountry("All"); setPriceRange([0, 5000]); }}>
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
      <MatchMeModal type="wellness" open={matchOpen} onClose={() => setMatchOpen(false)} onResults={handleMatchResults} />
    </div>
  );
};

export default Wellness;
