import { Star, MapPin, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProviderCardProps {
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviewCount: number;
  image: string;
  accredited?: boolean;
}

export function ProviderCard({ name, specialty, location, rating, reviewCount, image, accredited }: ProviderCardProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
      <img src={image} alt={name} className="h-20 w-20 rounded-lg object-cover" />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-serif text-base font-semibold text-card-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground">{specialty}</p>
          </div>
          {accredited && <BadgeCheck className="h-5 w-5 text-primary" />}
        </div>
        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{location}</span>
          <span className="flex items-center gap-1 text-accent"><Star className="h-3.5 w-3.5 fill-current" />{rating} ({reviewCount})</span>
        </div>
        <Button size="sm" variant="outline" className="mt-3">
          View Profile
        </Button>
      </div>
    </div>
  );
}
