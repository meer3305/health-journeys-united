import { Link } from "react-router-dom";
import type { Destination } from "@/data/mockData";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="group relative block h-64 overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5">
        <span className="text-2xl">{destination.flag}</span>
        <h3 className="mt-1 font-serif text-xl font-bold text-background">{destination.name}</h3>
        <p className="mt-1 text-sm text-background/70">
          {destination.providerCount} providers · {destination.treatmentCount} treatments
        </p>
      </div>
    </Link>
  );
}
