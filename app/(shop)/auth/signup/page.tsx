"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { signUp } from "@/lib/supabase-auth";

/**
 * Signup page — full name, email, password, phone form.
 */
export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { user, error: authError } = await signUp(email, password, {
      full_name: fullName,
      phone: phone || undefined,
    });

    if (authError) {
      setError(authError);
      setLoading(false);
      return;
    }

    if (user) {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-taupe">
            Start your glow journey with My Sups+
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-coral/10 text-coral text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-display font-bold uppercase tracking-wider text-taupe mb-1.5"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={cn(
                  "w-full px-4 py-3 rounded-lg border border-charcoal/10",
                  "bg-cream text-charcoal text-sm font-sans",
                  "placeholder:text-taupe/50",
                  "focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral",
                  "transition-all duration-200"
                )}
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-display font-bold uppercase tracking-wider text-taupe mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cn(
                  "w-full px-4 py-3 rounded-lg border border-charcoal/10",
                  "bg-cream text-charcoal text-sm font-sans",
                  "placeholder:text-taupe/50",
                  "focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral",
                  "transition-all duration-200"
                )}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-display font-bold uppercase tracking-wider text-taupe mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border border-charcoal/10",
                  "bg-cream text-charcoal text-sm font-sans",
                  "placeholder:text-taupe/50",
                  "focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral",
                  "transition-all duration-200"
                )}
                placeholder="••••••••"
              />
              <p className="text-[10px] text-taupe mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-display font-bold uppercase tracking-wider text-taupe mb-1.5"
              >
                Phone{" "}
                <span className="text-taupe/50 font-normal">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border border-charcoal/10",
                  "bg-cream text-charcoal text-sm font-sans",
                  "placeholder:text-taupe/50",
                  "focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral",
                  "transition-all duration-200"
                )}
                placeholder="059 445 5472"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-3.5 rounded-full font-sans font-medium text-sm text-white",
                "bg-navy hover:bg-navy-light transition-colors duration-200",
                loading && "opacity-60 cursor-not-allowed"
              )}
            >
              {loading ? "Creating account..." : "Create Account"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-taupe">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-navy font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Demo note */}
        <p className="mt-6 text-center text-xs text-taupe/60">
          Demo mode — create any account to explore the store
        </p>
      </motion.div>
    </div>
  );
}
