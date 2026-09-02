"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard, type Product } from "@/components/product/ProductCard";
import { getBestsellers } from "@/lib/mock-products";

// Map bestsellers to Product card type with images
const MOCK_PRODUCTS: Product[] = getBestsellers().map((p, idx) => ({
  id: String(idx + 1),
  name: p.name,
  slug: p.slug,
  price: p.price,
  compare_at_price: p.compare_at_price,
  image: p.images[0],
  ratings: p.ratings,
  review_count: p.review_count,
  is_bestseller: p.is_bestseller,
  mood: p.mood,
}));

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
