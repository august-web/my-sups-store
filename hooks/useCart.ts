"use client";

import { useCartStore } from "@/lib/cart-store";

/**
 * Convenience hook for accessing the cart store.
 * Wraps useCartStore with commonly used selectors.
 */
export function useCart() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const openCart = useCartStore((s) => s.openCart);
  const closeCart = useCartStore((s) => s.closeCart);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const getFreeShippingRemaining = useCartStore(
    (s) => s.getFreeShippingRemaining
  );

  return {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    subtotal: getSubtotal(),
    itemCount: getItemCount(),
    freeShippingRemaining: getFreeShippingRemaining(),
  };
}
