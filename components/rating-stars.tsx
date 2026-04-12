import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1 text-amber-500", className)}>
      {Array.from({ length: 5 }).map((_, index) => {
        const active = index < Math.round(rating);
        return (
          <Star
            key={index}
            className={cn("h-4 w-4", active ? "fill-current" : "text-stone-300")}
          />
        );
      })}
    </div>
  );
}
