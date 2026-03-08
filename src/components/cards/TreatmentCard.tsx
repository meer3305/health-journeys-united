import { Link } from "react-router-dom";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import type { Treatment } from "@/data/mockData";
import { useCurrency } from "@/contexts/CurrencyContext";

interface TreatmentCardProps {
  treatment: Treatment;
}

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  const { formatPrice } = useCurrency();
  return (
    <Link
      to={`/treatments/${treatment.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={treatment.image}
          alt={treatment.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {treatment.accredited && (
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-xs font-medium text-accent-foreground shadow-sm backdrop-blur-sm">
            <BadgeCheck className="h-3 w-3" /> Accredited
          </div>
        )}
        <div className="absolute bottom-3 right-3 rounded-full bg-card/90 px-3 py-1 text-sm font-bold text-primary shadow-sm backdrop-blur-sm">
          {formatPrice(treatment.price)}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold leading-tight group-hover:text-primary transition-colors">{treatment.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{treatment.provider}</p>
        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{treatment.city}, {treatment.country}</span>
          <span className="flex items-center gap-1 font-medium"><Star className="h-3 w-3 fill-accent text-accent" />{treatment.rating}</span>
        </div>
      </div>
    </Link>
  );
}
