"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";
import { getAllProducts } from "@/lib/mock-products";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  rating: number;
  reviewCount: number;
  mood?: string;
  image?: string;
}

const ALL_PRODUCTS: Product[] = getAllProducts().map((p, idx) => ({
  id: String(idx + 1),
  name: p.name,
  slug: p.slug,
  price: p.price,
  rating: p.ratings,
  reviewCount: p.review_count,
  mood: p.mood,
  image: p.images[0],
}));

const MOOD_FILTERS = ["All", "Glow", "De-Bloat", "Energy", "Sleep"];

interface ProductPickerProps {
  boxItemIds: string[];
  onAddProduct: (product: Product) => void;
}

/**
 * Filterable product grid for selecting items to add to the box.
 */
export function ProductPicker({ boxItemIds, onAddProduct }: ProductPickerProps) {
  const [moodFilter, setMoodFilter] = useState("All");

  const filtered =
    moodFilter === "All"
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter(
          (p) => p.mood?.toLowerCase() === moodFilter.toLowerCase()
        );

  return (
    <div>
      {/* Mood filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {MOOD_FILTERS.map((mood) => (
          <button
            key={mood}
            onClick={() => setMoodFilter(mood)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-sans font-medium whitespace-nowrap border transition-all",
              moodFilter === mood
                ? "bg-charcoal text-white border-charcoal"
                : "bg-white text-charcoal border-charcoal/10 hover:border-charcoal/30"
            )}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((product) => {
          const isInBox = boxItemIds.includes(product.id);
          return (
            <motion.div
              key={product.id}
              layout
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl border transition-all",
                isInBox
                  ? "border-mint bg-mint/5"
                  : "border-charcoal/5 bg-white hover:shadow-sm"
              )}
            >
              {/* Image */}
              <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-cream-dark overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-taupe/10" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-sans font-medium text-charcoal truncate">
                  {product.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <StarRating rating={product.rating} size="sm" />
                  <span className="text-[10px] text-taupe">
                    ({product.reviewCount})
                  </span>
                </div>
                <span className="text-sm font-sans font-semibold text-charcoal">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Add button */}
              <button
                onClick={() => !isInBox && onAddProduct(product)}
                disabled={isInBox}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-sans font-medium flex-shrink-0 transition-all",
                  isInBox
                    ? "bg-mint/20 text-mint cursor-default"
                    : "bg-navy text-white hover:bg-navy-light"
                )}
              >
                {isInBox ? "✓ Added" : "+ Add"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
