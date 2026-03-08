import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Heart, MapPin, Calendar, Star, BadgeCheck, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

const concerns = [
  { id: "dental", label: "Dental", icon: "🦷" },
  { id: "ortho", label: "Orthopaedics", icon: "🦴" },
  { id: "cosmetic", label: "Cosmetic Surgery", icon: "✨" },
  { id: "hair", label: "Hair Transplant", icon: "💇" },
  { id: "fertility", label: "Fertility / IVF", icon: "🍼" },
  { id: "cardiac", label: "Cardiac", icon: "❤️" },
  { id: "eye", label: "Eye / LASIK", icon: "👁️" },
  { id: "wellness", label: "Wellness & Recovery", icon: "🧘" },
];

const budgets = [
  { id: "low", label: "Under £2,000", range: "Economy" },
  { id: "mid", label: "£2,000 – £5,000", range: "Standard" },
  { id: "high", label: "£5,000 – £10,000", range: "Premium" },
  { id: "flex", label: "£10,000+", range: "Luxury" },
];

const destinations = [
  { id: "turkey", label: "Turkey", flag: "🇹🇷" },
  { id: "thailand", label: "Thailand", flag: "🇹🇭" },
  { id: "india", label: "India", flag: "🇮🇳" },
  { id: "uae", label: "UAE", flag: "🇦🇪" },
  { id: "flexible", label: "I'm flexible", flag: "🌍" },
];

const timelines = [
  { id: "asap", label: "As soon as possible", sub: "Within 2 weeks" },
  { id: "month", label: "Within a month", sub: "2–4 weeks" },
  { id: "quarter", label: "In 1–3 months", sub: "Flexible planning" },
  { id: "later", label: "Just exploring", sub: "No rush" },
];

const recommendedProviders = [
  {
    name: "Istanbul Health Centre",
    specialty: "Dental Implants & Cosmetic",
    location: "Istanbul, Turkey",
    rating: 4.9,
    reviewCount: 1240,
    price: 2800,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=120&h=120&fit=crop",
    match: 97,
    slug: "istanbul-health-centre",
  },
  {
    name: "Apollo Hospital",
    specialty: "Orthopaedics & Cardiac",
    location: "New Delhi, India",
    rating: 4.8,
    reviewCount: 980,
    price: 3200,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=120&h=120&fit=crop",
    match: 94,
    slug: "apollo-hospital-delhi",
  },
  {
    name: "Bumrungrad International",
    specialty: "Full-service Medical",
    location: "Bangkok, Thailand",
    rating: 4.7,
    reviewCount: 2100,
    price: 4100,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=120&h=120&fit=crop",
    match: 91,
    slug: "istanbul-health-centre",
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
};

export function HealthConciergeWizard({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [concern, setConcern] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const { formatPrice } = useCurrency();

  const totalSteps = 4; // 0=concern, 1=budget+destination, 2=timeline, 3=results

  const canNext = () => {
    if (step === 0) return !!concern;
    if (step === 1) return !!budget && !!destination;
    if (step === 2) return !!timeline;
    return true;
  };

  const goNext = () => { if (canNext() && step < totalSteps - 1) { setDirection(1); setStep(step + 1); } };
  const goBack = () => { if (step > 0) { setDirection(-1); setStep(step - 1); } };
  const reset = () => { setStep(0); setConcern(null); setBudget(null); setDestination(null); setTimeline(null); };

  const handleClose = () => { onClose(); setTimeout(reset, 300); };

  const stepLabels = ["Health Concern", "Budget & Destination", "Timeline", "Your Matches"];
  const progressPercent = ((step + 1) / totalSteps) * 100;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-border bg-background gap-0">
        {/* Progress bar */}
        <div className="h-1.5 bg-muted">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-r-full"
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Header */}
        <div className="px-8 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground">Personal Health Concierge</h2>
              <p className="text-sm text-muted-foreground">
                Step {step + 1} of {totalSteps} — {stepLabels[step]}
              </p>
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="relative min-h-[360px] px-8 py-6 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {step === 0 && (
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">What are you looking for?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Select your primary health concern</p>
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {concerns.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setConcern(c.id)}
                        className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${
                          concern === c.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/30 hover:bg-muted/50"
                        }`}
                      >
                        <span className="text-2xl">{c.icon}</span>
                        <span className="text-xs font-medium text-foreground">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">What's your budget?</h3>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {budgets.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setBudget(b.id)}
                          className={`rounded-xl border-2 px-4 py-3 text-left transition-all ${
                            budget === b.id
                              ? "border-primary bg-primary/5 shadow-md"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <p className="text-sm font-semibold text-foreground">{b.label}</p>
                          <p className="text-xs text-muted-foreground">{b.range}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">Preferred destination?</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {destinations.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => setDestination(d.id)}
                          className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                            destination === d.id
                              ? "border-primary bg-primary/5 shadow-md"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <span>{d.flag}</span>
                          <span className="text-foreground">{d.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">When would you like treatment?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">This helps us match you with available providers</p>
                  <div className="mt-5 space-y-3">
                    {timelines.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTimeline(t.id)}
                        className={`flex w-full items-center rounded-xl border-2 px-5 py-4 text-left transition-all ${
                          timeline === t.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <Calendar className={`h-5 w-5 mr-4 ${timeline === t.id ? "text-primary" : "text-muted-foreground"}`} />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{t.label}</p>
                          <p className="text-xs text-muted-foreground">{t.sub}</p>
                        </div>
                        {timeline === t.id && (
                          <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                            <Check className="h-3.5 w-3.5 text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <h3 className="font-serif text-lg font-semibold text-foreground">Your Recommended Providers</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">Based on your preferences, here are your best matches</p>
                  <div className="space-y-3">
                    {recommendedProviders.map((p) => (
                      <div
                        key={p.name}
                        className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
                      >
                        <img src={p.image} alt={p.name} className="h-16 w-16 rounded-xl object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-serif text-sm font-semibold text-card-foreground truncate">{p.name}</h4>
                              <p className="text-xs text-muted-foreground">{p.specialty}</p>
                            </div>
                            <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                              {p.match}% match
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.location}</span>
                            <span className="flex items-center gap-1 text-accent"><Star className="h-3 w-3 fill-current" />{p.rating}</span>
                            <span className="font-semibold text-primary">from {formatPrice(p.price)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-8 py-4 bg-muted/30">
          {step > 0 ? (
            <Button variant="ghost" size="sm" onClick={goBack} className="gap-1.5 text-muted-foreground">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          ) : (
            <div />
          )}

          {step < totalSteps - 1 ? (
            <Button
              size="sm"
              onClick={goNext}
              disabled={!canNext()}
              className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleClose}>
                Close
              </Button>
              <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link to="/treatments" onClick={handleClose}>
                  <BadgeCheck className="h-4 w-4" /> View All Treatments
                </Link>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
