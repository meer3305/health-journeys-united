import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CreditCard, Shield, Wifi, Nfc } from "lucide-react";

interface MedXTrawellCard3DProps {
  holderName?: string;
  compact?: boolean;
}

export function MedXTrawellCard3D({ holderName = "YOUR NAME HERE", compact = false }: MedXTrawellCard3DProps) {
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
    <div
      className="perspective-[1200px]"
      style={{ perspective: "1200px" }}
    >
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
          background: "linear-gradient(135deg, hsl(174 65% 28%), hsl(174 65% 18%), hsl(174 50% 12%))",
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

        {/* Subtle pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,1) 10px, rgba(255,255,255,1) 11px)`,
          }}
        />

        {/* Top row */}
        <div className="relative flex items-start justify-between" style={{ transform: "translateZ(20px)" }}>
          <div>
            <p className={`${compact ? "text-[10px]" : "text-xs"} font-medium uppercase tracking-[0.2em] opacity-60`}>Virtual Care Card</p>
            <h3 className={`mt-1 font-serif ${compact ? "text-lg" : "text-2xl"} font-bold tracking-wide`}>MedXTrawell</h3>
          </div>
          <div className="flex items-center gap-2">
            <Nfc className={`${compact ? "h-5 w-5" : "h-6 w-6"} opacity-50`} />
            <Shield className={`${compact ? "h-5 w-5" : "h-7 w-7"} opacity-40`} />
          </div>
        </div>

        {/* Chip */}
        <div className={`${compact ? "mt-4" : "mt-6"} relative`} style={{ transform: "translateZ(30px)" }}>
          <div className={`${compact ? "h-7 w-10" : "h-9 w-13"} rounded-md bg-gradient-to-br from-yellow-300/80 via-yellow-400/60 to-yellow-600/70 shadow-inner`}
            style={{ width: compact ? "40px" : "52px" }}
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
          <div className="flex flex-col items-center gap-0.5">
            <Wifi className={`${compact ? "h-4 w-4" : "h-5 w-5"} rotate-90 opacity-40`} />
            <CreditCard className={`${compact ? "h-4 w-4" : "h-5 w-5"} opacity-40`} />
          </div>
        </div>

        {/* BNPL badge */}
        <div className={`${compact ? "mt-2" : "mt-4"} relative flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-3 py-1.5`} style={{ transform: "translateZ(15px)" }}>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">BNPL Enabled</span>
          <span className="text-[10px] text-white/50">·</span>
          <span className="text-[10px] text-white/60">0% Interest · 3-12 months</span>
        </div>
      </motion.div>
    </div>
  );
}
