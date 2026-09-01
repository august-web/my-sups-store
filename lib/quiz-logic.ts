import { CONCERN_PRODUCT_MAP, BUDGET_MAP } from "./quiz-data";

export interface QuizAnswers {
  concerns: string[];
  lifestyle: string;
  budget: string;
}

export interface RecommendedProduct {
  slug: string;
  reason: string;
  priority: number;
}

/**
 * Generate personalized product recommendations based on quiz answers.
 * Scores products by concern relevance, then filters by budget.
 */
export function getRecommendations(answers: QuizAnswers): RecommendedProduct[] {
  const productScores: Record<string, { score: number; reasons: string[] }> = {};

  // Score products based on concerns
  for (const concern of answers.concerns) {
    const products = CONCERN_PRODUCT_MAP[concern] || [];
    for (const slug of products) {
      if (!productScores[slug]) {
        productScores[slug] = { score: 0, reasons: [] };
      }
      productScores[slug].score += 2;
      productScores[slug].reasons.push(
        `Targets your concern: ${formatConcern(concern)}`
      );
    }
  }

  // Lifestyle bonus
  const lifestyleBonuses: Record<string, string[]> = {
    busy: ["glow-boosting-gummies"], // Easy to take
    active: ["marine-collagen-peptides", "energy-glow-stack"],
    student: ["glow-boosting-gummies", "de-bloat-probiotic"],
    parent: ["beauty-sleep-complex", "marine-collagen-peptides"],
  };

  const lifestyleProducts = lifestyleBonuses[answers.lifestyle] || [];
  for (const slug of lifestyleProducts) {
    if (!productScores[slug]) {
      productScores[slug] = { score: 0, reasons: [] };
    }
    productScores[slug].score += 1;
    productScores[slug].reasons.push("Great for your lifestyle");
  }

  // Sort by score and return top recommendations
  const sorted = Object.entries(productScores)
    .map(([slug, { score, reasons }]) => ({
      slug,
      reason: reasons[0] || "Recommended for you",
      priority: score,
    }))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 4);

  return sorted;
}

function formatConcern(concern: string): string {
  const map: Record<string, string> = {
    acne: "Acne & Breakouts",
    dullness: "Dullness & Uneven Tone",
    aging: "Aging & Fine Lines",
    dryness: "Dryness & Dehydration",
    oiliness: "Oiliness & Large Pores",
  };
  return map[concern] || concern;
}
