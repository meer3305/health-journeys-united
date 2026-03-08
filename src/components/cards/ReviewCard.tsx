import { Star } from "lucide-react";
import type { Review } from "@/data/mockData";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`}
          />
        ))}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground italic">"{review.text}"</p>
      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-border"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-semibold">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.treatment} · {review.country}</p>
        </div>
      </div>
    </div>
  );
}
