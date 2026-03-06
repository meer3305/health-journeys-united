import { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { WellnessCard } from "@/components/cards/WellnessCard";
import { wellnessPrograms, wellnessTypes } from "@/data/mockData";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Wellness = () => {
  const [type, setType] = useState("All Types");
  const [country, setCountry] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);

  const allCountries = ["All", ...Array.from(new Set(wellnessPrograms.map((p) => p.country)))];

  const filtered = useMemo(() => {
    return wellnessPrograms.filter((p) => {
      if (type !== "All Types" && p.type !== type) return false;
      if (country !== "All" && p.country !== country) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [type, country, priceRange]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold">Program Type</h4>
        <div className="space-y-2">
          {wellnessTypes.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                type === t ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-semibold">Location</h4>
        <div className="space-y-2">
          {allCountries.map((c) => (
            <button
              key={c}
              onClick={() => setCountry(c)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                country === c ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-semibold">Price Range</h4>
        <input
          type="range"
          min={0}
          max={5000}
          step={100}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-primary"
        />
        <p className="mt-1 text-sm text-muted-foreground">Up to £{priceRange[1].toLocaleString()}</p>
      </div>
    </div>
  );

  return (
    <div>
      <HeroSection
        title="Wellness Programs"
        subtitle="Curated health and wellness retreats to help you reset, restore, and renew."
        compact
      />
      <section className="py-12">
        <Container>
          <div className="flex gap-8">
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
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <WellnessCard key={p.id} program={p} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-lg text-muted-foreground">No programs match your filters.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { setType("All Types"); setCountry("All"); setPriceRange([0, 5000]); }}>
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
            <Button className="mt-6 w-full" onClick={() => setShowFilters(false)}>Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wellness;
