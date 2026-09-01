"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number | null;
  image?: string;
  ratings?: number;
  review_count?: number;
  is_bestseller?: boolean;
  mood?: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

/**
 * Product card used in bestseller carousels and product grids.
 * Shows image, name, price, star rating, and optional bestseller badge.
 */
export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "group relative bg-white rounded-xl overflow-hidden",
          "shadow-sm hover:shadow-card-hover transition-shadow duration-300",
          className
        )}
      >
        {/* Image */}
        <div className="relative aspect-square bg-cream-dark overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl opacity-20">✨</span>
            </div>
          )}
          {product.is_bestseller && (
            <div className="absolute top-3 left-3">
              <Badge variant="coral">BEST SELLER</Badge>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-navy transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <StarRating rating={product.ratings ?? 0} size="sm" />
            <span className="text-xs text-taupe">
              ({product.review_count ?? 0})
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-sans font-semibold text-charcoal">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-sm text-taupe line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
