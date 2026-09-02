"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ProductCard, type Product } from "@/components/product/ProductCard";
import { FilterDrawer, type FilterState } from "@/components/ui/FilterDrawer";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { getAllProducts } from "@/lib/mock-products";

function SearchIcon() {
  return <Search className="w-10 h-10 text-taupe/30 mx-auto mb-4" />;
}

// Map mock products to the Product card type
const ALL_PRODUCTS: Product[] = getAllProducts().map((p, idx) => ({
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

const DEFAULT_FILTERS: FilterState = {
  category: "All",
  mood: "All",
  maxPrice: 100,
  bestsellersOnly: false,
  sort: "featured",
};

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest" },
];

const CATEGORIES = ["All", "Collagen", "Gummies", "Serums", "Bundles"];
const MOODS = ["All", "Glow", "De-Bloat", "Energy", "Sleep"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

/**
 * Product listing page with sidebar filters (desktop), filter drawer (mobile),
 * sort dropdown, and responsive grid.
 */
export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (filters.category !== "All") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    if (filters.mood !== "All") {
      result = result.filter(
        (p) => p.mood?.toLowerCase() === filters.mood.toLowerCase()
      );
    }
    if (filters.bestsellersOnly) {
      result = result.filter((p) => p.is_bestseller);
    }
    result = result.filter((p) => p.price <= filters.maxPrice);

    // Sort
    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.reverse();
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Header */}
      <div className="mb-8 lg:mb-12">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal">
          Shop
        </h1>
        <p className="mt-3 text-taupe text-base lg:text-lg">
          {filteredProducts.length} products
        </p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <SidebarFilterGroup label="Sort By">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilters({ ...filters, sort: opt.value })}
                  className={cn(
                    "block w-full text-left px-3 py-2 rounded-lg text-sm font-sans transition-all",
                    filters.sort === opt.value
                      ? "bg-charcoal text-white"
                      : "text-charcoal hover:bg-charcoal/5"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </SidebarFilterGroup>

            <SidebarFilterGroup label="Category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters({ ...filters, category: cat })}
                  className={cn(
                    "block w-full text-left px-3 py-2 rounded-lg text-sm font-sans transition-all",
                    filters.category === cat
                      ? "bg-charcoal text-white"
                      : "text-charcoal hover:bg-charcoal/5"
                  )}
                >
                  {cat}
                </button>
              ))}
            </SidebarFilterGroup>

            <SidebarFilterGroup label="Mood">
              {MOODS.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setFilters({ ...filters, mood })}
                  className={cn(
                    "block w-full text-left px-3 py-2 rounded-lg text-sm font-sans transition-all",
                    filters.mood === mood
                      ? "bg-charcoal text-white"
                      : "text-charcoal hover:bg-charcoal/5"
                  )}
                >
                  {mood}
                </button>
              ))}
            </SidebarFilterGroup>

            <div className="flex items-center justify-between px-3">
              <span className="text-sm font-sans text-charcoal">
                Bestsellers Only
              </span>
              <button
                onClick={() =>
                  setFilters({
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
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile filter trigger + sort */}
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <FilterDrawer filters={filters} onFiltersChange={setFilters} />
            <span className="text-sm text-taupe lg:hidden">
              {filteredProducts.length} products
            </span>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <SearchIcon />
              <p className="font-serif text-xl text-charcoal">
                No products found
              </p>
              <p className="text-sm text-taupe mt-2">
                Try adjusting your filters.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Sidebar Filter Group ─── */

function SidebarFilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="text-xs font-display font-bold uppercase tracking-wider text-taupe block mb-2 px-3">
        {label}
      </span>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}
