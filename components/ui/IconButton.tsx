"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  ariaLabel: string;
  className?: string;
  badge?: number;
}

/**
 * Accessible icon button with optional notification badge.
 * Used for search, account, and cart icons in the navbar.
 */
export function IconButton({
  children,
  onClick,
  href,
  ariaLabel,
  className,
  badge,
}: IconButtonProps) {
  const baseClasses = cn(
    "relative flex items-center justify-center w-10 h-10 rounded-full",
    "transition-colors duration-200",
    "hover:bg-charcoal/5 active:bg-charcoal/10",
    "focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-2",
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} aria-label={ariaLabel}>
        {children}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-display font-bold text-white bg-coral rounded-full leading-none">
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-display font-bold text-white bg-coral rounded-full leading-none">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </button>
  );
}
