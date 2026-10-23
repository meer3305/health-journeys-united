import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, Wifi } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

interface TrawellCareCard3DProps {
  holderName?: string;
  compact?: boolean;
}

/** Mastercard-branded TrawellCare membership card with 3D tilt. */
export function TrawellCareCard3D({ holderName = "YOUR NAME HERE", compact = false }: TrawellCareCard3DProps) {
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
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-[1200px]" style={{ perspective: "1200px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale: isHovering ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`relative overflow-hidden rounded-2xl ${compact ? "p-5" : "p-7"} text-white shadow-2xl cursor-pointer select-none`}
        style={{
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, hsl(26 14% 18%), hsl(26 14% 12%), hsl(24 12% 8%))",
        }}
      >
        {/* Holographic shimmer overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-300"
          style={{
            background: isHovering
              ? `radial-gradient(circle at ${50 + rotation.y * 3}% ${50 + rotation.x * 3}%, rgba(255,255,255,0.4) 0%, transparent 60%)`
              : "none",
          }}
        />

        {/* Warm sheen */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,1) 10px, rgba(255,255,255,1) 11px)`,
          }}
        />

        {/* Top row */}
        <div className="relative flex items-start justify-between" style={{ transform: "translateZ(20px)" }}>
          <div>
            <p className={`${compact ? "text-[10px]" : "text-xs"} font-medium uppercase tracking-[0.2em] opacity-60`}>Member Care Card</p>
            <Logo className={`mt-1 ${compact ? "text-base" : "text-xl"}`} light />
          </div>
          <Shield className={`${compact ? "h-5 w-5" : "h-7 w-7"} opacity-40`} />
        </div>

        {/* Chip */}
        <div className={`${compact ? "mt-4" : "mt-6"} relative`} style={{ transform: "translateZ(30px)" }}>
          <div className="rounded-md bg-gradient-to-br from-yellow-300/80 via-yellow-400/60 to-yellow-600/70 shadow-inner"
            style={{ width: compact ? "40px" : "52px", height: compact ? "28px" : "36px" }}
          />
        </div>

        {/* Card number */}
        <div className={`${compact ? "mt-3" : "mt-5"} relative`} style={{ transform: "translateZ(25px)" }}>
          <p className={`font-mono ${compact ? "text-sm" : "text-lg"} tracking-[0.25em] opacity-90`}>
            •••• •••• •••• 4829
          </p>
        </div>

        {/* Bottom row */}
        <div className={`${compact ? "mt-3" : "mt-5"} relative flex items-end justify-between`} style={{ transform: "translateZ(20px)" }}>
          <div>
            <p className="text-[10px] uppercase tracking-wider opacity-50">Card Holder</p>
            <p className={`${compact ? "text-xs" : "text-sm"} font-medium tracking-wide`}>{holderName}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider opacity-50">Valid Thru</p>
            <p className={`${compact ? "text-xs" : "text-sm"} font-medium`}>12/28</p>
          </div>
          <Wifi className={`${compact ? "h-4 w-4" : "h-5 w-5"} rotate-90 opacity-40`} />
        </div>

        {/* Mastercard sponsorship */}
        <div className={`${compact ? "mt-3" : "mt-4"} relative flex items-center justify-end gap-2.5`} style={{ transform: "translateZ(15px)" }}>
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">Sponsored by</span>
          <div className="flex items-center -space-x-2">
            <span className="block h-5 w-5 rounded-full" style={{ background: "#EB001B" }} />
            <span className="block h-5 w-5 rounded-full opacity-90" style={{ background: "#F79E1B", mixBlendMode: "screen" }} />
          </div>
          <span className="text-xs font-semibold text-white/90">Mastercard</span>
        </div>
      </motion.div>
    </div>
  );
}
