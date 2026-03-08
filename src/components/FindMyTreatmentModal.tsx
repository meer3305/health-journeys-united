import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, MapPin, Wallet, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { treatments } from "@/data/mockData";
import { Link } from "react-router-dom";

const conditions = [
  { label: "Knee / Hip Pain", icon: "🦴" },
  { label: "Dental", icon: "🦷" },
  { label: "Fertility / IVF", icon: "👶" },
  { label: "Hair Loss", icon: "💇" },
  { label: "Heart Condition", icon: "❤️" },
  { label: "Cancer / Oncology", icon: "🔬" },
  { label: "Eye Surgery", icon: "👁️" },
  { label: "Cosmetic", icon: "✨" },
];

const countries = [
  { label: "Turkey", flag: "🇹🇷" },
  { label: "Thailand", flag: "🇹🇭" },
  { label: "India", flag: "🇮🇳" },
  { label: "UAE", flag: "🇦🇪" },
  { label: "Germany", flag: "🇩🇪" },
  { label: "Not sure", flag: "🌍" },
];

const budgets = ["Under £2,000", "£2,000 – £5,000", "£5,000 – £10,000", "£10,000+", "Not sure"];

interface FindMyTreatmentModalProps {
  open: boolean;
  onClose: () => void;
}

export function FindMyTreatmentModal({ open, onClose }: FindMyTreatmentModalProps) {
  const [step, setStep] = useState(1);
  const [condition, setCondition] = useState("");
  const [country, setCountry] = useState("");
  const [budget, setBudget] = useState("");

  const getResults = () => {
    return treatments.filter((t) => {
      if (country && country !== "Not sure" && t.country !== country) return false;
      return true;
    }).slice(0, 3);
  };

  const reset = () => { setStep(1); setCondition(""); setCountry(""); setBudget(""); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-accent/20 bg-background shadow-2xl"
            style={{ boxShadow: "0 0 40px rgba(34,211,238,0.15), 0 25px 50px rgba(0,0,0,0.15)" }}
          >
            <button
              onClick={() => { onClose(); reset(); }}
              className="absolute right-4 top-4 z-10 rounded-full p-2 hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8">
              {/* Progress */}
              <div className="mb-8 flex items-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: step >= s ? 1 : 0.8 }}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                        step >= s
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                      style={step >= s ? { boxShadow: "0 0 12px rgba(15,118,110,0.3)" } : {}}
                    >
                      {s}
                    </motion.div>
                    {s < 3 && <div className={`h-0.5 w-8 rounded-full transition-colors ${step > s ? "bg-primary" : "bg-muted"}`} />}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.15 }}>
                    <h2 className="font-serif text-2xl font-bold">What health concern are you looking to address?</h2>
                    <p className="mt-2 text-muted-foreground">Select your primary concern</p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {conditions.map((c) => (
                        <motion.button
                          key={c.label}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setCondition(c.label); setStep(2); }}
                          className={`flex items-center gap-3 rounded-2xl border p-4 text-left text-sm font-medium transition-all ${
                            condition === c.label
                              ? "border-accent bg-accent/5 neon-glow"
                              : "border-border hover:border-accent/30 hover:bg-muted/50"
                          }`}
                        >
                          <span className="text-xl">{c.icon}</span>
                          {c.label}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.15 }}>
                    <h2 className="font-serif text-2xl font-bold">Where would you prefer to travel?</h2>
                    <p className="mt-2 text-muted-foreground">Select your preferred destination</p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {countries.map((c) => (
                        <motion.button
                          key={c.label}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setCountry(c.label); setStep(3); }}
                          className={`flex items-center gap-3 rounded-2xl border p-4 text-left text-sm font-medium transition-all ${
                            country === c.label
                              ? "border-accent bg-accent/5 neon-glow"
                              : "border-border hover:border-accent/30 hover:bg-muted/50"
                          }`}
                        >
                          <span className="text-xl">{c.flag}</span>
                          {c.label}
                        </motion.button>
                      ))}
                    </div>
                    <button onClick={() => setStep(1)} className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">← Back</button>
                  </motion.div>
                )}

                {step === 3 && !budget && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.15 }}>
                    <h2 className="font-serif text-2xl font-bold">What is your estimated budget?</h2>
                    <p className="mt-2 text-muted-foreground">This helps us find the best match</p>
                    <div className="mt-6 grid gap-3">
                      {budgets.map((b) => (
                        <motion.button
                          key={b}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setBudget(b)}
                          className="flex items-center gap-3 rounded-2xl border border-border p-4 text-left text-sm font-medium transition-all hover:border-accent/30 hover:bg-muted/50"
                        >
                          <Wallet className="h-4 w-4 text-accent" />
                          {b}
                        </motion.button>
                      ))}
                    </div>
                    <button onClick={() => setStep(2)} className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">← Back</button>
                  </motion.div>
                )}

                {step === 3 && budget && (
                  <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                    <div className="flex items-center gap-2 text-accent">
                      <Sparkles className="h-5 w-5" />
                      <span className="text-sm font-semibold">AI-Powered Results</span>
                    </div>
                    <h2 className="mt-2 font-serif text-2xl font-bold">Recommended Treatments For You</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{condition} • {country} • {budget}</p>
                    <div className="mt-6 space-y-4">
                      {getResults().map((t, i) => (
                        <motion.div
                          key={t.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Link
                            to={`/treatments/${t.slug}`}
                            onClick={() => { onClose(); reset(); }}
                            className="flex gap-4 rounded-2xl border border-border p-4 transition-all hover:border-accent/30 hover:shadow-md group"
                          >
                            <img src={t.image} alt={t.name} className="h-20 w-20 rounded-xl object-cover" loading="lazy" />
                            <div className="flex-1">
                              <h3 className="font-semibold group-hover:text-primary transition-colors">{t.name}</h3>
                              <p className="text-sm text-muted-foreground">{t.provider}</p>
                              <div className="mt-2 flex items-center gap-3 text-sm">
                                <span className="font-semibold text-primary">From {t.currency}{t.price.toLocaleString()}</span>
                                <span className="text-muted-foreground">⭐ {t.rating}</span>
                              </div>
                            </div>
                            <ArrowRight className="h-5 w-5 self-center text-muted-foreground group-hover:text-primary transition-colors" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-6 flex gap-3">
                      <Button variant="outline" onClick={() => { reset(); }} className="flex-1">Start Over</Button>
                      <Button asChild className="flex-1 bg-primary hover:bg-primary/90" onClick={() => { onClose(); reset(); }}>
                        <Link to="/treatments">View All Treatments</Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
