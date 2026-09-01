import Link from "next/link";
import { cn } from "@/lib/utils";
import { NewsletterSignup } from "./NewsletterSignup";

const SHOP_LINKS = [
  { label: "Collagen", href: "/shop?category=collagen" },
  { label: "Gummies", href: "/shop?category=gummies" },
  { label: "Bundles", href: "/build-your-box" },
  { label: "Bestsellers", href: "/shop?bestsellers=true" },
] as const;

const SUPPORT_LINKS = [
  { label: "FAQ", href: "/faq" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Contact", href: "/contact" },
] as const;

const COMPANY_LINKS = [
  { label: "Our Story", href: "/story" },
  { label: "Blog", href: "/blog" },
  { label: "Lab Results", href: "/lab-results" },
] as const;

const CONNECT_LINKS = [
  { label: "TikTok", href: "https://www.tiktok.com/@my.sups.store", external: true },
  { label: "Instagram", href: "https://www.instagram.com", external: true },
  { label: "WhatsApp", href: "https://wa.me/972594455472", external: true },
] as const;

/**
 * Site-wide footer with newsletter signup, link columns, and copyright.
 * Cream background with a subtle top border, matching Sakara's editorial style.
 */
export function Footer() {
  return (
    <footer className="bg-cream border-t border-charcoal/5">
      {/* ─── Newsletter Section ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
            Join the glow ✨
          </h3>
          <p className="mt-3 text-taupe text-sm">
            Subscribe for exclusive offers, skincare tips, and 15% off your first order.
          </p>
          <div className="mt-8">
            <NewsletterSignup />
          </div>
        </div>
      </div>

      {/* ─── Link Columns ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <FooterColumn heading="Shop" links={SHOP_LINKS} />
          <FooterColumn heading="Support" links={SUPPORT_LINKS} />
          <FooterColumn heading="Company" links={COMPANY_LINKS} />
          <FooterColumn heading="Connect" links={CONNECT_LINKS} />
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="border-t border-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-taupe">
              © {new Date().getFullYear()} My Sups+. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-xs text-taupe hover:text-charcoal transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-taupe hover:text-charcoal transition-colors"
              >
                Terms of Service
              </Link>
            </div>

            {/* Payment icons placeholder */}
            <div className="flex items-center gap-2">
              {["Visa", "MC", "Amex"].map((card) => (
                <span
                  key={card}
                  className={cn(
                    "inline-flex items-center justify-center h-6 px-2 rounded",
                    "bg-charcoal/5 text-[9px] font-display font-bold text-taupe uppercase tracking-wider"
                  )}
                >
                  {card}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Footer Column Helper ─── */

interface FooterColumnLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumnProps {
  heading: string;
  links: readonly FooterColumnLink[];
}

function FooterColumn({ heading, links }: FooterColumnProps) {
  return (
    <div>
      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
        {heading}
      </h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-taupe hover:text-charcoal transition-colors duration-200"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-taupe hover:text-charcoal transition-colors duration-200"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
