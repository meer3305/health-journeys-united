import { Link } from "react-router-dom";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import type { Treatment } from "@/data/mockData";
import { useCurrency } from "@/contexts/CurrencyContext";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface Treatment3DCardProps {
  treatment: Treatment;
}

export function Treatment3DCard({ treatment }: Treatment3DCardProps) {
  const { formatPrice } = useCurrency();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotation({
      x: ((e.clientY - rect.top - centerY) / centerY) * -8,
      y: ((e.clientX - rect.left - centerX) / centerX) * 8,
    });
  };

  return (
    <Link to={`/treatments/${treatment.slug}`} className="block">
      <div style={{ perspective: 1200 }}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => { setIsHovering(false); setRotation({ x: 0, y: 0 }); }}
          animate={{
            rotateX: rotation.x,
            rotateY: rotation.y,
            scale: isHovering ? 1.02 : 1,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative h-[300px] w-full overflow-hidden rounded-2xl glass-card shadow-xl cursor-pointer select-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* BG */}
          <img src={treatment.image} alt={treatment.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

          {isHovering && (
            <div className="pointer-events-none absolute inset-0 opacity-20"
              style={{ background: `radial-gradient(circle at ${50 + rotation.y * 3}% ${50 + rotation.x * 3}%, rgba(255,255,255,0.5) 0%, transparent 55%)` }} />
          )}

          {/* Badges */}
          <div className="absolute left-3 top-3 flex gap-2" style={{ transform: "translateZ(25px)" }}>
            {treatment.accredited && (
              <span className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-primary shadow-sm">
                <BadgeCheck className="h-3 w-3" /> Accredited
              </span>
            )}
          </div>

          {/* Price badge */}
          <div className="absolute right-3 top-3 rounded-full bg-primary/90 backdrop-blur-sm px-3 py-1.5 text-sm font-bold text-primary-foreground shadow-lg"
            style={{ transform: "translateZ(30px)" }}>
            {formatPrice(treatment.price)}
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5" style={{ transform: "translateZ(20px)" }}>
            <h3 className="font-serif text-lg font-bold text-white drop-shadow-lg">{treatment.name}</h3>
            <p className="mt-1 text-sm text-white/70">{treatment.provider}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-white/80">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{treatment.city}, {treatment.country}</span>
              <span className="flex items-center gap-1 font-semibold text-accent">
                <Star className="h-3 w-3 fill-current" />{treatment.rating}
                <span className="text-white/50">({treatment.reviewCount})</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}
