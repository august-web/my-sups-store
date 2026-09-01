"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Ingredient {
  name: string;
  amount?: string;
  benefit: string;
}

interface IngredientBreakdownProps {
  ingredients: Ingredient[];
}

/**
 * Expandable accordion list of product ingredients with amounts and benefits.
 */
export function IngredientBreakdown({ ingredients }: IngredientBreakdownProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-charcoal/5">
      {ingredients.map((ingredient, idx) => (
        <div key={idx}>
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="flex items-center justify-between w-full py-4 text-left group"
            aria-expanded={openIndex === idx}
          >
            <div className="flex items-center gap-3">
              <span className="font-sans font-medium text-sm text-charcoal">
                {ingredient.name}
              </span>
              {ingredient.amount && (
                <span className="text-xs text-taupe bg-cream-dark px-2 py-0.5 rounded-full">
                  {ingredient.amount}
                </span>
              )}
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-taupe transition-transform duration-200",
                openIndex === idx && "rotate-180"
              )}
            />
          </button>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="pb-4 text-sm text-taupe leading-relaxed">
                  {ingredient.benefit}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
