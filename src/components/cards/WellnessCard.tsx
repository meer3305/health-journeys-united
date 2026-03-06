import { Link } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";
import type { WellnessProgram } from "@/data/mockData";

interface WellnessCardProps {
  program: WellnessProgram;
}

export function WellnessCard({ program }: WellnessCardProps) {
  return (
    <Link
      to={`/wellness/${program.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={program.image}
          alt={program.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 rounded-full bg-accent/90 px-2.5 py-1 text-xs font-medium text-accent-foreground">
          {program.type}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-card-foreground">{program.name}</h3>
        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{program.location}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{program.duration}</span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-sm font-medium text-accent">
          <Star className="h-4 w-4 fill-current" />
          {program.rating}
          <span className="text-muted-foreground">({program.reviewCount})</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-muted-foreground">From</span>
          <span className="font-serif text-xl font-bold text-primary">
            {program.currency}{program.price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
