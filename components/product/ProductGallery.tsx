"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

/**
 * Product image gallery with main image and clickable thumbnail row.
 * Main image crossfades on thumbnail click. Swipe support on mobile.
 */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Use placeholder if no images
  const displayImages =
    images.length > 0
      ? images
      : ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"];

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div
        className={cn(
          "relative aspect-square rounded-xl overflow-hidden bg-cream-dark cursor-zoom-in",
          isZoomed && "cursor-zoom-out"
        )}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={displayImages[activeIndex]}
            alt={`${productName} - image ${activeIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500",
              isZoomed && "scale-150"
            )}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIndex(idx);
                setIsZoomed(false);
              }}
              className={cn(
                "flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200",
                idx === activeIndex
                  ? "border-charcoal"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
