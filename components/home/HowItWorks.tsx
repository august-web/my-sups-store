"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Target, Package, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

function StepIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="w-8 h-8 text-charcoal/40" />;
}

const STEPS = [
  {
    number: "01",
    title: "Take the Quiz",
    description: "Answer a few questions about your skin, lifestyle, and goals.",
    icon: Target,
    href: "/quiz",
  },
  {
    number: "02",
    title: "Build Your Box",
    description: "Choose your perfect supplement stack with bundle discounts.",
    icon: Package,
    href: "/build-your-box",
  },
  {
    number: "03",
    title: "Glow from Within",
    description: "See visible results in 30 days — guaranteed.",
    icon: Sparkles,
    href: "/shop",
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/**
 * "How It Works" — 3-step numbered process with connecting dotted line.
 */
export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal">
            How It Works
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {/* Connecting dotted line (desktop only) */}
          <div className="hidden md:block absolute top-[52px] left-[20%] right-[20%] border-t-2 border-dashed border-charcoal/10" />

          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative text-center"
            >
              {/* Number circle */}
              <div className="relative z-10 mx-auto mb-6 flex items-center justify-center w-[104px] h-[104px] rounded-full bg-cream border-2 border-charcoal/10">
                <StepIcon icon={step.icon} />
              </div>

              {/* Step number */}
              <span className="inline-block text-xs font-display font-bold uppercase tracking-widest text-coral mb-3">
                Step {step.number}
              </span>

              <h3 className="font-serif text-2xl font-semibold text-charcoal mb-3">
                {step.title}
              </h3>
              <p className="text-taupe text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>

              <Link
                href={step.href}
                className={cn(
                  "inline-block mt-5 text-sm font-sans font-medium text-navy",
                  "hover:text-coral transition-colors duration-200"
                )}
              >
                Learn more →
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
