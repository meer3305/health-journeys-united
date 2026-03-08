import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency, currencies } from "@/contexts/CurrencyContext";

const navLinks = [
  { label: "Treatments", href: "/treatments" },
  { label: "Wellness Programs", href: "/wellness" },
  { label: "Destinations", href: "/destinations/turkey" },
  { label: "Partners", href: "/partners/apply" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="font-serif text-lg font-bold text-primary-foreground">M</span>
          </div>
          <span className="font-serif text-xl font-bold text-foreground">MedXTrawell</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.startsWith(link.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA + Currency */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Currency selector */}
          <div className="relative">
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {currency.symbol} {currency.code}
              <ChevronDown className="h-3 w-3" />
            </button>
            {currencyOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setCurrencyOpen(false)} />
                <div className="absolute right-0 top-full z-50 mt-1 w-36 rounded-lg border border-border bg-card py-1 shadow-lg">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-muted ${
                        currency.code === c.code ? "bg-primary/5 text-primary font-medium" : "text-muted-foreground"
                      }`}
                    >
                      <span className="w-6">{c.symbol}</span> {c.code}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/treatments">Find My Treatment</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile currency */}
              <div className="border-t border-border pt-2 mt-2">
                <p className="px-3 py-1 text-xs font-medium text-muted-foreground">Currency</p>
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        currency.code === c.code ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {c.symbol} {c.code}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-3">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to="/signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                </Button>
                <Button size="sm" className="flex-1 bg-accent text-accent-foreground" asChild>
                  <Link to="/treatments" onClick={() => setMobileOpen(false)}>Find Treatment</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
