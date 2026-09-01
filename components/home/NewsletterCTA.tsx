"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Final CTA section — navy background, large serif heading, quiz button.
 * Placed at the bottom of the homepage to drive conversions.
 */
export function NewsletterCTA() {
  return (
    <section className="py-24 lg:py-32 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight">
            Ready to Start Your
            <br />
            Glow Journey?
          </h2>
          <p className="mt-5 text-white/60 text-base lg:text-lg max-w-lg mx-auto">
            Take our 30-second quiz and get a personalized supplement routine built just for your skin.
          </p>
          <Link
            href="/quiz"
            className={cn(
              "inline-block mt-8 px-10 py-4 rounded-full",
              "bg-white text-navy font-sans font-medium text-sm",
              "hover:bg-cream transition-colors duration-200",
              "min-w-[200px]"
            )}
          >
            Take the Quiz ✨
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
