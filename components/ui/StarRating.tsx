"use client";

import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

/**
 * Display star rating with filled stars, half stars, and empty stars.
 */
export function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  showValue = false,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex gap-0.5">
        {Array.from({ length: maxStars }, (_, i) => {
          const fill = Math.min(Math.max(rating - i, 0), 1);
          return (
            <svg
              key={i}
              className={cn(sizeMap[size], "text-sunshine")}
              viewBox="0 0 20 20"
              fill="none"
            >
              <defs>
                <linearGradient id={`star-fill-${i}-${rating}`}>
                  <stop offset={`${fill * 100}%`} stopColor="currentColor" />
                  <stop offset={`${fill * 100}%`} stopColor="#D1D5DB" />
                </linearGradient>
              </defs>
              <path
                d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z"
                fill={`url(#star-fill-${i}-${rating})`}
              />
            </svg>
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-sans text-taupe ml-0.5">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
