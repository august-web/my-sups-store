"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

/**
 * Animated step progress bar with numbered indicators.
 */
export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep) / totalSteps) * 100;

  return (
    <div className="flex items-center gap-3">
      {/* Step indicators */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-xs font-sans font-semibold transition-all duration-300",
                i < currentStep
                  ? "bg-coral text-white"
                  : i === currentStep
                    ? "bg-charcoal text-white"
                    : "bg-charcoal/10 text-taupe"
              )}
            >
              {i < currentStep ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M2 7l3.5 3.5L12 3" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {i < totalSteps - 1 && (
              <div className="w-8 h-[2px] bg-charcoal/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: i < currentStep ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full bg-coral"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step label */}
      <span className="text-xs text-taupe font-sans ml-1">
        Step {currentStep + 1} of {totalSteps}
      </span>
    </div>
  );
}
