import { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: ReactNode;
  overlay?: boolean;
  compact?: boolean;
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  primaryCta,
  secondaryCta,
  children,
  overlay = true,
  compact = false,
}: HeroSectionProps) {
  return (
    <section
      className={`relative flex items-center overflow-hidden ${compact ? "min-h-[40vh]" : "min-h-[92vh]"}`}
    >
      {backgroundImage && (
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={backgroundImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
      )}
      {backgroundImage && overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />
      )}
      {!backgroundImage && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/5" />
          {/* Floating glass orbs for non-image heroes */}
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full bg-accent/5 blur-3xl"
          />
        </>
      )}
      <Container className={`relative z-10 ${compact ? "py-16" : "py-32"}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`font-serif font-bold leading-[1.08] tracking-tight ${compact ? "text-3xl sm:text-4xl lg:text-5xl" : "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"} ${
              backgroundImage ? "text-white drop-shadow-xl" : "text-foreground"
            }`}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className={`mt-6 text-lg leading-relaxed sm:text-xl lg:text-2xl ${
              backgroundImage ? "text-white/90 drop-shadow" : "text-muted-foreground"
            }`}
          >
            {subtitle}
          </motion.p>
          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              {primaryCta && (
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="px-8 py-6 text-base shadow-xl hover:shadow-2xl transition-all border border-white/20"
                    style={{
                      background: "linear-gradient(135deg, hsl(38 55% 52%) 0%, hsl(38 55% 42%) 100%)",
                      color: "white",
                    }}
                    asChild
                  >
                    <Link to={primaryCta.href}>{primaryCta.label}</Link>
                  </Button>
                </motion.div>
              )}
              {secondaryCta && (
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className={`px-8 py-6 text-base transition-all rounded-xl ${
                      backgroundImage
                        ? "border-white/30 text-white hover:bg-white/15 hover:border-white/50"
                        : "border-border"
                    }`}
                    style={{
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      background: backgroundImage ? "rgba(255,255,255,0.08)" : undefined,
                    }}
                    asChild
                  >
                    <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
