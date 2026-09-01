"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "./CartItem";
import { CartUpsells } from "./CartUpsells";
import { FreeShippingBar } from "./FreeShippingBar";
import { EmptyCart } from "./EmptyCart";

/**
 * Sakara-style slide-over cart drawer.
 * Slides in from right with spring animation.
 * Shows items, free shipping bar, upsells, subtotal, and checkout button.
 */
export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-charcoal/40"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[90] w-full max-w-md bg-cream flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal/5">
              <h2 className="font-sans text-base font-semibold text-charcoal">
                Your Cart{" "}
                <span className="text-taupe font-normal">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              </h2>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-charcoal/5 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            {/* Free Shipping Bar */}
            {items.length > 0 && <FreeShippingBar subtotal={subtotal} />}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <EmptyCart onClose={closeCart} />
              ) : (
                <div className="px-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <CartItem
                        key={`${item.id}-${item.variant}`}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Upsells */}
              {items.length > 0 && (
                <CartUpsells
                  onAddProduct={(product) =>
                    addItem({
                      ...product,
                      image: undefined,
                    })
                  }
                />
              )}
            </div>

            {/* Footer: Subtotal + Checkout */}
            {items.length > 0 && (
              <div className="border-t border-charcoal/5 px-6 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-sans text-taupe">Subtotal</span>
                  <span className="font-sans font-semibold text-charcoal">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-[10px] text-taupe text-center">
                  Shipping and taxes calculated at checkout
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className={cn(
                    "block w-full py-3.5 rounded-full text-center",
                    "font-sans font-medium text-sm text-white",
                    "bg-navy hover:bg-navy-light transition-colors duration-200"
                  )}
                >
                  Checkout — {formatPrice(subtotal)}
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full text-center text-sm text-taupe hover:text-charcoal transition-colors font-sans"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
