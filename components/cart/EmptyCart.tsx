"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

interface EmptyCartProps {
  onClose: () => void;
}

/**
 * Empty cart state — shown when cart has no items.
 */
export function EmptyCart({ onClose }: EmptyCartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      <ShoppingBag className="w-12 h-12 text-taupe/40 mb-4" />
      <p className="font-serif text-xl font-semibold text-charcoal">
        Your cart is empty
      </p>
      <p className="text-sm text-taupe mt-2 mb-6">
        Time to start your glow journey.
      </p>
      <Link
        href="/shop"
        onClick={onClose}
        className={cn(
          "px-8 py-3 rounded-full font-sans font-medium text-sm",
          "bg-navy text-white",
          "hover:bg-navy-light transition-colors duration-200"
        )}
      >
        Start Shopping
      </Link>
    </motion.div>
  );
}
