import { Star } from "lucide-react";
import type { Review } from "@/data/mockData";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-1 text-accent">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-card-foreground">{review.text}</p>
      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
        <img src={review.avatar} alt={review.name} className="h-10 w-10 rounded-full object-cover" />
        <div>
          <p className="text-sm font-medium text-card-foreground">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.country} · {review.treatment}</p>
        </div>
      </div>
    </div>
  );
}
