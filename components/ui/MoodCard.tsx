"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MoodColor = "coral" | "mint" | "sunshine" | "cyan";

interface MoodCardProps {
  name: string;
  description: string;
  icon: string;
  href: string;
  color: MoodColor;
}

const colorStyles: Record<MoodColor, { bg: string; border: string; hover: string; text: string }> = {
  coral: {
    bg: "bg-coral/5",
    border: "border-coral/20",
    hover: "hover:border-coral/50 hover:bg-coral/10",
    text: "text-coral",
  },
  mint: {
    bg: "bg-mint/5",
    border: "border-mint/20",
    hover: "hover:border-mint/50 hover:bg-mint/10",
    text: "text-mint",
  },
  sunshine: {
    bg: "bg-sunshine/5",
    border: "border-sunshine/20",
    hover: "hover:border-sunshine/50 hover:bg-sunshine/10",
    text: "text-sunshine",
  },
  cyan: {
    bg: "bg-cyan/5",
    border: "border-cyan/20",
    hover: "hover:border-cyan/50 hover:bg-cyan/10",
    text: "text-cyan",
  },
};

/**
 * Mood card with icon, name, description, and color accent.
 * Used in the "Shop by Mood" section on the homepage.
 */
export function MoodCard({ name, description, icon, href, color }: MoodCardProps) {
  const styles = colorStyles[color];

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "relative p-6 lg:p-8 rounded-xl border cursor-pointer",
          "transition-shadow duration-300",
          "shadow-sm hover:shadow-card-hover",
          styles.bg,
          styles.border,
          styles.hover
        )}
      >
        <span className="text-4xl mb-4 block">{icon}</span>
        <h3 className={cn("font-serif text-xl font-semibold mb-2", styles.text)}>
          {name}
        </h3>
        <p className="text-sm text-taupe leading-relaxed mb-4">{description}</p>
        <span className={cn("text-sm font-sans font-medium", styles.text)}>
          Shop Now →
        </span>
      </motion.div>
    </Link>
  );
}
