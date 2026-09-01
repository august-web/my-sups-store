"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Full-bleed hero section with parallax scroll effect.
 * Sakara-style: large serif heading, generous whitespace, gradient overlay on lifestyle image.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div
          className="w-full h-[120%] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1920&q=80')",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/50 to-cream" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white leading-tight"
        >
          Clear Skin
          <br />
          Starts Inside ✨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-lg sm:text-xl text-white/80 font-sans max-w-xl mx-auto"
        >
          Premium skincare supplements for men &amp; women.
          <br className="hidden sm:block" />
          Marine collagen, glow-boosting gummies &amp; more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/shop"
            className={cn(
              "px-8 py-4 rounded-full font-sans font-medium text-sm",
              "bg-white text-navy",
              "hover:bg-cream transition-colors duration-200",
              "min-w-[180px]"
            )}
          >
            Shop Now
          </Link>
          <Link
            href="/quiz"
            className={cn(
              "px-8 py-4 rounded-full font-sans font-medium text-sm",
              "border-2 border-white text-white",
              "hover:bg-white/10 transition-colors duration-200",
              "min-w-[180px]"
            )}
          >
            Take the Quiz
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
