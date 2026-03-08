import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Calculator } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

const treatmentCosts: Record<string, Record<string, number>> = {
  "Knee Replacement": { Turkey: 3200, Thailand: 4100, India: 2800, UAE: 6500 },
  "Dental Implants": { Turkey: 800, Thailand: 1200, India: 600, UAE: 1800 },
  "Hair Transplant": { Turkey: 1500, Thailand: 2200, India: 1000, UAE: 3000 },
  "IVF Treatment": { Turkey: 3000, Thailand: 3500, India: 2200, Greece: 2500 },
  "Hip Replacement": { Turkey: 3500, Thailand: 4500, India: 3000, UAE: 7000 },
  "LASIK Eye Surgery": { Turkey: 1200, Thailand: 1500, India: 800, UAE: 1800 },
};

const accommodationMultiplier: Record<string, number> = {
  Budget: 0,
  Standard: 300,
  Premium: 800,
  Luxury: 1500,
};

export function CostCalculator() {
  const [treatment, setTreatment] = useState("");
  const [country, setCountry] = useState("");
  const [accommodation, setAccommodation] = useState("Standard");
  const [companion, setCompanion] = useState(false);
  const { currency } = useCurrency();
  const rate = currency.rate || 1;
  const sym = currency.symbol;

  const baseCost = treatment && country ? treatmentCosts[treatment]?.[country] || 0 : 0;
  const accomCost = accommodationMultiplier[accommodation];
  const companionCost = companion ? 400 : 0;
  const totalLow = baseCost + accomCost + companionCost;
  const totalHigh = Math.round(totalLow * 1.3);

  const countries = treatment ? Object.keys(treatmentCosts[treatment] || {}) : [];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            <Calculator className="h-4 w-4" /> Cost Calculator
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">Estimate Your Treatment Cost</h2>
          <p className="mt-3 text-muted-foreground">Get an instant estimate including accommodation and travel.</p>
        </motion.div>

        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-md">
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Treatment Type</label>
              <select
                value={treatment}
                onChange={(e) => { setTreatment(e.target.value); setCountry(""); }}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select treatment</option>
                {Object.keys(treatmentCosts).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                disabled={!treatment}
              >
                <option value="">Select country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Accommodation Level</label>
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(accommodationMultiplier).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAccommodation(a)}
                    className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                      accommodation === a
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border hover:border-accent/30"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked={companion} onChange={(e) => setCompanion(e.target.checked)} className="rounded accent-primary" />
              Travelling with a companion (+{sym}{Math.round(400 * rate)})
            </label>
          </div>

          {baseCost > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-6"
            >
              <h3 className="font-serif text-lg font-bold">Estimated Cost</h3>
              <p className="mt-2 font-serif text-3xl font-bold text-primary">
                {sym}{Math.round(totalLow * rate).toLocaleString()} – {sym}{Math.round(totalHigh * rate).toLocaleString()}
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Treatment</span>
                  <span>{sym}{Math.round(baseCost * rate).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Accommodation ({accommodation})</span>
                  <span>{sym}{Math.round(accomCost * rate).toLocaleString()}</span>
                </div>
                {companion && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Companion</span>
                    <span>{sym}{Math.round(companionCost * rate).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 flex justify-between font-semibold">
                  <span>Total estimate</span>
                  <span className="text-primary">{sym}{Math.round(totalLow * rate).toLocaleString()} – {sym}{Math.round(totalHigh * rate).toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
