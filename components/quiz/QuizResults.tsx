"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";

interface RecommendedProduct {
  slug: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  reason: string;
}

interface QuizResultsProps {
  recommendations: RecommendedProduct[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/**
 * Quiz results page content — shows recommended products with reasons and CTAs.
 */
export function QuizResults({ recommendations }: QuizResultsProps) {
  const { addItem } = useCart();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="text-5xl mb-4"
        >
          ✨
        </motion.div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal">
          Your Personalized Glow Stack
        </h1>
        <p className="mt-3 text-taupe text-base max-w-md mx-auto">
          Based on your answers, we recommend these supplements for your skin goals.
        </p>
      </div>

      {/* Bundle discount badge */}
      {recommendations.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <Badge variant="coral" className="text-sm px-4 py-1.5">
            🎁 Bundle these & save 15%
          </Badge>
        </motion.div>
      )}

      {/* Recommended Products */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 mb-10"
      >
        {recommendations.map((rec) => (
          <motion.div
            key={rec.slug}
            variants={itemVariants}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
          >
            {/* Image placeholder */}
            <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-cream-dark flex items-center justify-center">
              <span className="text-2xl opacity-30">✨</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg font-semibold text-charcoal truncate">
                {rec.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={rec.rating} size="sm" />
                <span className="text-xs text-taupe">({rec.reviewCount})</span>
              </div>
              <p className="text-xs text-taupe mt-1">{rec.reason}</p>
            </div>

            {/* Price + Add */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className="font-sans font-semibold text-charcoal">
                {formatPrice(rec.price)}
              </span>
              <button
                onClick={() =>
                  addItem({
                    id: rec.slug,
                    name: rec.name,
                    slug: rec.slug,
                    price: rec.price,
                    isSubscription: false,
                  })
                }
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-sans font-medium",
                  "border border-navy text-navy",
                  "hover:bg-navy hover:text-white transition-colors"
                )}
              >
                Add to Box
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/build-your-box"
          className={cn(
            "px-8 py-3.5 rounded-full font-sans font-medium text-sm",
            "bg-navy text-white",
            "hover:bg-navy-light transition-colors duration-200",
            "min-w-[200px] text-center"
          )}
        >
          Build Your Box 📦
        </Link>
        <Link
          href="/quiz"
          className="text-sm text-taupe hover:text-charcoal transition-colors font-sans"
        >
          Retake Quiz
        </Link>
      </div>
    </div>
  );
}
