import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { treatments } from "@/data/mockData";
import { X, Plus, Star, MapPin } from "lucide-react";

export function ComparisonTool() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);

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

  return (
    <section className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            📊 Compare Providers
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">Treatment Comparison Tool</h2>
          <p className="mt-3 text-muted-foreground">Compare up to 3 providers side by side</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {[0, 1, 2].map((slot) => {
            const t = selectedTreatments[slot];
            return (
              <div key={slot} className="relative">
                {t ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <button
                      onClick={() => removeTreatment(t.id)}
                      className="absolute top-3 right-3 rounded-full p-1 hover:bg-muted transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <img src={t.image} alt={t.name} className="h-32 w-full rounded-xl object-cover" loading="lazy" />
                    <h3 className="mt-3 font-semibold">{t.name}</h3>
                    <p className="text-sm text-muted-foreground">{t.provider}</p>
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowPicker(true)}
                    className="flex h-48 w-full items-center justify-center rounded-2xl border-2 border-dashed border-border hover:border-accent/30 transition-colors"
                  >
                    <div className="text-center text-muted-foreground">
                      <Plus className="mx-auto h-8 w-8" />
                      <p className="mt-2 text-sm">Add Provider</p>
                    </div>
                  </motion.button>
                )}
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        {selectedTreatments.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left font-semibold text-muted-foreground">Feature</th>
                  {selectedTreatments.map((t) => (
                    <th key={t.id} className="p-4 text-left font-semibold">{t.provider}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Price", render: (t: typeof treatments[0]) => <span className="font-semibold text-primary">{t.currency}{t.price.toLocaleString()}</span> },
                  { label: "Rating", render: (t: typeof treatments[0]) => <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" /> {t.rating}</span> },
                  { label: "Location", render: (t: typeof treatments[0]) => <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {t.city}, {t.country}</span> },
                  { label: "Duration", render: (t: typeof treatments[0]) => t.duration },
                  { label: "Accredited", render: (t: typeof treatments[0]) => t.accredited ? "✅ Yes" : "❌ No" },
                  { label: "Reviews", render: (t: typeof treatments[0]) => `${t.reviewCount} reviews` },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <td className="p-4 font-medium text-muted-foreground">{row.label}</td>
                    {selectedTreatments.map((t) => (
                      <td key={t.id} className="p-4">{row.render(t)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Picker modal */}
        <AnimatePresence>
          {showPicker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowPicker(false)}
            >
              <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg max-h-[70vh] overflow-y-auto rounded-2xl bg-background border border-border p-6 shadow-2xl"
              >
                <h3 className="font-serif text-xl font-bold mb-4">Select a Treatment</h3>
                <div className="space-y-2">
                  {treatments.filter((t) => !selected.includes(t.id)).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => addTreatment(t.id)}
                      className="flex w-full items-center gap-4 rounded-xl border border-border p-3 text-left hover:bg-muted/50 transition-colors"
                    >
                      <img src={t.image} alt={t.name} className="h-12 w-12 rounded-lg object-cover" loading="lazy" />
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.provider} • {t.currency}{t.price.toLocaleString()}</p>
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
