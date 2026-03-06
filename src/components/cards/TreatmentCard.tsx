import { Link } from "react-router-dom";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import type { Treatment } from "@/data/mockData";

interface TreatmentCardProps {
  treatment: Treatment;
}

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  return (
    <Link
      to={`/treatments/${treatment.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={treatment.image}
          alt={treatment.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {treatment.accredited && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-1 text-xs font-medium text-primary-foreground">
            <BadgeCheck className="h-3 w-3" /> Accredited
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-serif text-lg font-semibold text-card-foreground">{treatment.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{treatment.provider}</p>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-accent">
            <Star className="h-4 w-4 fill-current" />
            {treatment.rating}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {treatment.city}, {treatment.country}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-muted-foreground">From</span>
          <span className="font-serif text-xl font-bold text-primary">
            {treatment.currency}{treatment.price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
