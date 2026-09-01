"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion } from "@/lib/quiz-data";
import { QuizOption } from "./QuizOption";

interface QuizStepProps {
  question: QuizQuestion;
  selectedIds: string[];
  onSelect: (optionId: string) => void;
  direction: number;
}

/**
 * Individual quiz step with question, options, and slide transition.
 */
export function QuizStep({
  question,
  selectedIds,
  onSelect,
  direction,
}: QuizStepProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Question */}
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
            {question.title}
          </h2>
          {question.subtitle && (
            <p className="mt-2 text-sm text-taupe">{question.subtitle}</p>
          )}
        </div>

        {/* Options */}
        <div
          className={
            question.type === "multi-select"
              ? "flex flex-col gap-3"
              : "grid grid-cols-2 gap-3"
          }
        >
          {question.options.map((option) => (
            <QuizOption
              key={option.id}
              {...option}
              isSelected={selectedIds.includes(option.id)}
              onSelect={onSelect}
              type={question.type}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
