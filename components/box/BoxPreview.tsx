"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";
import { Package, PartyPopper } from "lucide-react";
import type { BoxItem } from "@/lib/box-logic";
import { calculateBoxTotal } from "@/lib/box-logic";
import { BoxItemCard } from "./BoxItem";
import { DiscountTierDisplay } from "./DiscountTier";

interface BoxPreviewProps {
  items: BoxItem[];
  isSubscription: boolean;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onToggleSubscription: (val: boolean) => void;
}

/**
 * Sticky box preview sidebar showing items, discount tiers, total, and checkout.
 */
export function BoxPreview({
  items,
  isSubscription,
  onUpdateQuantity,
  onRemove,
  onToggleSubscription,
}: BoxPreviewProps) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const pricing = calculateBoxTotal(items, isSubscription ? 10 : 0);

  return (
    <div className="bg-white rounded-xl border border-charcoal/5 p-5">
      {/* Header */}
      <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">
        Your Box ({itemCount} {itemCount === 1 ? "item" : "items"})
      </h3>

      {/* Discount Tiers */}
      <DiscountTierDisplay
        currentTier={pricing.discountTier}
        itemCount={itemCount}
      />

      {/* Items */}
      <div className="mt-4">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-10 h-10 text-taupe/30 mx-auto mb-2" />
            <p className="text-sm text-taupe">
              Your box is empty. Add products to start building!
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <BoxItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Subscription toggle */}
      {items.length > 0 && (
        <div className="mt-4 pt-4 border-t border-charcoal/5">
          <button
            onClick={() => onToggleSubscription(!isSubscription)}
            className="flex items-center justify-between w-full"
          >
            <span className="text-sm font-sans text-charcoal">
              Subscribe & Save Extra 10%
            </span>
            <div
              className={cn(
                "relative w-11 h-6 rounded-full transition-colors duration-200",
                isSubscription ? "bg-coral" : "bg-charcoal/15"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200",
                  isSubscription && "translate-x-5"
                )}
              />
            </div>
          </button>
        </div>
      )}

      {/* Pricing */}
      {items.length > 0 && (
        <div className="mt-4 pt-4 border-t border-charcoal/5 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-taupe">Subtotal</span>
            <span className="text-charcoal">{formatPrice(pricing.subtotal)}</span>
          </div>
          {pricing.tierDiscount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-mint font-medium">
                {pricing.discountTier?.label}
              </span>
              <span className="text-mint font-medium">
                −{formatPrice(pricing.tierDiscount)}
              </span>
            </div>
          )}
          {pricing.subscriptionDiscount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-coral font-medium">Subscribe & Save</span>
              <span className="text-coral font-medium">
                −{formatPrice(pricing.subscriptionDiscount)}
              </span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-charcoal/5">
            <span className="font-sans font-semibold text-charcoal">Total</span>
            <span className="font-sans font-bold text-charcoal text-lg">
              {formatPrice(pricing.total)}
            </span>
          </div>
          {pricing.totalSavings > 0 && (
            <p className="text-center text-xs text-mint font-medium">
              You&apos;re saving {formatPrice(pricing.totalSavings)}!
            </p>
          )}
        </div>
      )}

      {/* Checkout button */}
      {items.length > 0 && (
        <Link
          href="/checkout"
          className={cn(
            "block w-full mt-4 py-3.5 rounded-full text-center",
            "font-sans font-medium text-sm text-white",
            "bg-navy hover:bg-navy-light transition-colors duration-200"
          )}
        >
          Checkout with Box
        </Link>
      )}
    </div>
  );
}
