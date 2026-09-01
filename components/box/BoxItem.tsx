"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { BoxItem as BoxItemType } from "@/lib/box-logic";

interface BoxItemProps {
  item: BoxItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

/**
 * Individual item in the box with thumbnail, name, quantity ±, price, remove.
 */
export function BoxItemCard({ item, onUpdateQuantity, onRemove }: BoxItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-3 py-3 border-b border-charcoal/5 last:border-0"
    >
      {/* Thumbnail */}
      <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-cream-dark flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-lg opacity-30">✨</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-sans font-medium text-charcoal truncate">
          {item.name}
        </h4>
        <span className="text-xs text-taupe">{formatPrice(item.price)} each</span>
      </div>

      {/* Quantity + Remove */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center border border-charcoal/10 rounded-full">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-6 h-6 flex items-center justify-center text-xs text-charcoal hover:bg-charcoal/5 rounded-l-full"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-6 text-center text-xs font-sans font-medium">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-6 flex items-center justify-center text-xs text-charcoal hover:bg-charcoal/5 rounded-r-full"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <span className="text-sm font-sans font-medium text-charcoal w-14 text-right">
          {formatPrice(item.price * item.quantity)}
        </span>
        <button
          onClick={() => onRemove(item.id)}
          className="p-1 rounded-full hover:bg-charcoal/5 transition-colors"
          aria-label={`Remove ${item.name}`}
        >
          <X className="w-3 h-3 text-taupe" />
        </button>
      </div>
    </motion.div>
  );
}
