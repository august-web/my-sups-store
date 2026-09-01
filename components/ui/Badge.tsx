import { cn } from "@/lib/utils";

type BadgeVariant = "coral" | "cyan" | "mint" | "navy" | "taupe";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  coral: "bg-coral/10 text-coral",
  cyan: "bg-cyan/10 text-cyan",
  mint: "bg-mint/10 text-mint",
  navy: "bg-navy/10 text-navy",
  taupe: "bg-taupe/10 text-taupe",
};

/**
 * Small pill-shaped badge for labels, tags, and status indicators.
 */
export function Badge({
  children,
  variant = "coral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full",
        "text-xs font-display font-medium leading-tight",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
