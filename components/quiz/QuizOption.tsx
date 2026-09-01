"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuizOptionProps {
  id: string;
  label: string;
  description?: string;
  icon: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  type: "multi-select" | "single-select";
}

/**
 * Selectable quiz option — pill for multi-select, card for single-select.
 */
export function QuizOption({
  label,
  description,
  icon,
  isSelected,
  onSelect,
  id,
  type,
}: QuizOptionProps) {
  if (type === "multi-select") {
    return (
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => onSelect(id)}
        className={cn(
          "flex items-center gap-3 w-full px-4 py-3.5 rounded-full text-left transition-all duration-200 border",
          isSelected
            ? "bg-coral/10 border-coral text-coral"
            : "bg-white border-charcoal/10 text-charcoal hover:border-charcoal/30"
        )}
      >
        {icon && <span className="text-lg flex-shrink-0">{icon}</span>}
        <div className="min-w-0">
          <span className="text-sm font-sans font-medium block">{label}</span>
          {description && (
            <span className="text-[10px] text-taupe block mt-0.5">
              {description}
            </span>
          )}
        </div>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto flex-shrink-0 w-5 h-5 rounded-full bg-coral flex items-center justify-center"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M2 6l3 3 5-5" />
            </svg>
          </motion.div>
        )}
      </motion.button>
    );
  }

  // Single-select card
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(id)}
      className={cn(
        "flex flex-col items-center gap-2 w-full p-5 rounded-xl text-center transition-all duration-200 border",
        isSelected
          ? "bg-navy/5 border-navy text-navy shadow-sm"
          : "bg-white border-charcoal/10 text-charcoal hover:border-charcoal/30"
      )}
    >
      {icon && <span className="text-2xl">{icon}</span>}
      <span className="text-sm font-sans font-medium">{label}</span>
    </motion.button>
  );
}
