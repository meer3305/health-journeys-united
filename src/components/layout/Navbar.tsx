import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
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

  // 3D tilt for navbar
  const mouseX = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-600, 600], [-1.5, 1.5]);
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleNavMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
  };

  return (
    <motion.nav
      onMouseMove={handleNavMouseMove}
      onMouseLeave={() => mouseX.set(0)}
      style={{
        rotateY: springRotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "shadow-lg border-b border-white/10"
          : ""
      }`}
    >
      {/* Glass background */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          scrolled ? "opacity-100" : "opacity-90"
        }`}
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.7) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 100%)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        }}
      />

      {/* Subtle shimmer line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo with 3D pop */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <motion.div
            whileHover={{ scale: 1.1, rotateY: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl shadow-lg border border-white/30"
            style={{
              background: "linear-gradient(135deg, hsl(174 65% 28%) 0%, hsl(174 65% 38%) 100%)",
              transformStyle: "preserve-3d",
            }}
          >
            <span className="font-serif text-lg font-bold text-primary-foreground">M</span>
          </motion.div>
          <span className="font-serif text-xl font-bold text-foreground tracking-tight">MedXTrawell</span>
        </Link>

        {/* Desktop nav — centered with glass pills */}
        <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.href);
            return (
              <Link key={link.href} to={link.href} className="relative">
                <motion.div
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{
                    background: isActive ? "rgba(13, 110, 110, 0.08)" : "transparent",
                    backdropFilter: isActive ? "blur(8px)" : "none",
                  }}
                >
                  {link.label}
                </motion.div>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-3 right-3 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, hsl(174 65% 28%), hsl(38 55% 52%))" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:text-foreground border border-transparent hover:border-white/30"
              style={{ backdropFilter: "blur(8px)" }}
            >
              <Globe className="h-3.5 w-3.5" />
              {currency.code}
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${currencyOpen ? "rotate-180" : ""}`} />
            </motion.button>
            <AnimatePresence>
              {currencyOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setCurrencyOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl p-1 shadow-2xl border border-white/20"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 100%)",
                      backdropFilter: "blur(24px) saturate(1.5)",
                      WebkitBackdropFilter: "blur(24px) saturate(1.5)",
                    }}
                  >
                    {currencies.map((c) => (
                      <motion.button
                        key={c.code}
                        whileHover={{ x: 4, backgroundColor: "rgba(13, 110, 110, 0.08)" }}
                        onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                        className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-all ${
                          currency.code === c.code ? "text-primary font-medium" : "text-muted-foreground"
                        }`}
                      >
                        <span className="text-base">{c.symbol}</span>
                        <span>{c.code}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
          <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="sm"
              className="gap-1.5 shadow-lg hover:shadow-xl transition-all border border-white/20"
              style={{
                background: "linear-gradient(135deg, hsl(38 55% 52%) 0%, hsl(38 55% 42%) 100%)",
                color: "white",
              }}
              asChild
            >
              <Link to="/treatments"><Sparkles className="h-3.5 w-3.5" /> Find Treatment</Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9, rotate: 90 }}
          className="ml-auto md:hidden p-2 rounded-xl hover:bg-white/20 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
      </div>

      {/* Mobile menu — glass overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="fixed right-0 top-16 bottom-0 z-50 w-72 overflow-y-auto shadow-2xl md:hidden border-l border-white/20"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.88) 100%)",
                backdropFilter: "blur(32px) saturate(1.8)",
                WebkitBackdropFilter: "blur(32px) saturate(1.8)",
              }}
            >
              <div className="flex flex-col p-5">
                <div className="space-y-1">
                  {navLinks.map((link, i) => {
                    const isActive = location.pathname.startsWith(link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          to={link.href}
                          className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                            isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
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

                <div className="mt-6 border-t border-border/30 pt-5">
                  <p className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Currency</p>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {currencies.map((c) => (
                      <motion.button
                        key={c.code}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrency(c)}
                        className={`rounded-xl px-2 py-2 text-xs font-medium transition-all border ${
                          currency.code === c.code
                            ? "bg-primary text-primary-foreground shadow-sm border-primary/30"
                            : "bg-white/50 text-muted-foreground hover:bg-white/80 border-transparent"
                        }`}
                      >
                        {c.symbol} {c.code}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button variant="outline" className="w-full rounded-xl border-border/30" asChild>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                  </Button>
                  <Button
                    className="w-full gap-1.5 rounded-xl border border-white/20"
                    style={{
                      background: "linear-gradient(135deg, hsl(38 55% 52%) 0%, hsl(38 55% 42%) 100%)",
                      color: "white",
                    }}
                    asChild
                  >
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
    </motion.nav>
  );
}
