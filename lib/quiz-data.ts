export interface QuizOption {
  id: string;
  label: string;
  description?: string;
  icon: string;
  multiSelect?: boolean;
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle?: string;
  type: "multi-select" | "single-select";
  options: QuizOption[];
  maxSelections?: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "concerns",
    title: "What's your biggest skin concern?",
    subtitle: "Select up to 2",
    type: "multi-select",
    maxSelections: 2,
    options: [
      {
        id: "acne",
        label: "Acne & Breakouts",
        description: "Blemishes, blackheads, congestion",
        icon: "",
      },
      {
        id: "dullness",
        label: "Dullness & Uneven Tone",
        description: "Lack of radiance, dark spots",
        icon: "",
      },
      {
        id: "aging",
        label: "Aging & Fine Lines",
        description: "Wrinkles, loss of firmness",
        icon: "",
      },
      {
        id: "dryness",
        label: "Dryness & Dehydration",
        description: "Flaky, tight, or rough skin",
        icon: "",
      },
      {
        id: "oiliness",
        label: "Oiliness & Large Pores",
        description: "Shiny T-zone, visible pores",
        icon: "",
      },
    ],
  },
  {
    id: "lifestyle",
    title: "What's your lifestyle like?",
    subtitle: "Pick the one that fits best",
    type: "single-select",
    options: [
      {
        id: "busy",
        label: "Busy Professional",
        icon: "",
      },
      {
        id: "active",
        label: "Active & Fitness-focused",
        icon: "",
      },
      {
        id: "student",
        label: "Student",
        icon: "",
      },
      {
        id: "parent",
        label: "Parent on-the-go",
        icon: "",
      },
    ],
  },
  {
    id: "budget",
    title: "What's your budget per month?",
    subtitle: "Select what works for you",
    type: "single-select",
    options: [
      {
        id: "under30",
        label: "Under $30",
        icon: "",
      },
      {
        id: "30to50",
        label: "$30 – $50",
        icon: "",
      },
      {
        id: "over50",
        label: "$50+",
        icon: "",
      },
    ],
  },
];

/**
 * Product recommendations mapped by concern.
 * Each concern maps to a set of recommended product slugs.
 */
export const CONCERN_PRODUCT_MAP: Record<string, string[]> = {
  acne: ["de-bloat-probiotic", "marine-collagen-peptides"],
  dullness: ["glow-boosting-gummies", "marine-collagen-peptides"],
  aging: ["marine-collagen-peptides", "beauty-sleep-complex"],
  dryness: ["marine-collagen-peptides", "glow-boosting-gummies"],
  oiliness: ["de-bloat-probiotic", "vitamin-c-brightening-gummies"],
};

/**
 * Budget-to-product-price mapping.
 */
export const BUDGET_MAP: Record<string, { maxPrice: number }> = {
  under30: { maxPrice: 30 },
  "30to50": { maxPrice: 50 },
  over50: { maxPrice: 999 },
};
