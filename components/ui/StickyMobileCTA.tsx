"use client";

import { motion } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";

interface StickyMobileCTAProps {
  price: number;
  onAddToCart: () => void;
  isSubscription?: boolean;
}

/**
 * Fixed bottom bar on mobile with price and Add to Cart button.
 * Only visible on mobile (hidden on lg+).
 */
export function StickyMobileCTA({
  price,
  onAddToCart,
  isSubscription,
}: StickyMobileCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-charcoal/5 px-4 py-3 safe-area-bottom">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <span className="font-sans font-semibold text-lg text-charcoal">
            {formatPrice(price)}
          </span>
          {isSubscription && (
            <span className="block text-[10px] text-taupe">/month</span>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onAddToCart}
          className={cn(
            "flex-1 py-3 rounded-full font-sans font-medium text-sm text-white",
            "bg-navy hover:bg-navy-light transition-colors duration-200"
          )}
        >
          Add to Cart
        </motion.button>
      </div>
    </div>
  );
}
