"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SubscriptionToggle } from "@/components/product/SubscriptionToggle";
import { VariantSelector, type Variant } from "@/components/product/VariantSelector";
import { IngredientBreakdown, type Ingredient } from "@/components/product/IngredientBreakdown";
import { ReviewSection } from "@/components/product/ReviewSection";
import { TrustBadges } from "@/components/product/TrustBadges";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";
import { StarRating } from "@/components/ui/StarRating";

// Mock product data — replace with Supabase query
const MOCK_PRODUCTS: Record<string, {
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price?: number;
  images: string[];
  ratings: number;
  review_count: number;
  is_subscription: boolean;
  subscription_discount: number;
  how_to_use: string;
  variants: Variant[];
  ingredients: Ingredient[];
}> = {
  "marine-collagen-peptides": {
    name: "Marine Collagen Peptides",
    slug: "marine-collagen-peptides",
    description:
      "Wild-caught marine collagen peptides sourced from sustainably harvested fish. Supports skin elasticity, hydration, and a youthful glow from within. Unflavored and dissolves easily in any beverage.",
    price: 39.99,
    compare_at_price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4ee8e3e?w=800&q=80",
    ],
    ratings: 4.8,
    review_count: 234,
    is_subscription: true,
    subscription_discount: 20,
    how_to_use:
      "Mix one scoop (10g) into your morning coffee, smoothie, or water. For best results, take daily for at least 30 days. Can be used hot or cold.",
    variants: [
      { id: "v1", name: "30 Day Supply", price: 39.99 },
      { id: "v2", name: "60 Day Supply", price: 69.99 },
      { id: "v3", name: "90 Day Supply", price: 94.99 },
    ],
    ingredients: [
      {
        name: "Marine Collagen Peptides",
        amount: "10g",
        benefit:
          "Hydrolyzed type I & III collagen from wild-caught fish. Supports skin elasticity, hydration, and reduces fine lines. Absorbs 1.5x more effectively than bovine collagen.",
      },
      {
        name: "Vitamin C",
        amount: "90mg",
        benefit:
          "Essential for collagen synthesis and provides antioxidant protection. Helps brighten skin tone and protect against environmental damage.",
      },
      {
        name: "Hyaluronic Acid",
        amount: "120mg",
        benefit:
          "Attracts and retains moisture in the skin, supporting hydration from within. Helps plump skin and reduce the appearance of fine lines.",
      },
      {
        name: "Zinc",
        amount: "11mg",
        benefit:
          "Supports skin repair and wound healing. Helps regulate oil production and reduce inflammation associated with breakouts.",
      },
    ],
  },
};

const TABS = ["Description", "Ingredients", "How to Use", "Reviews"] as const;

type Tab = (typeof TABS)[number];

/**
 * Product detail page with two-column layout (stacked on mobile).
 * Gallery on left, product info on right. Below: tabbed content.
 */
export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = MOCK_PRODUCTS[slug];

  const [isSubscription, setIsSubscription] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product?.variants[0] ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("Description");

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <span className="text-5xl mb-4 block">🔍</span>
        <h1 className="font-serif text-3xl font-semibold text-charcoal">
          Product Not Found
        </h1>
        <p className="mt-3 text-taupe">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <a
          href="/shop"
          className="inline-block mt-6 px-6 py-3 rounded-full bg-navy text-white text-sm font-sans font-medium"
        >
          Back to Shop
        </a>
      </div>
    );
  }

  const currentPrice = isSubscription
    ? product.price * (1 - product.subscription_discount / 100)
    : selectedVariant?.price ?? product.price;

  function handleAddToCart() {
    // TODO: wire up to Zustand cart store
    alert(
      `Added ${quantity}x ${product.name} (${selectedVariant?.name ?? "default"}) to cart!`
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-taupe mb-6 lg:mb-8">
        <a href="/" className="hover:text-charcoal transition-colors">
          Home
        </a>
        <span className="mx-2">/</span>
        <a href="/shop" className="hover:text-charcoal transition-colors">
          Shop
        </a>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left: Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Right: Info */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={product.ratings} size="md" />
              <span className="text-sm text-taupe">
                {product.ratings.toFixed(1)} ({product.review_count} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-sans text-2xl font-semibold text-charcoal">
              {formatPrice(currentPrice)}
            </span>
            {product.compare_at_price &&
              product.compare_at_price > product.price && (
                <span className="text-lg text-taupe line-through">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
            {isSubscription && (
              <span className="text-sm text-coral font-sans font-medium">
                Save {product.subscription_discount}%
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-charcoal/70 leading-relaxed">
            {product.description}
          </p>

          {/* Subscription Toggle */}
          {product.is_subscription && (
            <SubscriptionToggle
              isSubscription={isSubscription}
              onChange={setIsSubscription}
              discount={product.subscription_discount}
            />
          )}

          {/* Variant Selector */}
          {product.variants.length > 0 && (
            <VariantSelector
              variants={product.variants}
              selectedId={selectedVariant?.id ?? ""}
              onSelect={setSelectedVariant}
            />
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-charcoal/10 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-charcoal/5 rounded-l-full transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-sans font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-charcoal/5 rounded-r-full transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={cn(
                "flex-1 py-3.5 rounded-full font-sans font-medium text-sm text-white",
                "bg-navy hover:bg-navy-light transition-colors duration-200"
              )}
            >
              Add to Cart — {formatPrice(currentPrice * quantity)}
            </motion.button>
          </div>

          {/* Trust Badges */}
          <TrustBadges />
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="mt-16 lg:mt-24">
        {/* Tab Headers */}
        <div className="flex gap-1 border-b border-charcoal/5 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-3 text-sm font-sans font-medium whitespace-nowrap transition-colors relative",
                activeTab === tab
                  ? "text-charcoal"
                  : "text-taupe hover:text-charcoal"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-charcoal"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === "Description" && (
            <p className="text-sm text-charcoal/80 leading-relaxed max-w-2xl">
              {product.description}
            </p>
          )}
          {activeTab === "Ingredients" && (
            <div className="max-w-2xl">
              <IngredientBreakdown ingredients={product.ingredients} />
            </div>
          )}
          {activeTab === "How to Use" && (
            <div className="max-w-2xl">
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                How to Use
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                {product.how_to_use}
              </p>
            </div>
          )}
          {activeTab === "Reviews" && (
            <ReviewSection
              rating={product.ratings}
              reviewCount={product.review_count}
              reviews={[]}
            />
          )}
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <StickyMobileCTA
        price={currentPrice}
        onAddToCart={handleAddToCart}
        isSubscription={isSubscription}
      />
    </div>
  );
}
