"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { IconButton } from "@/components/ui/IconButton";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/story" },
  { label: "Quiz", href: "/quiz" },
  { label: "Build Your Box", href: "/build-your-box" },
] as const;

interface NavbarProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

/**
 * Sakara-style sticky navigation.
 * Transparent on hero, solid cream with blur on scroll.
 */
export function Navbar({ cartItemCount = 0, onCartClick }: NavbarProps) {
  const scrollY = useScrollPosition();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isScrolled = scrollY > 50;

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-cream/90 backdrop-blur-md border-b border-charcoal/5 shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile: Hamburger */}
            {!isDesktop && (
              <button
                type="button"
                onClick={handleMobileMenuToggle}
                className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-charcoal/5 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-charcoal" />
              </button>
            )}

            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "flex items-center transition-colors duration-300",
                isDesktop ? "" : "absolute left-1/2 -translate-x-1/2"
              )}
            >
              <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-charcoal">
                MY SUPS+
              </span>
            </Link>

            {/* Desktop: Nav Links */}
            {isDesktop && (
              <div className="flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative text-sm font-sans font-medium text-charcoal/70",
                      "hover:text-charcoal transition-colors duration-200",
                      "after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px]",
                      "after:bg-charcoal after:transition-all after:duration-300",
                      "hover:after:w-full"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Right: Icons */}
            <div className="flex items-center gap-1">
              <IconButton ariaLabel="Search">
                <Search className="w-5 h-5 text-charcoal" />
              </IconButton>
              <IconButton href="/auth/login" ariaLabel="Account">
                <User className="w-5 h-5 text-charcoal" />
              </IconButton>
              <IconButton
                ariaLabel={`Shopping cart, ${cartItemCount} items`}
                onClick={onCartClick}
                badge={cartItemCount}
              >
                <ShoppingBag className="w-5 h-5 text-charcoal" />
              </IconButton>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {!isDesktop && mobileMenuOpen && (
          <MobileDrawer
            links={NAV_LINKS}
            onClose={closeMobileMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Mobile Drawer (inline for co-location) ─── */

interface MobileDrawerProps {
  links: readonly { label: string; href: string }[];
  onClose: () => void;
}

function MobileDrawer({ links, onClose }: MobileDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[60] bg-charcoal/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <motion.div
        className="fixed top-0 left-0 bottom-0 z-[70] w-full max-w-sm bg-cream"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
        }}
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal/5">
            <span className="font-serif text-xl font-semibold text-charcoal">
              MY SUPS+
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-charcoal/5 transition-colors"
              aria-label="Close menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto py-6">
            <div className="flex flex-col gap-1 px-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "px-4 py-3.5 rounded-lg text-base font-sans font-medium text-charcoal/80",
                    "hover:bg-charcoal/5 hover:text-charcoal transition-colors duration-200"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom: Social + WhatsApp */}
          <div className="px-6 py-6 border-t border-charcoal/5">
            <a
              href="https://wa.me/233594455472?text=Hi!%20I%27m%20interested%20in%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center gap-2 w-full py-3.5 rounded-full",
                "bg-[#25D366] text-white font-sans font-medium text-sm",
                "hover:bg-[#20BD5C] transition-colors duration-200"
              )}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>

            <div className="flex items-center justify-center gap-6 mt-5">
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@my.sups.store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-taupe hover:text-charcoal transition-colors"
                aria-label="Follow us on TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.67a8.16 8.16 0 004.76 1.52V6.74a4.85 4.85 0 01-1-.05z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-taupe hover:text-charcoal transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
