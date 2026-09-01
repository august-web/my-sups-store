"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  rating: number;
  reviewCount: number;
  mood?: string;
}

const ALL_PRODUCTS: Product[] = [
  { id: "1", name: "Marine Collagen Peptides", slug: "marine-collagen-peptides", price: 39.99, rating: 4.8, reviewCount: 234, mood: "glow" },
  { id: "2", name: "Glow-Boosting Gummies", slug: "glow-boosting-gummies", price: 29.99, rating: 4.7, reviewCount: 189, mood: "glow" },
  { id: "3", name: "Beauty Sleep Complex", slug: "beauty-sleep-complex", price: 34.99, rating: 4.9, reviewCount: 156, mood: "sleep" },
  { id: "4", name: "De-Bloat Probiotic", slug: "de-bloat-probiotic", price: 32.99, rating: 4.6, reviewCount: 128, mood: "debloat" },
  { id: "5", name: "Energy + Glow Stack", slug: "energy-glow-stack", price: 64.99, rating: 4.8, reviewCount: 97, mood: "energy" },
  { id: "6", name: "Vitamin C Brightening Gummies", slug: "vitamin-c-brightening-gummies", price: 26.99, rating: 4.6, reviewCount: 115, mood: "glow" },
  { id: "7", name: "Hyaluronic Acid Serum", slug: "hyaluronic-acid-serum", price: 27.99, rating: 4.5, reviewCount: 82, mood: "glow" },
];

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
              <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-cream-dark flex items-center justify-center">
                <span className="text-xl opacity-30">✨</span>
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
