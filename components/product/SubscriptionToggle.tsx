"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface SubscriptionToggleProps {
  isSubscription: boolean;
  onChange: (isSubscription: boolean) => void;
  discount?: number;
}

/**
 * Two pill buttons: "One-Time Purchase" vs "Subscribe & Save X%".
 * Sakara-style toggle with coral badge for savings.
 */
export function SubscriptionToggle({
  isSubscription,
  onChange,
  discount = 20,
}: SubscriptionToggleProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          onClick={() => onChange(false)}
          className={cn(
            "flex-1 py-3 px-4 rounded-full text-sm font-sans font-medium transition-all duration-200 border",
            !isSubscription
              ? "bg-charcoal text-white border-charcoal"
              : "bg-white text-charcoal border-charcoal/10 hover:border-charcoal/30"
          )}
        >
          One-Time Purchase
        </button>
        <button
          onClick={() => onChange(true)}
          className={cn(
            "flex-1 py-3 px-4 rounded-full text-sm font-sans font-medium transition-all duration-200 border",
            isSubscription
              ? "bg-charcoal text-white border-charcoal"
              : "bg-white text-charcoal border-charcoal/10 hover:border-charcoal/30"
          )}
        >
          Subscribe & Save{" "}
          <Badge variant="coral" className="ml-1">
            {discount}%
          </Badge>
        </button>
      </div>
      {isSubscription && (
        <p className="text-xs text-taupe text-center">
          Delivered every 30 days. Cancel anytime.
        </p>
      )}
    </div>
  );
}
