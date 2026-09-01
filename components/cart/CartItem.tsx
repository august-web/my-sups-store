"use client";

import { motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/lib/cart-store";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number, variant?: string) => void;
  onRemove: (id: string, variant?: string) => void;
}

/**
 * Individual cart item with thumbnail, details, quantity controls, and remove.
 */
export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 py-4 border-b border-charcoal/5 last:border-0"
    >
      {/* Thumbnail */}
      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-cream-dark">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-taupe/30" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-sans text-sm font-medium text-charcoal truncate">
              {item.name}
            </h4>
            {item.variant && (
              <p className="text-xs text-taupe mt-0.5">{item.variant}</p>
            )}
            {item.isSubscription && (
              <span className="inline-block text-[10px] text-coral font-medium mt-0.5">
                Subscribe & Save
              </span>
            )}
          </div>
          <button
            onClick={() => onRemove(item.id, item.variant)}
            className="flex-shrink-0 p-1 rounded-full hover:bg-charcoal/5 transition-colors"
            aria-label={`Remove ${item.name}`}
          >
            <X className="w-3.5 h-3.5 text-taupe" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center border border-charcoal/10 rounded-full">
            <button
              onClick={() =>
                onUpdateQuantity(item.id, item.quantity - 1, item.variant)
              }
              className="w-7 h-7 flex items-center justify-center text-charcoal hover:bg-charcoal/5 rounded-l-full transition-colors text-xs"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-7 text-center text-xs font-sans font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                onUpdateQuantity(item.id, item.quantity + 1, item.variant)
              }
              className="w-7 h-7 flex items-center justify-center text-charcoal hover:bg-charcoal/5 rounded-r-full transition-colors text-xs"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Price */}
          <span className="font-sans text-sm font-semibold text-charcoal">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
