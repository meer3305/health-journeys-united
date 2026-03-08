import { Link } from "react-router-dom";
import type { Destination } from "@/data/mockData";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="group relative block h-72 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="text-2xl drop-shadow">{destination.flag}</span>
        <h3 className="mt-1 font-serif text-xl font-bold text-white drop-shadow">{destination.name}</h3>
        <p className="mt-1 text-sm text-white/75">
          {destination.providerCount} providers · {destination.treatmentCount} treatments
        </p>
        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          Explore <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}
