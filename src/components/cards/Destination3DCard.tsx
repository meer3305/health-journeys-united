import { Link } from "react-router-dom";
import { MapPin, Stethoscope, Star, ArrowRight, X } from "lucide-react";
import type { Destination } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

interface Destination3DCardProps {
  destination: Destination;
}

export function Destination3DCard({ destination }: Destination3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isExpanded) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotation({
      x: ((e.clientY - rect.top - centerY) / centerY) * -10,
      y: ((e.clientX - rect.left - centerX) / centerX) * 10,
    });
  };

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <div
        className={isExpanded ? "fixed inset-0 z-50 flex items-center justify-center p-4" : "block"}
        onClick={(e) => { if (isExpanded && e.target === e.currentTarget) setIsExpanded(false); }}
      >
        <div style={{ perspective: 1200 }}>
          <motion.div
            ref={cardRef}
            layout
            onMouseMove={handleMouseMove}
            onMouseEnter={() => !isExpanded && setIsHovering(true)}
            onMouseLeave={() => { setIsHovering(false); setRotation({ x: 0, y: 0 }); }}
            animate={{
              rotateX: isExpanded ? 0 : rotation.x,
              rotateY: isExpanded ? 0 : rotation.y,
              scale: isExpanded ? 1 : isHovering ? 1.02 : 1,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            onClick={() => !isExpanded && setIsExpanded(true)}
            className={`relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer select-none border border-white/20
              ${isExpanded ? "w-[90vw] max-w-lg" : "h-[300px] w-full"}`}
            style={{
              transformStyle: "preserve-3d",
              background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* BG image */}
            <div className={isExpanded ? "h-56" : "h-full"}>
              <img
                src={destination.image}
                alt={destination.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
            </div>

            {/* Holographic shimmer */}
            {isHovering && !isExpanded && (
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  background: `radial-gradient(circle at ${50 + rotation.y * 3}% ${50 + rotation.x * 3}%, rgba(255,255,255,0.6) 0%, transparent 50%)`,
                }}
              />
            )}

            {/* Close button */}
            {isExpanded && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 hover:bg-black/70 transition-colors"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}

            {/* Collapsed content */}
            <div className={`${isExpanded ? "relative" : "absolute bottom-0"} left-0 right-0 flex h-auto flex-col justify-end p-5`} style={{ transform: isExpanded ? undefined : "translateZ(20px)" }}>
              {/* Flag & specialties row */}
              {!isExpanded && (
                <div className="absolute top-[-120px] left-0 right-0 px-5 flex items-start justify-between">
                  <span className="text-4xl drop-shadow-lg">{destination.flag}</span>
                  {destination.topSpecialties && (
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {destination.topSpecialties.slice(0, 2).map((s) => (
                        <span key={s} className="rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-white/90 border border-white/10">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <h3 className={`font-serif font-bold drop-shadow-lg ${isExpanded ? "text-xl text-foreground" : "text-2xl text-white"}`}>
                {isExpanded && <span className="mr-2 text-2xl">{destination.flag}</span>}
                {destination.name}
              </h3>

              {!isExpanded && (
                <>
                  <p className="mt-1 line-clamp-2 text-sm text-white/70">{destination.description}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-white/80">
                    <span className="flex items-center gap-1"><Stethoscope className="h-3.5 w-3.5" /> {destination.providerCount} providers</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {destination.treatmentCount} treatments</span>
                  </div>
                </>
              )}
            </div>

            {/* Expanded details */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 }}
                  className="px-5 pb-5"
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">{destination.description}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/8 backdrop-blur-md p-3 border border-white/10">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Stethoscope className="h-3 w-3" />Providers</div>
                      <p className="mt-1 text-lg font-bold text-primary">{destination.providerCount}</p>
                    </div>
                    <div className="rounded-xl bg-white/8 backdrop-blur-md p-3 border border-white/10">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />Treatments</div>
                      <p className="mt-1 text-lg font-bold text-primary">{destination.treatmentCount}</p>
                    </div>
                  </div>

                  {destination.topSpecialties && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Top Specialties</p>
                      <div className="flex flex-wrap gap-1.5">
                        {destination.topSpecialties.map((s) => (
                          <span key={s} className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary border border-primary/20">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {destination.stats && destination.stats.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {destination.stats.slice(0, 3).map((stat) => (
                        <div key={stat.label} className="rounded-xl bg-white/8 backdrop-blur-md p-3 border border-white/10 text-center">
                          <p className="text-sm font-bold text-primary">{stat.value}</p>
                          <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {destination.whyChoose && destination.whyChoose.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Why Choose</p>
                      <ul className="space-y-1.5">
                        {destination.whyChoose.slice(0, 3).map((reason) => (
                          <li key={reason} className="flex items-start gap-2 text-xs text-foreground">
                            <Star className="mt-0.5 h-3 w-3 shrink-0 text-accent fill-current" />{reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link
                    to={`/destinations/${destination.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary/80 backdrop-blur-md px-4 py-3 text-sm font-semibold text-primary-foreground border border-white/10 transition-all hover:bg-primary"
                  >
                    Explore {destination.name} <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}
