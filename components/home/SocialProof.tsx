"use client";

import { motion } from "framer-motion";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";

const REVIEWS = [
  {
    name: "Sarah M.",
    rating: 5,
    quote: "My skin has never looked this good. The collagen peptides are a game-changer — I'm glowing!",
    product: "Marine Collagen Peptides",
  },
  {
    name: "James K.",
    rating: 5,
    quote: "Started taking the glow gummies a month ago and the compliments haven't stopped. Worth every penny.",
    product: "Glow-Boosting Gummies",
  },
  {
    name: "Priya L.",
    rating: 5,
    quote: "Finally something that actually works for my skin. The quiz recommended the perfect stack for me.",
    product: "Energy + Glow Stack",
  },
  {
    name: "Alex T.",
    rating: 4,
    quote: "The de-bloat probiotic changed my life. No more bloating after meals — I feel so much better.",
    product: "De-Bloat Probiotic",
  },
  {
    name: "Mia R.",
    rating: 5,
    quote: "I've tried so many supplements. These are the only ones I actually notice a difference with.",
    product: "Beauty Sleep Complex",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

/**
 * Social proof section with customer review cards in horizontal scroll
 * and a TikTok video embed / link.
 */
export function SocialProof() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal">
            Join 10K+ Glowing Customers
          </h2>
          <p className="mt-4 text-taupe text-base lg:text-lg max-w-lg mx-auto">
            Real reviews from real people who tried My Sups+.
          </p>
        </div>

        {/* TikTok embed / link */}
        <div className="mb-14">
          <a
            href="https://www.tiktok.com/@my.sups.store"
            target="_blank"
            rel="noopener noreferrer"
            className="group block max-w-md mx-auto"
          >
            <div className="relative aspect-[9/16] max-h-[400px] mx-auto rounded-2xl overflow-hidden bg-charcoal/5 border border-charcoal/5">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-charcoal/20 group-hover:text-coral transition-colors"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.67a8.16 8.16 0 004.76 1.52V6.74a4.85 4.85 0 01-1-.05z" />
                </svg>
                <span className="text-sm font-sans font-medium text-taupe group-hover:text-charcoal transition-colors">
                  @my.sups.store on TikTok
                </span>
                <span className="text-xs text-taupe/60">Follow for skincare tips ✨</span>
              </div>
            </div>
          </a>
        </div>

        {/* Review cards carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex gap-4 overflow-x-auto scroll-snap-x scrollbar-hide pb-4 -mx-4 px-4"
        >
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="min-w-[280px] max-w-[320px] snap-start bg-cream rounded-xl p-6 flex-shrink-0"
            >
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={review.rating} size="sm" />
              </div>
              <p className="text-sm text-charcoal leading-relaxed mb-4 line-clamp-4">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-sans font-medium text-charcoal">
                  {review.name}
                </span>
                <Badge variant="mint">Verified Buyer</Badge>
              </div>
              <p className="text-xs text-taupe mt-1">{review.product}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
