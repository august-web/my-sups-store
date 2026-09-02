"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizResults } from "@/components/quiz/QuizResults";
import { Sparkles } from "lucide-react";
import { getProductBySlug } from "@/lib/mock-products";

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
        <Sparkles className="w-10 h-10 text-sunshine mx-auto mb-4 animate-pulse" />
        <p className="text-taupe">Loading your results...</p>
      </div>
    );
  }

  // Map recommendations to full product data
  const recommendations = results.recommendations
    .map((rec) => {
      const data = getProductBySlug(rec.slug);
      if (!data) return null;
      return {
        slug: rec.slug,
        name: data.name,
        price: data.price,
        rating: data.ratings,
        reviewCount: data.review_count,
        image: data.images[0],
        reason: rec.reason,
      };
    })
    .filter(Boolean) as {
    slug: string;
    name: string;
    price: number;
    rating: number;
    reviewCount: number;
    image: string;
    reason: string;
  }[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <QuizResults recommendations={recommendations} />
    </div>
  );
}
