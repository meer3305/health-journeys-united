import { Link } from "react-router-dom";
import { MapPin, Stethoscope, Star, ArrowRight } from "lucide-react";
import type { Destination } from "@/data/mockData";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface Destination3DCardProps {
  destination: Destination;
}

export function Destination3DCard({ destination }: Destination3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotation({
      x: ((y - centerY) / centerY) * -10,
      y: ((x - centerX) / centerX) * 10,
    });
  };

  return (
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
        className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-border/30 shadow-xl cursor-pointer select-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* BG image */}
        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 backdrop-blur-[1px]" />

        {/* Holographic shimmer */}
        {isHovering && (
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at ${50 + rotation.y * 3}% ${50 + rotation.x * 3}%, rgba(255,255,255,0.5) 0%, transparent 55%)`,
            }}
          />
        )}

        {/* Content */}
        <div className="relative flex h-full flex-col justify-between p-6" style={{ transform: "translateZ(20px)" }}>
          {/* Top */}
          <div className="flex items-start justify-between">
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

          {/* Bottom */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-white drop-shadow-lg">{destination.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-white/70">{destination.description}</p>

            <div className="mt-3 flex items-center gap-4 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <Stethoscope className="h-3.5 w-3.5" /> {destination.providerCount} providers
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {destination.treatmentCount} treatments
              </span>
            </div>

            {destination.stats && destination.stats.length > 0 && (
              <div className="mt-3 flex gap-3">
                {destination.stats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-white/10 backdrop-blur-md px-3 py-1.5 border border-white/10">
                    <p className="text-sm font-bold text-white">{stat.value}</p>
                    <p className="text-[10px] text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            <Link
              to={`/destinations/${destination.slug}`}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-4 py-2 text-xs font-semibold text-white border border-white/20 transition-all hover:bg-white/25"
            >
              Explore <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
