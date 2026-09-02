"use client";

import { motion } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";
import { Truck, CheckCircle } from "lucide-react";

function TruckIcon() {
  return <Truck className="w-4 h-4 inline" />;
}
function CheckIcon() {
  return <CheckCircle className="w-4 h-4 inline" />;
}

const THRESHOLD = 500;

interface FreeShippingBarProps {
  subtotal: number;
}

/**
 * Animated progress bar toward free shipping.
 * Shows amount remaining or success message.
 */
export function FreeShippingBar({ subtotal }: FreeShippingBarProps) {
  const remaining = Math.max(0, THRESHOLD - subtotal);
  const progress = Math.min((subtotal / THRESHOLD) * 100, 100);
  const isQualified = remaining <= 0;

  return (
    <div className={cn("px-4 py-3", isQualified ? "bg-mint/10" : "bg-cream")}>
      {isQualified ? (
        <div className="flex items-center justify-center gap-2 text-sm text-mint font-sans font-medium">
          <TruckIcon />
          <span>You&apos;ve unlocked free shipping!</span>
          <CheckIcon />
        </div>
      ) : (
        <>
          <p className="text-xs text-center text-taupe mb-2">
            You&apos;re <span className="font-semibold text-charcoal">{formatPrice(remaining)}</span> away from free shipping!
          </p>
          <div className="w-full h-1.5 bg-charcoal/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-mint rounded-full"
            />
          </div>
        </>
      )}
    </div>
  );
}
