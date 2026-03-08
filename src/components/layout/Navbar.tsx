import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, ChevronDown, Globe, Sparkles, Search,
  Stethoscope, Smile, Baby, Scissors, HeartPulse, Microscope,
  TreePalm, Compass, Map, Users, Handshake, BookOpen,
  MessageSquare, Info, UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency, currencies } from "@/contexts/CurrencyContext";
import { QuickSearchModal } from "@/components/QuickSearchModal";

// ─── Mega Menu Data ──────────────────────────────────────────
const treatmentsMega = [
  { heading: "Orthopaedic", icon: Stethoscope, items: [
    { label: "Knee Replacement", href: "/treatments/knee-replacement-istanbul" },
    { label: "Hip Replacement", href: "/treatments/hip-replacement-mumbai" },
  ]},
  { heading: "Dental", icon: Smile, items: [
    { label: "Dental Implants", href: "/treatments/dental-implants-ankara" },
    { label: "Veneers", href: "/treatments" },
  ]},
  { heading: "Fertility", icon: Baby, items: [
    { label: "IVF Treatment", href: "/treatments/ivf-athens" },
    { label: "Egg Freezing", href: "/treatments" },
  ]},
  { heading: "Cosmetic", icon: Scissors, items: [
    { label: "Hair Transplant", href: "/treatments/hair-transplant-istanbul" },
    { label: "Rhinoplasty", href: "/treatments/rhinoplasty-istanbul" },
  ]},
  { heading: "Cardiology", icon: HeartPulse, items: [
    { label: "Heart Surgery", href: "/treatments/cardiac-bypass-delhi" },
  ]},
  { heading: "Oncology", icon: Microscope, items: [
    { label: "Cancer Treatment", href: "/treatments/oncology-consultation-bangkok" },
  ]},
];

const wellnessMega = [
  { name: "Stress & Burnout Retreat", location: "Ubud, Bali", duration: "7 days", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop", href: "/wellness" },
  { name: "Longevity Programme", location: "Zurich, Switzerland", duration: "5 days", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop", href: "/wellness" },
  { name: "Mental Wellness Retreat", location: "Algarve, Portugal", duration: "10 days", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop", href: "/wellness" },
  { name: "Weight Management", location: "Koh Samui, Thailand", duration: "14 days", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", href: "/wellness" },
];

const destinationsMega = [
  { name: "Turkey", flag: "🇹🇷", savings: "Up to 70%", treatments: "Hair, Dental, Ortho", image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=300&h=200&fit=crop", href: "/destinations/turkey" },
  { name: "Thailand", flag: "🇹🇭", savings: "Up to 65%", treatments: "Cosmetic, Wellness", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=300&h=200&fit=crop", href: "/destinations/turkey" },
  { name: "India", flag: "🇮🇳", savings: "Up to 80%", treatments: "Cardiac, Ortho", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&h=200&fit=crop", href: "/destinations/turkey" },
  { name: "UAE", flag: "🇦🇪", savings: "Up to 40%", treatments: "Premium, Wellness", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&h=200&fit=crop", href: "/destinations/turkey" },
  { name: "Germany", flag: "🇩🇪", savings: "Up to 30%", treatments: "Oncology, Cardiac", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=300&h=200&fit=crop", href: "/destinations/turkey" },
];

// ─── Nav Links ───────────────────────────────────────────────
const navLinks = [
  { label: "Treatments", href: "/treatments", mega: "treatments" },
  { label: "Wellness", href: "/wellness", mega: "wellness" },
  { label: "Destinations", href: "/destinations/turkey", mega: "destinations" },
  { label: "Providers", href: "/providers/istanbul-health-centre" },
  { label: "Partners", href: "/partners/apply" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
];

const mobileLinks = [
  { label: "Treatments", href: "/treatments", icon: Stethoscope },
  { label: "Wellness Programs", href: "/wellness", icon: TreePalm },
  { label: "Destinations", href: "/destinations/turkey", icon: Compass },
  { label: "Providers", href: "/providers/istanbul-health-centre", icon: Map },
  { label: "Partners", href: "/partners/apply", icon: Handshake },
  { label: "Travel Guides", href: "/guides", icon: BookOpen },
  { label: "Patient Stories", href: "/#stories", icon: MessageSquare },
  { label: "About", href: "/about", icon: Info },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();
  const navRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ left: 0, width: 0, opacity: 0 });
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
  }, [location.pathname]);

  // Spotlight tracking
  const updateSpotlight = useCallback((el: HTMLElement | null) => {
    if (!el || !navRef.current) {
      setSpotlight((p) => ({ ...p, opacity: 0 }));
      return;
    }
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = el.getBoundingClientRect();
    setSpotlight({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      opacity: 1,
    });
  }, []);

  const handleLinkHover = useCallback((e: React.MouseEvent, mega?: string) => {
    updateSpotlight(e.currentTarget as HTMLElement);
    clearTimeout(megaTimeout.current);
    if (mega) setActiveMega(mega);
    else setActiveMega(null);
  }, [updateSpotlight]);

  const handleNavLeave = useCallback(() => {
    setSpotlight((p) => ({ ...p, opacity: 0 }));
    megaTimeout.current = setTimeout(() => setActiveMega(null), 200);
  }, []);

  const handleMegaEnter = useCallback(() => {
    clearTimeout(megaTimeout.current);
  }, []);

  const handleMegaLeave = useCallback(() => {
    setActiveMega(null);
    setSpotlight((p) => ({ ...p, opacity: 0 }));
  }, []);

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <>
      <QuickSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <nav className="sticky top-0 z-50 px-3 pt-2">
        <div
          className={`relative mx-auto max-w-7xl transition-all duration-300 ${
            scrolled ? "shadow-lg" : ""
          }`}
          style={{
            background: "rgba(255,255,255,0.78)",
            backdropFilter: "blur(16px) saturate(1.5)",
            WebkitBackdropFilter: "blur(16px) saturate(1.5)",
            borderRadius: "16px",
            boxShadow: scrolled
              ? "0 10px 30px rgba(0,0,0,0.08)"
              : "0 4px 20px rgba(0,0,0,0.04)",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          {/* Neon accent line */}
          <div
            className="absolute bottom-0 left-6 right-6 h-px rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, hsl(187 92% 53% / 0.3), transparent)" }}
          />

          <div className="flex h-16 items-center px-5">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl shadow-md border border-white/30 bg-primary"
              >
                <span className="font-serif text-lg font-bold text-primary-foreground">M</span>
              </motion.div>
              <span className="font-serif text-xl font-bold text-foreground tracking-tight hidden sm:block">
                MedXTrawell
              </span>
            </Link>

            {/* Desktop nav center */}
            <div
              ref={navRef}
              className="hidden flex-1 items-center justify-center gap-0.5 lg:flex relative"
              onMouseLeave={handleNavLeave}
            >
              {/* Spotlight pill */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 h-9 rounded-full pointer-events-none"
                animate={{
                  left: spotlight.left,
                  width: spotlight.width,
                  opacity: spotlight.opacity,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  background: "hsl(var(--primary) / 0.08)",
                  boxShadow: spotlight.opacity ? "0 0 12px hsl(187 92% 53% / 0.15)" : "none",
                }}
              />

              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onMouseEnter={(e) => handleLinkHover(e, link.mega)}
                    className={`relative z-10 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                      active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Currency inline */}
              <div className="relative">
                <button
                  onClick={() => setCurrencyOpen(!currencyOpen)}
                  onMouseEnter={(e) => handleLinkHover(e)}
                  className="relative z-10 flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl p-1 shadow-xl border border-border bg-background"
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
            </div>

            {/* Desktop right */}
            <div className="hidden items-center gap-2 lg:flex shrink-0">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-full text-[13px]" asChild>
                <Link to="/signup"><UserPlus className="h-3.5 w-3.5 mr-1.5" />Sign Up</Link>
              </Button>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    "0 0 12px rgba(34,211,238,0.2)",
                    "0 0 24px rgba(34,211,238,0.35)",
                    "0 0 12px rgba(34,211,238,0.2)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="rounded-full"
              >
                <Button
                  size="sm"
                  className="gap-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-[13px]"
                  asChild
                >
                  <Link to="/treatments"><Sparkles className="h-3.5 w-3.5" /> Find Treatment</Link>
                </Button>
              </motion.div>
            </div>

            {/* Mobile toggle */}
            <button
              className="ml-auto lg:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ─── Mega Menus ───────────────────────────────────── */}
        <AnimatePresence>
          {activeMega && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute left-3 right-3 top-[72px] z-40"
              onMouseEnter={handleMegaEnter}
              onMouseLeave={handleMegaLeave}
            >
              <div
                className="mx-auto max-w-7xl overflow-hidden p-6"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(20px) saturate(1.5)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.5)",
                  borderRadius: "16px",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                {/* Treatments Mega */}
                {activeMega === "treatments" && (
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-5">Browse Treatments</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
                      {treatmentsMega.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <div key={cat.heading}>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                                <Icon className="h-3.5 w-3.5 text-primary" />
                              </div>
                              <span className="text-xs font-bold uppercase tracking-wider text-foreground">{cat.heading}</span>
                            </div>
                            <ul className="space-y-1.5">
                              {cat.items.map((item) => (
                                <li key={item.label}>
                                  <Link
                                    to={item.href}
                                    className="block rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-all hover:bg-primary/5 hover:text-primary hover:translate-x-0.5"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-5 pt-4 border-t border-border flex justify-end">
                      <Link to="/treatments" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                        View all treatments <ChevronDown className="h-3 w-3 -rotate-90" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Wellness Mega */}
                {activeMega === "wellness" && (
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-5">Wellness Programs</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {wellnessMega.map((p) => (
                        <Link
                          key={p.name}
                          to={p.href}
                          className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                        >
                          <div className="relative h-32 overflow-hidden">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-3.5">
                            <h4 className="text-sm font-semibold text-card-foreground">{p.name}</h4>
                            <p className="text-xs text-muted-foreground mt-0.5">{p.location} · {p.duration}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Destinations Mega */}
                {activeMega === "destinations" && (
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-5">Explore Destinations</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                      {destinationsMega.map((d) => (
                        <Link
                          key={d.name}
                          to={d.href}
                          className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                          <div className="relative h-28 overflow-hidden">
                            <img
                              src={d.image}
                              alt={d.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute top-2 right-2 text-lg">{d.flag}</div>
                          </div>
                          <div className="p-3">
                            <h4 className="text-sm font-semibold text-card-foreground">{d.name}</h4>
                            <p className="text-[11px] text-primary font-semibold mt-0.5">{d.savings} savings</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{d.treatments}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Mobile Menu ──────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 top-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 350 }}
                className="fixed right-0 top-0 bottom-0 z-50 w-80 overflow-y-auto shadow-2xl lg:hidden bg-background"
              >
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <span className="font-serif text-lg font-bold text-foreground">Menu</span>
                  <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-muted transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-col p-5">
                  {/* Primary CTA */}
                  <Button className="w-full gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground mb-4" size="lg" asChild>
                    <Link to="/treatments" onClick={() => setMobileOpen(false)}>
                      <Sparkles className="h-4 w-4" /> Find My Treatment
                    </Link>
                  </Button>

                  {/* Search */}
                  <button
                    onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors mb-2"
                  >
                    <Search className="h-4 w-4" />
                    Search treatments...
                  </button>

                  <div className="space-y-0.5">
                    {mobileLinks.map((link, i) => {
                      const active = isActive(link.href);
                      const Icon = link.icon;
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <Link
                            to={link.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                              active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            <Icon className="h-4 w-4" />
                            {link.label}
                            {active && <div className="ml-auto h-2 w-2 rounded-full bg-accent" />}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-5 border-t border-border pt-5">
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

                  <div className="mt-5 space-y-2">
                    <Button variant="outline" className="w-full rounded-xl gap-2" asChild>
                      <Link to="/signup" onClick={() => setMobileOpen(false)}>
                        <UserPlus className="h-4 w-4" /> Sign Up
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
