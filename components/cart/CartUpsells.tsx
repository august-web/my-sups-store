"use client";

import { cn, formatPrice } from "@/lib/utils";

const UPSELL_PRODUCTS = [
  {
    id: "upsell-1",
    name: "Glow-Boosting Gummies",
    price: 29.99,
    tagline: "Pair with your collagen for 2x glow",
  },
  {
    id: "upsell-2",
    name: "Beauty Sleep Complex",
    price: 34.99,
    tagline: "Nighttime repair while you sleep",
  },
  {
    id: "upsell-3",
    name: "Vitamin C Brightening Gummies",
    price: 26.99,
    tagline: "Boost collagen absorption by 50%",
  },
];

interface CartUpsellsProps {
  onAddProduct: (product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    isSubscription: boolean;
  }) => void;
}

/**
 * "Complete Your Routine" upsell suggestions at the bottom of the cart.
 */
export function CartUpsells({ onAddProduct }: CartUpsellsProps) {
  return (
    <div className="px-4 py-4 border-t border-charcoal/5">
      <p className="text-xs font-display font-bold uppercase tracking-wider text-taupe mb-3">
        Complete Your Routine
      </p>
      <div className="space-y-2">
        {UPSELL_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-2.5 rounded-lg bg-cream hover:bg-cream-dark transition-colors"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs font-sans font-medium text-charcoal truncate">
                {product.name}
              </p>
              <p className="text-[10px] text-taupe">{product.tagline}</p>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <span className="text-xs font-sans font-medium text-charcoal whitespace-nowrap">
                {formatPrice(product.price)}
              </span>
              <button
                onClick={() =>
                  onAddProduct({
                    id: product.id,
                    name: product.name,
                    slug: product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    price: product.price,
                    isSubscription: false,
                  })
                }
                className={cn(
                  "px-2.5 py-1 rounded-full text-[10px] font-sans font-medium",
                  "border border-charcoal/10 text-charcoal",
                  "hover:bg-charcoal hover:text-white transition-colors"
                )}
              >
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
