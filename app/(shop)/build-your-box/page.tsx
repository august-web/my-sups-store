"use client";

import { motion } from "framer-motion";
import { BoxBuilder } from "@/components/box/BoxBuilder";

/**
 * Build Your Box page — HUM-style dynamic bundle builder with tiered discounts.
 */
export default function BuildYourBoxPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Header */}
      <div className="text-center mb-12 lg:mb-16">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl block mb-4"
        >
          📦
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal"
        >
          Build Your Perfect Box
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-taupe text-base lg:text-lg max-w-lg mx-auto"
        >
          Mix & match your favorites. The more you add, the more you save.
        </motion.p>
      </div>

      {/* Builder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <BoxBuilder />
      </motion.div>
    </div>
  );
}
