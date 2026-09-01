"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { BoxItem } from "@/lib/box-logic";
import { ProductPicker } from "./ProductPicker";
import { BoxPreview } from "./BoxPreview";

/**
 * Build Your Box — HUM-style dynamic bundle builder.
 * Two-column layout: ProductPicker (left) + BoxPreview (right, sticky on desktop).
 */
export function BoxBuilder() {
  const [items, setItems] = useState<BoxItem[]>([]);
  const [isSubscription, setIsSubscription] = useState(false);

  const boxItemIds = items.map((i) => i.id);

  const handleAddProduct = useCallback(
    (product: { id: string; name: string; slug: string; price: number }) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            quantity: 1,
          },
        ];
      });
    },
    []
  );

  const handleUpdateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const handleRemove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Product Picker (2/3 width) */}
      <div className="lg:col-span-2">
        <ProductPicker boxItemIds={boxItemIds} onAddProduct={handleAddProduct} />
      </div>

      {/* Right: Box Preview (1/3 width, sticky on desktop) */}
      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-24">
          <BoxPreview
            items={items}
            isSubscription={isSubscription}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemove}
            onToggleSubscription={setIsSubscription}
          />
        </div>
      </div>
    </div>
  );
}
