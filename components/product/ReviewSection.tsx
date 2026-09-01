"use client";

import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  is_verified: boolean;
  created_at: string;
}

interface ReviewSectionProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    name: "Sarah M.",
    rating: 5,
    comment:
      "I've been using this for 3 months now and the difference in my skin is incredible. My collagen levels have definitely improved — my dermatologist even noticed!",
    is_verified: true,
    created_at: "2025-08-15",
  },
  {
    id: "2",
    name: "James K.",
    rating: 5,
    comment:
      "Great taste, easy to mix, and I can actually see results. My skin looks more plump and hydrated. Will definitely be subscribing.",
    is_verified: true,
    created_at: "2025-08-10",
  },
  {
    id: "3",
    name: "Priya L.",
    rating: 4,
    comment:
      "Good product overall. Took about 3 weeks to notice a difference but now my skin feels so much smoother. Taking one star off because I wish the container was bigger.",
    is_verified: false,
    created_at: "2025-07-28",
  },
];

/**
 * Review section with rating summary bar and individual review cards.
 */
export function ReviewSection({
  rating,
  reviewCount,
  reviews,
}: ReviewSectionProps) {
  const displayReviews = reviews.length > 0 ? reviews : MOCK_REVIEWS;

  // Rating distribution (mock)
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: displayReviews.filter((r) => r.rating === stars).length,
  }));
  const maxCount = Math.max(...distribution.map((d) => d.count), 1);

  return (
    <div>
      {/* Rating Summary */}
      <div className="flex flex-col sm:flex-row gap-8 mb-8">
        <div className="flex flex-col items-center sm:items-start">
          <span className="font-serif text-5xl font-semibold text-charcoal">
            {rating.toFixed(1)}
          </span>
          <StarRating rating={rating} size="lg" className="mt-2" />
          <span className="text-sm text-taupe mt-1">
            {reviewCount} reviews
          </span>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 flex flex-col gap-1.5 justify-center">
          {distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-2">
              <span className="text-xs text-taupe w-3 text-right">
                {d.stars}
              </span>
              <div className="flex-1 h-2 bg-cream-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-sunshine rounded-full transition-all duration-500"
                  style={{ width: `${(d.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {displayReviews.map((review) => (
          <div
            key={review.id}
            className="pb-6 border-b border-charcoal/5 last:border-0"
          >
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={review.rating} size="sm" />
              <span className="text-sm font-sans font-medium text-charcoal">
                {review.name}
              </span>
              {review.is_verified && (
                <Badge variant="mint">Verified Buyer</Badge>
              )}
            </div>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              {review.comment}
            </p>
            <span className="text-xs text-taupe mt-2 block">
              {new Date(review.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
