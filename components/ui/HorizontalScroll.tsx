import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Horizontal scroll container with snap points and hidden scrollbar.
 * Used for carousels on mobile.
 */
export function HorizontalScroll({ children, className }: HorizontalScrollProps) {
  return (
    <div
      className={cn(
        "flex gap-4 overflow-x-auto scroll-snap-x scrollbar-hide pb-4",
        className
      )}
    >
      {children}
    </div>
  );
}
