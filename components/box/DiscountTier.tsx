"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DISCOUNT_TIERS, type DiscountTier as TierType } from "@/lib/box-logic";

interface DiscountTierProps {
  currentTier: TierType | null;
  itemCount: number;
}

const colorMap = {
  coral: "bg-coral text-white",
  cyan: "bg-cyan text-white",
  mint: "bg-mint text-charcoal",
};

const bgColorMap = {
  coral: "bg-coral/10 text-coral",
  cyan: "bg-cyan/10 text-cyan",
  mint: "bg-mint/10 text-mint",
};

/**
 * Discount tier display showing progress toward each tier.
 */
export function DiscountTierDisplay({
  currentTier,
  itemCount,
}: DiscountTierProps) {
  return (
    <div className="space-y-2">
      {DISCOUNT_TIERS.map((tier) => {
        const isActive = currentTier && currentTier.discount >= tier.discount;
        const isNext =
          !isActive &&
          itemCount < tier.minItems &&
          (itemCount >= (DISCOUNT_TIERS[DISCOUNT_TIERS.indexOf(tier) - 1]?.minItems ?? 0));

        return (
          <div
            key={tier.discount}
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-sans transition-all duration-300",
              isActive
                ? colorMap[tier.color]
                : isNext
                  ? bgColorMap[tier.color]
                  : "bg-charcoal/5 text-taupe"
            )}
          >
            <div className="flex items-center gap-2">
              {isActive ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  ✅
                </motion.span>
              ) : (
                <span className="opacity-40">○</span>
              )}
              <span className="font-medium">
                {tier.minItems}+ items → {tier.label}
              </span>
            </div>
            {isActive && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="font-bold"
              >
                −{tier.discount}%
              </motion.span>
            )}
            {!isActive && (
              <span className="text-taupe">
                {tier.minItems - itemCount > 0
                  ? `${tier.minItems - itemCount} more`
                  : ""}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
