"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterState {
  category: string;
  mood: string;
  maxPrice: number;
  bestsellersOnly: boolean;
  sort: string;
}

interface FilterDrawerProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const CATEGORIES = ["All", "Collagen", "Gummies", "Serums", "Bundles"];
const MOODS = ["All", "Glow", "De-Bloat", "Energy", "Sleep"];
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest" },
];

/**
 * Mobile filter drawer — slides up from bottom with full filter controls.
 * Desktop uses inline sidebar instead.
 */
export function FilterDrawer({ filters, onFiltersChange }: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger button (mobile only) */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full",
          "border border-charcoal/10 text-sm font-sans font-medium text-charcoal",
          "hover:bg-charcoal/5 transition-colors"
        )}
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-charcoal/40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[70] bg-cream rounded-t-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-cream border-b border-charcoal/5 px-6 py-4 flex items-center justify-between">
                <span className="font-sans font-semibold text-charcoal">
                  Filter & Sort
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-charcoal/5"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Sort */}
                <FilterGroup label="Sort By">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        onFiltersChange({ ...filters, sort: opt.value })
                      }
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-sans border transition-all",
                        filters.sort === opt.value
                          ? "bg-charcoal text-white border-charcoal"
                          : "bg-white text-charcoal border-charcoal/10"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </FilterGroup>

                {/* Category */}
                <FilterGroup label="Category">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() =>
                        onFiltersChange({ ...filters, category: cat })
                      }
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-sans border transition-all",
                        filters.category === cat
                          ? "bg-charcoal text-white border-charcoal"
                          : "bg-white text-charcoal border-charcoal/10"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </FilterGroup>

                {/* Mood */}
                <FilterGroup label="Mood">
                  {MOODS.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => onFiltersChange({ ...filters, mood })}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-sans border transition-all",
                        filters.mood === mood
                          ? "bg-charcoal text-white border-charcoal"
                          : "bg-white text-charcoal border-charcoal/10"
                      )}
                    >
                      {mood}
                    </button>
                  ))}
                </FilterGroup>

                {/* Bestsellers toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-sans text-charcoal">
                    Bestsellers Only
                  </span>
                  <button
                    onClick={() =>
                      onFiltersChange({
                        ...filters,
                        bestsellersOnly: !filters.bestsellersOnly,
                      })
                    }
                    className={cn(
                      "relative w-11 h-6 rounded-full transition-colors duration-200",
                      filters.bestsellersOnly ? "bg-coral" : "bg-charcoal/15"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200",
                        filters.bestsellersOnly && "translate-x-5"
                      )}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Filter Group Helper ─── */

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="text-xs font-display font-bold uppercase tracking-wider text-taupe block mb-3">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
