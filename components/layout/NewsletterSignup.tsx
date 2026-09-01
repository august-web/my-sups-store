"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
  className?: string;
  compact?: boolean;
}

/**
 * Email newsletter signup form.
 * Used in footer and as a standalone CTA section.
 */
export function NewsletterSignup({
  className,
  compact = false,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire up to Supabase or Mailchimp
    setSubmitted(true);
    setEmail("");
  }

  if (submitted && !compact) {
    return (
      <div className={cn("text-center", className)}>
        <p className="font-serif text-2xl text-charcoal">
          You&apos;re on the list!
        </p>
        <p className="mt-2 text-sm text-taupe">
          Check your inbox for your 15% off code.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col sm:flex-row gap-3",
        compact ? "max-w-md" : "max-w-lg mx-auto",
        className
      )}
    >
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={cn(
          "flex-1 px-4 py-3 rounded-full border border-charcoal/10",
          "bg-white text-charcoal text-sm font-sans placeholder:text-taupe/60",
          "focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral",
          "transition-all duration-200"
        )}
        aria-label="Email address"
      />
      <button
        type="submit"
        className={cn(
          "px-6 py-3 rounded-full font-sans font-medium text-sm",
          "bg-navy text-white",
          "hover:bg-navy-light active:scale-[0.98]",
          "transition-all duration-200",
          "whitespace-nowrap"
        )}
      >
        Get 15% Off
      </button>
    </form>
  );
}
