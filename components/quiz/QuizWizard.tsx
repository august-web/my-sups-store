"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";
import { getRecommendations } from "@/lib/quiz-logic";
import { ProgressBar } from "./ProgressBar";
import { QuizStep } from "./QuizStep";

/**
 * Interactive skin quiz wizard with 3 steps.
 * Collects concerns, lifestyle, and budget → generates recommendations.
 */
export function QuizWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selections, setSelections] = useState<Record<string, string[]>>({
    concerns: [],
    lifestyle: [],
    budget: [],
  });

  const question = QUIZ_QUESTIONS[currentStep];
  const currentSelections = selections[question.id] || [];
  const isLastStep = currentStep === QUIZ_QUESTIONS.length - 1;

  const canProceed =
    question.type === "multi-select"
      ? currentSelections.length > 0
      : currentSelections.length === 1;

  const handleSelect = useCallback(
    (optionId: string) => {
      setSelections((prev) => {
        const current = prev[question.id] || [];

        if (question.type === "single-select") {
          return { ...prev, [question.id]: [optionId] };
        }

        // Multi-select with max limit
        if (current.includes(optionId)) {
          return {
            ...prev,
            [question.id]: current.filter((id) => id !== optionId),
          };
        }

        if (question.maxSelections && current.length >= question.maxSelections) {
          return prev;
        }

        return { ...prev, [question.id]: [...current, optionId] };
      });
    },
    [question]
  );

  const handleNext = useCallback(() => {
    if (!canProceed) return;

    if (isLastStep) {
      // Generate recommendations and navigate to results
      const answers = {
        concerns: selections.concerns || [],
        lifestyle: (selections.lifestyle || [])[0] || "busy",
        budget: (selections.budget || [])[0] || "30to50",
      };

      const recommendations = getRecommendations(answers);

      // Store results in sessionStorage for the results page
      sessionStorage.setItem(
        "quiz-results",
        JSON.stringify({ answers, recommendations })
      );

      router.push("/quiz/results");
      return;
    }

    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  }, [canProceed, isLastStep, selections, router]);

  const handleBack = useCallback(() => {
    if (currentStep === 0) return;
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  }, [currentStep]);

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress Bar */}
      <div className="mb-10">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={QUIZ_QUESTIONS.length}
        />
      </div>

      {/* Current Step */}
      <QuizStep
        question={question}
        selectedIds={currentSelections}
        onSelect={handleSelect}
        direction={direction}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={cn(
            "px-5 py-2.5 rounded-full text-sm font-sans font-medium transition-colors",
            currentStep === 0
              ? "text-charcoal/30 cursor-not-allowed"
              : "text-charcoal hover:bg-charcoal/5"
          )}
        >
          ← Back
        </button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          disabled={!canProceed}
          className={cn(
            "px-8 py-3 rounded-full text-sm font-sans font-medium transition-all duration-200",
            canProceed
              ? "bg-navy text-white hover:bg-navy-light"
              : "bg-charcoal/10 text-charcoal/40 cursor-not-allowed"
          )}
        >
          {isLastStep ? "See My Results" : "Next →"}
        </motion.button>
      </div>
    </div>
  );
}
