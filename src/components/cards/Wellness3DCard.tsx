import { Link } from "react-router-dom";
import { Star, MapPin, Clock, Check, ArrowRight, X } from "lucide-react";
import type { WellnessProgram } from "@/data/mockData";
import { useCurrency } from "@/contexts/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

interface Wellness3DCardProps {
  program: WellnessProgram;
}

export function Wellness3DCard({ program }: Wellness3DCardProps) {
  const { formatPrice } = useCurrency();
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
      x: ((e.clientY - rect.top - centerY) / centerY) * -8,
      y: ((e.clientX - rect.left - centerX) / centerX) * 8,
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
            <div className={isExpanded ? "h-52" : "h-full"}>
              <img src={program.image} alt={program.name} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
            </div>

            {isHovering && !isExpanded && (
              <div className="pointer-events-none absolute inset-0 opacity-25"
                style={{ background: `radial-gradient(circle at ${50 + rotation.y * 3}% ${50 + rotation.x * 3}%, rgba(255,255,255,0.6) 0%, transparent 50%)` }} />
            )}

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

            {/* Type badge */}
            <div className="absolute left-3 top-3 rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm border border-white/20"
              style={{ transform: "translateZ(25px)" }}>
              {program.type}
            </div>

            {/* Price */}
            <div className="absolute right-3 top-3 rounded-full bg-primary/80 backdrop-blur-md px-3 py-1.5 text-sm font-bold text-primary-foreground shadow-lg border border-white/10"
              style={{ transform: "translateZ(30px)" }}>
              {formatPrice(program.price)}
            </div>

            {/* Content */}
            <div className={`${isExpanded ? "relative" : "absolute bottom-0"} left-0 right-0 p-5`} style={{ transform: isExpanded ? undefined : "translateZ(20px)" }}>
              <h3 className={`font-serif font-bold drop-shadow-lg ${isExpanded ? "text-xl text-foreground" : "text-lg text-white"}`}>{program.name}</h3>
              {!isExpanded && (
                <>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/80">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{program.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{program.duration}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-accent">
                    <Star className="h-3.5 w-3.5 fill-current" />{program.rating}
                    <span className="text-white/50">({program.reviewCount})</span>
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
                  <p className="text-sm text-muted-foreground leading-relaxed">{program.description}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/8 backdrop-blur-md p-3 border border-white/10">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />Location</div>
                      <p className="mt-1 text-sm font-medium">{program.location}</p>
                    </div>
                    <div className="rounded-xl bg-white/8 backdrop-blur-md p-3 border border-white/10">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3 w-3" />Duration</div>
                      <p className="mt-1 text-sm font-medium">{program.duration}</p>
                    </div>
                    <div className="rounded-xl bg-white/8 backdrop-blur-md p-3 border border-white/10">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Star className="h-3 w-3" />Rating</div>
                      <p className="mt-1 text-sm font-medium">{program.rating} <span className="text-muted-foreground">({program.reviewCount})</span></p>
                    </div>
                    <div className="rounded-xl bg-white/8 backdrop-blur-md p-3 border border-white/10">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">Category</div>
                      <p className="mt-1 text-sm font-medium capitalize">{program.category}</p>
                    </div>
                  </div>

                  {program.included && program.included.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Included</p>
                      <div className="flex flex-wrap gap-1.5">
                        {program.included.map((item) => (
                          <span key={item} className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary border border-primary/20">
                            <Check className="h-2.5 w-2.5" />{item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    to={`/wellness/${program.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary/80 backdrop-blur-md px-4 py-3 text-sm font-semibold text-primary-foreground border border-white/10 transition-all hover:bg-primary"
                  >
                    View Full Details <ArrowRight className="h-4 w-4" />
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
