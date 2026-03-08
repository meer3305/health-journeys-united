import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency, currencies } from "@/contexts/CurrencyContext";

const primaryLinks = [
  { label: "Treatments", href: "/treatments" },
  { label: "Wellness", href: "/wellness" },
  { label: "Destinations", href: "/destinations/turkey" },
  { label: "About", href: "/about" },
];

const moreLinks = [
  { label: "Providers", href: "/providers/istanbul-health-centre" },
  { label: "Partners", href: "/partners/apply" },
  { label: "Travel Guides", href: "/guides" },
];

const allLinks = [...primaryLinks, ...moreLinks];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();
  const navRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); setMoreOpen(false); }, [location.pathname]);

  // Sliding indicator position
  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector("[data-active='true']") as HTMLElement;
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      });
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname]);

  const isLinkActive = (href: string) => location.pathname.startsWith(href);
  const isMoreActive = moreLinks.some((l) => isLinkActive(l.href));

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg border-b border-border/50" : ""
      }`}
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.92)"
          : "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px) saturate(1.6)",
        WebkitBackdropFilter: "blur(20px) saturate(1.6)",
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl shadow-md border border-white/30 bg-primary"
          >
            <span className="font-serif text-lg font-bold text-primary-foreground">M</span>
          </motion.div>
          <span className="font-serif text-xl font-bold text-foreground tracking-tight">MedXTrawell</span>
        </Link>

        {/* Desktop nav */}
        <div ref={navRef} className="hidden flex-1 items-center justify-center gap-0.5 md:flex relative">
          {/* Sliding indicator pill */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-9 rounded-full bg-primary/10"
            animate={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.opacity,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            style={{ pointerEvents: "none" }}
          />

          {primaryLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                data-active={active}
                className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              data-active={isMoreActive && !moreOpen ? "true" : undefined}
              className={`relative z-10 flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                isMoreActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              More
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl p-1.5 shadow-xl border border-border bg-background"
                  >
                    {moreLinks.map((link) => {
                      const active = isLinkActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setMoreOpen(false)}
                          className={`flex items-center rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {link.label}
                          {active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
                        </Link>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop right side */}
        <div className="hidden items-center gap-2 md:flex shrink-0">
          {/* Currency */}
          <div className="relative">
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:text-foreground border border-transparent hover:border-border"
            >
              <Globe className="h-3.5 w-3.5" />
              {currency.code}
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${currencyOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {currencyOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setCurrencyOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl p-1 shadow-xl border border-border bg-background"
                  >
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                        className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-muted ${
                          currency.code === c.code ? "text-primary font-medium" : "text-muted-foreground"
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
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-full" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="sm"
              className="gap-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-shadow hover:neon-glow"
              asChild
            >
              <Link to="/treatments"><Sparkles className="h-3.5 w-3.5" /> Find Treatment</Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <button
          className="ml-auto md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 top-16 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="fixed right-0 top-16 bottom-0 z-50 w-72 overflow-y-auto shadow-2xl md:hidden border-l border-border bg-background"
            >
              <div className="flex flex-col p-5">
                <div className="space-y-1">
                  {allLinks.map((link, i) => {
                    const isActive = isLinkActive(link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          to={link.href}
                          className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                            isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                          {isActive && <div className="ml-auto h-2 w-2 rounded-full bg-accent" />}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <p className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Currency</p>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => setCurrency(c)}
                        className={`rounded-xl px-2 py-2 text-xs font-medium transition-all border ${
                          currency.code === c.code
                            ? "bg-primary text-primary-foreground shadow-sm border-primary/30"
                            : "bg-muted text-muted-foreground hover:bg-muted/80 border-transparent"
                        }`}
                      >
                        {c.symbol} {c.code}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button variant="outline" className="w-full rounded-xl" asChild>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                  </Button>
                  <Button className="w-full gap-1.5 rounded-xl bg-primary hover:bg-primary/90" asChild>
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
