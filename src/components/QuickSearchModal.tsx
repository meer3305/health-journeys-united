import { useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Banknote, Star, BadgeCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { treatments } from "@/data/mockData";
import { useCurrency } from "@/contexts/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function QuickSearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [budget, setBudget] = useState("");
  const { formatPrice } = useCurrency();

  const filtered = treatments.filter((t) => {
    const matchQuery = !query || t.name.toLowerCase().includes(query.toLowerCase()) || t.specialty.toLowerCase().includes(query.toLowerCase());
    const matchCountry = !country || t.country === country;
    const matchBudget = !budget ||
      (budget === "low" && t.price < 2000) ||
      (budget === "mid" && t.price >= 2000 && t.price < 5000) ||
      (budget === "high" && t.price >= 5000 && t.price < 10000) ||
      (budget === "premium" && t.price >= 10000);
    return matchQuery && matchCountry && matchBudget;
  });

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => { setQuery(""); setCountry(""); setBudget(""); }, 300);
  }, [onClose]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-border bg-background gap-0">
        {/* Search header */}
        <div className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground">Quick Treatment Search</h2>
              <p className="text-sm text-muted-foreground">Find the right treatment instantly</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Treatment or condition..."
                className="w-full rounded-xl border border-border bg-muted/30 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                autoFocus
              />
            </div>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 [&>option]:text-foreground [&>option]:bg-background"
            >
              <option value="">All countries</option>
              <option value="Turkey">Turkey</option>
              <option value="Thailand">Thailand</option>
              <option value="India">India</option>
              <option value="Greece">Greece</option>
              <option value="UAE">UAE</option>
            </select>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 [&>option]:text-foreground [&>option]:bg-background"
            >
              <option value="">Any budget</option>
              <option value="low">Under £2,000</option>
              <option value="mid">£2,000 – £5,000</option>
              <option value="high">£5,000 – £10,000</option>
              <option value="premium">£10,000+</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {filtered.length} treatment{filtered.length !== 1 ? "s" : ""} found
          </p>
          <AnimatePresence mode="popLayout">
            <div className="space-y-2">
              {filtered.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    to={`/treatments/${t.slug}`}
                    onClick={handleClose}
                    className="flex gap-4 rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md hover:border-primary/20 group"
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-16 w-16 rounded-lg object-cover shrink-0 transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-card-foreground truncate">{t.name}</h4>
                        <span className="shrink-0 font-serif text-sm font-bold text-primary">{formatPrice(t.price)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t.provider}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{t.city}, {t.country}</span>
                        <span className="flex items-center gap-1 text-accent"><Star className="h-3 w-3 fill-current" />{t.rating}</span>
                        {t.accredited && <BadgeCheck className="h-3 w-3 text-primary" />}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground self-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <Search className="mx-auto h-10 w-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm text-muted-foreground">No treatments match your search</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
