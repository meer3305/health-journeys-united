import { useState, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Carousel3DProps {
  children: ReactNode[];
  visibleCount?: number;
}

export function Carousel3D({ children, visibleCount = 3 }: Carousel3DProps) {
  const [current, setCurrent] = useState(0);
  const total = children.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Build visible indices centered around current
  const getVisibleIndices = () => {
    const indices: number[] = [];
    const half = Math.floor(visibleCount / 2);
    for (let i = -half; i <= half; i++) {
      indices.push((current + i + total) % total);
    }
    return indices;
  };

  const visible = getVisibleIndices();

  return (
    <div className="relative flex flex-col items-center">
      {/* Carousel track */}
      <div className="relative flex w-full items-center justify-center" style={{ minHeight: 340 }}>
        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-0 z-20 flex h-12 w-12 items-center justify-center rounded-full glass-card text-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl md:left-4"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Cards */}
        <div className="relative flex items-center justify-center" style={{ width: "100%", maxWidth: 900, height: 320 }}>
          <AnimatePresence mode="popLayout">
            {visible.map((idx, pos) => {
              const offset = pos - Math.floor(visibleCount / 2);
              const isCenter = offset === 0;
              const absOffset = Math.abs(offset);

              return (
                <motion.div
                  key={`card-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8, x: offset * 100 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.6 - absOffset * 0.15,
                    scale: isCenter ? 1 : 0.85 - absOffset * 0.05,
                    x: offset * (isCenter ? 0 : 260 * (offset > 0 ? 1 : -1)),
                    zIndex: isCenter ? 10 : 5 - absOffset,
                    rotateY: offset * -8,
                  }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="absolute cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: 1200,
                    width: isCenter ? 340 : 300,
                  }}
                  onClick={() => {
                    if (!isCenter) setCurrent(idx);
                  }}
                >
                  {children[idx]}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-0 z-20 flex h-12 w-12 items-center justify-center rounded-full glass-card text-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl md:right-4"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center gap-2">
        {children.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
