import { Link } from "react-router-dom";
import type { Destination } from "@/data/mockData";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="group relative block h-80 overflow-hidden rounded-2xl shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10"
      style={{ willChange: "transform, opacity" }}
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Glass info panel */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4 transition-all duration-300 group-hover:bg-white/20">
          <div className="flex items-center gap-2">
            <span className="text-2xl drop-shadow">{destination.flag}</span>
            <h3 className="font-serif text-xl font-bold text-white drop-shadow">{destination.name}</h3>
          </div>
          <div className="mt-2 flex items-center gap-1 text-sm text-white/80">
            <MapPin className="h-3.5 w-3.5" />
            {destination.providerCount} providers · {destination.treatmentCount} treatments
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
            Explore destination <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}
