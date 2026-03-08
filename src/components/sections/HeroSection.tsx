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
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
      )}
      {backgroundImage && overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/50 to-foreground/30" />
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/5" />
      )}
      <Container className={`relative z-10 ${compact ? "py-16" : "py-32"}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1
            className={`font-serif font-bold leading-[1.1] tracking-tight ${compact ? "text-3xl sm:text-4xl lg:text-5xl" : "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"} ${
              backgroundImage ? "text-white drop-shadow-lg" : "text-foreground"
            }`}
          >
            {title}
          </h1>
          <p
            className={`mt-6 text-lg leading-relaxed sm:text-xl lg:text-2xl ${
              backgroundImage ? "text-white/90 drop-shadow" : "text-muted-foreground"
            }`}
          >
            {subtitle}
          </p>
          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              {primaryCta && (
                <Button size="lg" className="bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 hover:shadow-xl px-8 py-6 text-base transition-all" asChild>
                  <Link to={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  size="lg"
                  variant="outline"
                  className={`px-8 py-6 text-base transition-all ${
                    backgroundImage
                      ? "border-white/40 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/60"
                      : "border-border"
                  }`}
                  asChild
                >
                  <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </motion.div>
          )}
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
