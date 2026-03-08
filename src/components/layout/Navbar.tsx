import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency, currencies } from "@/contexts/CurrencyContext";

const navLinks = [
  { label: "Treatments", href: "/treatments" },
  { label: "Wellness", href: "/wellness" },
  { label: "Destinations", href: "/destinations/turkey" },
  { label: "Partners", href: "/partners/apply" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-background/98 shadow-sm backdrop-blur-xl" : "bg-background/95 backdrop-blur"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md">
            <span className="font-serif text-lg font-bold text-primary-foreground">M</span>
          </div>
          <span className="font-serif text-xl font-bold text-foreground tracking-tight">MedXTrawell</span>
        </Link>

        {/* Desktop nav — centered */}
        <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:bg-muted ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop right side */}
        <div className="hidden items-center gap-2 md:flex shrink-0">
          {/* Currency */}
          <div className="relative">
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
            >
              <Globe className="h-3.5 w-3.5" />
              {currency.code}
              <ChevronDown className={`h-3 w-3 transition-transform ${currencyOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {currencyOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setCurrencyOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-xl"
                  >
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-all ${
                          currency.code === c.code ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <span className="text-base">{c.symbol}</span>
                        <span>{c.code}</span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button size="sm" className="gap-1.5 bg-accent text-accent-foreground shadow-md hover:bg-accent/90 hover:shadow-lg transition-all" asChild>
            <Link to="/treatments"><Sparkles className="h-3.5 w-3.5" /> Find Treatment</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="ml-auto md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu — sliding overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-16 bottom-0 z-50 w-72 overflow-y-auto bg-card shadow-2xl md:hidden"
            >
              <div className="flex flex-col p-5">
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const isActive = location.pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                          isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                        {isActive && <div className="ml-auto h-2 w-2 rounded-full bg-accent" />}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile currency */}
                <div className="mt-6 border-t border-border pt-5">
                  <p className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Currency</p>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => setCurrency(c)}
                        className={`rounded-lg px-2 py-2 text-xs font-medium transition-all ${
                          currency.code === c.code ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {c.symbol} {c.code}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                  </Button>
                  <Button className="w-full bg-accent text-accent-foreground gap-1.5" asChild>
                    <Link to="/treatments" onClick={() => setMobileOpen(false)}>
                      <Sparkles className="h-3.5 w-3.5" /> Find Treatment
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
