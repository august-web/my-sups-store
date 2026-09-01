"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

export interface Variant {
  id: string;
  name: string;
  price: number;
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedId: string;
  onSelect: (variant: Variant) => void;
}

/**
 * Pill-button variant selector for choosing supply duration, size, etc.
 */
export function VariantSelector({
  variants,
  selectedId,
  onSelect,
}: VariantSelectorProps) {
  if (variants.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-display font-bold uppercase tracking-wider text-taupe">
        Select Option
      </span>
      <div className="flex gap-2 flex-wrap">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onSelect(variant)}
            className={cn(
              "px-4 py-2.5 rounded-full text-sm font-sans font-medium transition-all duration-200 border",
              variant.id === selectedId
                ? "bg-navy text-white border-navy"
                : "bg-white text-charcoal border-charcoal/10 hover:border-charcoal/30"
            )}
          >
            {variant.name}
            <span className="ml-1.5 text-xs opacity-70">
              {formatPrice(variant.price)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
