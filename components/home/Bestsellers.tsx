"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard, type Product } from "@/components/product/ProductCard";

// Mock bestseller data — replace with Supabase query
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Marine Collagen Peptides",
    slug: "marine-collagen-peptides",
    price: 39.99,
    compare_at_price: 49.99,
    ratings: 4.8,
    review_count: 234,
    is_bestseller: true,
    mood: "glow",
  },
  {
    id: "2",
    name: "Glow-Boosting Gummies",
    slug: "glow-boosting-gummies",
    price: 29.99,
    ratings: 4.7,
    review_count: 189,
    is_bestseller: true,
    mood: "glow",
  },
  {
    id: "3",
    name: "Beauty Sleep Complex",
    slug: "beauty-sleep-complex",
    price: 34.99,
    ratings: 4.9,
    review_count: 156,
    is_bestseller: true,
    mood: "sleep",
  },
  {
    id: "4",
    name: "De-Bloat Probiotic",
    slug: "de-bloat-probiotic",
    price: 32.99,
    compare_at_price: 39.99,
    ratings: 4.6,
    review_count: 128,
    is_bestseller: true,
    mood: "debloat",
  },
  {
    id: "5",
    name: "Energy + Glow Stack",
    slug: "energy-glow-stack",
    price: 64.99,
    compare_at_price: 79.98,
    ratings: 4.8,
    review_count: 97,
    is_bestseller: true,
    mood: "energy",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/**
 * Bestsellers carousel with horizontal scroll on mobile, grid on desktop.
 * Navigation arrows for desktop scrolling.
 */
export function Bestsellers() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal">
              Our Bestsellers
            </h2>
            <p className="mt-3 text-taupe text-base lg:text-lg">
              Loved by 10,000+ glowing customers
            </p>
          </div>

          {/* Desktop nav arrows */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-charcoal/10 hover:bg-charcoal/5 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-charcoal" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-charcoal/10 hover:bg-charcoal/5 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-charcoal" />
            </button>
          </div>
        </div>

        {/* Mobile: horizontal scroll carousel */}
        <div
          ref={scrollRef}
          className={cn(
            "flex gap-4 overflow-x-auto scroll-snap-x scrollbar-hide pb-4",
            "lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
          )}
        >
          {MOCK_PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className={cn(
                "min-w-[260px] snap-start",
                "lg:min-w-0"
              )}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
