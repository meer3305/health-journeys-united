import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { treatments } from "@/data/mockData";
import { X, Plus, Star, MapPin, Check, ArrowRight } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

const comparisonRows = [
  { label: "Price", render: (t: typeof treatments[0], fmt: (p: number) => string) => <span className="font-bold text-primary font-serif text-lg">{fmt(t.price)}</span> },
  { label: "Rating", render: (t: typeof treatments[0]) => <span className="flex items-center gap-1 font-semibold"><Star className="h-4 w-4 fill-accent text-accent" /> {t.rating}</span> },
  { label: "Location", render: (t: typeof treatments[0]) => <span className="flex items-center gap-1 text-sm"><MapPin className="h-3.5 w-3.5 text-primary" /> {t.city}, {t.country}</span> },
  { label: "Hospital Stay", render: (t: typeof treatments[0]) => <span className="text-sm">{t.duration}</span> },
  { label: "Recovery Time", render: (t: typeof treatments[0]) => <span className="text-sm">{t.duration}</span> },
  { label: "JCI Accredited", render: (t: typeof treatments[0]) => t.accredited ? <span className="flex items-center gap-1 text-sm text-green-600 font-medium"><Check className="h-4 w-4" /> Yes</span> : <span className="text-sm text-muted-foreground">No</span> },
  { label: "Reviews", render: (t: typeof treatments[0]) => <span className="text-sm font-medium">{t.reviewCount} reviews</span> },
  { label: "Included Items", render: (t: typeof treatments[0]) => <span className="text-xs text-muted-foreground">{t.included.slice(0, 3).join(", ")}</span> },
];

export function ComparisonTool() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const { formatPrice } = useCurrency();

  const selectedTreatments = treatments.filter((t) => selected.includes(t.id));

  const addTreatment = (id: string) => {
    if (selected.length < 3 && !selected.includes(id)) {
      setSelected([...selected, id]);
    }
    setShowPicker(false);
  };

  const removeTreatment = (id: string) => {
    setSelected(selected.filter((s) => s !== id));
  };

  // Quick-add popular treatments
  const quickAdd = () => {
    setSelected(["1", "5", "6"].slice(0, 3 - selected.length).concat(selected).slice(0, 3));
  };

  return (
    <section className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            📊 Compare Providers
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">Treatment Comparison Tool</h2>
          <p className="mt-3 text-muted-foreground">Compare up to 3 providers side by side to make an informed decision</p>
          {selected.length === 0 && (
            <Button variant="outline" size="sm" className="mt-4 gap-1.5" onClick={quickAdd}>
              Quick Compare Popular Treatments <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </motion.div>

        {/* Selection Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {[0, 1, 2].map((slot) => {
            const t = selectedTreatments[slot];
            return (
              <div key={slot} className="relative">
                {t ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15 }}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <button
                      onClick={() => removeTreatment(t.id)}
                      className="absolute top-3 right-3 rounded-full p-1.5 bg-muted hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <img src={t.image} alt={t.name} className="h-32 w-full rounded-xl object-cover" loading="lazy" />
                    <h3 className="mt-3 font-semibold">{t.name}</h3>
                    <p className="text-sm text-muted-foreground">{t.provider}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" /> {t.city}</span>
                      <span className="font-bold text-primary">{formatPrice(t.price)}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setShowPicker(true)}
                    className="flex h-56 w-full items-center justify-center rounded-2xl border-2 border-dashed border-border hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-200"
                  >
                    <div className="text-center text-muted-foreground">
                      <Plus className="mx-auto h-8 w-8" />
                      <p className="mt-2 text-sm font-medium">Add Provider</p>
                      <p className="text-xs">Click to select</p>
                    </div>
                  </motion.button>
                )}
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        {selectedTreatments.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-x-auto rounded-2xl border border-border bg-card shadow-md"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="p-5 text-left font-semibold text-muted-foreground w-36">Feature</th>
                  {selectedTreatments.map((t) => (
                    <th key={t.id} className="p-5 text-left">
                      <p className="font-semibold text-foreground">{t.provider}</p>
                      <p className="text-xs text-muted-foreground font-normal">{t.city}, {t.country}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                    <td className="p-5 font-medium text-muted-foreground">{row.label}</td>
                    {selectedTreatments.map((t) => (
                      <td key={t.id} className="p-5">{row.render(t, formatPrice)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Picker Modal */}
        <AnimatePresence>
          {showPicker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowPicker(false)}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg max-h-[70vh] overflow-y-auto rounded-2xl bg-card border border-border p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-serif text-xl font-bold">Select a Treatment</h3>
                  <button onClick={() => setShowPicker(false)} className="rounded-full p-1.5 hover:bg-muted transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {treatments.filter((t) => !selected.includes(t.id)).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => addTreatment(t.id)}
                      className="flex w-full items-center gap-4 rounded-xl border border-border p-3 text-left transition-all duration-150 hover:bg-muted/50 hover:border-primary/20"
                    >
                      <img src={t.image} alt={t.name} className="h-14 w-14 rounded-lg object-cover" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.provider} • {t.city}, {t.country}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-primary text-sm">{formatPrice(t.price)}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-0.5"><Star className="h-3 w-3 fill-accent text-accent" /> {t.rating}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
