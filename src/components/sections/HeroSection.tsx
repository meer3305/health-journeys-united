import { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
      className={`relative flex items-center ${compact ? "min-h-[45vh]" : "min-h-[90vh]"}`}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      {backgroundImage && overlay && (
        <div className="absolute inset-0 bg-foreground/55" />
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      )}
      <Container className={`relative z-10 ${compact ? "py-16" : "py-28"}`}>
        <div className="max-w-3xl">
          <h1
            className={`font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl ${
              backgroundImage ? "text-background" : "text-foreground"
            }`}
          >
            {title}
          </h1>
          <p
            className={`mt-6 text-lg sm:text-xl lg:text-2xl ${
              backgroundImage ? "text-background/80" : "text-muted-foreground"
            }`}
          >
            {subtitle}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex flex-wrap gap-4">
              {primaryCta && (
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base" asChild>
                  <Link to={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button size="lg" variant="outline" className={`px-8 py-6 text-base ${backgroundImage ? "border-background/30 text-background hover:bg-background/10" : ""}`} asChild>
                  <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </div>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
