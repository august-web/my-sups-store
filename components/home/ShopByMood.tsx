"use client";

import { motion } from "framer-motion";
import { MoodCard } from "@/components/ui/MoodCard";
import { Sparkles, Leaf, Zap, Moon } from "lucide-react";

const MOODS = [
  {
    name: "Glow",
    description: "Radiance-boosting supplements for luminous, dewy skin.",
    icon: "sparkles",
    href: "/shop?mood=glow",
    color: "coral" as const,
  },
  {
    name: "De-Bloat",
    description: "Digestive support for a calm, comfortable belly.",
    icon: "leaf",
    href: "/shop?mood=debloat",
    color: "mint" as const,
  },
  {
    name: "Energy",
    description: "Daily vitality to fuel your skin and your day.",
    icon: "zap",
    href: "/shop?mood=energy",
    color: "sunshine" as const,
  },
  {
    name: "Sleep",
    description: "Rest & recovery supplements for overnight repair.",
    icon: "moon",
    href: "/shop?mood=sleep",
    color: "cyan" as const,
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/**
 * "Shop by Mood" section — HUM-style category grid.
 * 4 color-coded cards: Glow, De-Bloat, Energy, Sleep.
 */
export function ShopByMood() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal">
            What&apos;s Your Glow Goal?
          </h2>
          <p className="mt-4 text-taupe text-base lg:text-lg max-w-lg mx-auto">
            Shop by how you want to feel — not just what you want to fix.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {MOODS.map((mood) => (
            <motion.div key={mood.name} variants={itemVariants}>
              <MoodCard {...mood} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
