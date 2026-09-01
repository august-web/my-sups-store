"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizResults } from "@/components/quiz/QuizResults";

// Product lookup — replace with Supabase query
const PRODUCT_DATA: Record<string, { name: string; price: number; rating: number; reviewCount: number }> = {
  "marine-collagen-peptides": {
    name: "Marine Collagen Peptides",
    price: 39.99,
    rating: 4.8,
    reviewCount: 234,
  },
  "glow-boosting-gummies": {
    name: "Glow-Boosting Gummies",
    price: 29.99,
    rating: 4.7,
    reviewCount: 189,
  },
  "beauty-sleep-complex": {
    name: "Beauty Sleep Complex",
    price: 34.99,
    rating: 4.9,
    reviewCount: 156,
  },
  "de-bloat-probiotic": {
    name: "De-Bloat Probiotic",
    price: 32.99,
    rating: 4.6,
    reviewCount: 128,
  },
  "energy-glow-stack": {
    name: "Energy + Glow Stack",
    price: 64.99,
    rating: 4.8,
    reviewCount: 97,
  },
  "vitamin-c-brightening-gummies": {
    name: "Vitamin C Brightening Gummies",
    price: 26.99,
    rating: 4.6,
    reviewCount: 115,
  },
};

interface StoredResults {
  answers: { concerns: string[]; lifestyle: string; budget: string };
  recommendations: { slug: string; reason: string; priority: number }[];
}

/**
 * Quiz results page — reads from sessionStorage and displays recommendations.
 * Redirects to /quiz if no results are found.
 */
export default function QuizResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<StoredResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("quiz-results");
    if (!stored) {
      router.replace("/quiz");
      return;
    }

    try {
      setResults(JSON.parse(stored));
    } catch {
      router.replace("/quiz");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading || !results) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <span className="text-4xl animate-pulse block mb-4">✨</span>
        <p className="text-taupe">Loading your results...</p>
      </div>
    );
  }

  // Map recommendations to full product data
  const recommendations = results.recommendations
    .map((rec) => {
      const data = PRODUCT_DATA[rec.slug];
      if (!data) return null;
      return {
        slug: rec.slug,
        name: data.name,
        price: data.price,
        rating: data.rating,
        reviewCount: data.reviewCount,
        reason: rec.reason,
      };
    })
    .filter(Boolean) as {
    slug: string;
    name: string;
    price: number;
    rating: number;
    reviewCount: number;
    reason: string;
  }[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <QuizResults recommendations={recommendations} />
    </div>
  );
}
