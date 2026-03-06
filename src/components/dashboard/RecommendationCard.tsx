import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecommendationCardProps {
  title: string;
  provider: string;
  location: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  href: string;
  matchScore: number;
}

export function RecommendationCard({
  title, provider, location, price, currency, rating, image, href, matchScore
}: RecommendationCardProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md">
      <img src={image} alt={title} className="h-24 w-24 rounded-lg object-cover" />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-serif text-base font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">{provider}</p>
          </div>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {matchScore}% Match
          </span>
        </div>
        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{location}</span>
          <span className="flex items-center gap-1 text-accent"><Star className="h-3.5 w-3.5 fill-current" />{rating}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-serif text-lg font-bold text-primary">{currency}{price.toLocaleString()}</span>
          <Button size="sm" variant="outline" asChild>
            <Link to={href}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
