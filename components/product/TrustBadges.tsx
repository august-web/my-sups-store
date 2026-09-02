import { Truck, ShieldCheck, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

const BADGES = [
  {
    icon: Truck,
    label: "Free Shipping 500+",
  },
  {
    icon: ShieldCheck,
    label: "30-Day Guarantee",
  },
  {
    icon: FlaskConical,
    label: "Lab Tested",
  },
];

/**
 * Trust badges row displayed below the Add to Cart button.
 * Builds credibility with shipping, guarantee, and quality signals.
 */
export function TrustBadges() {
  return (
    <div className="flex items-center justify-center gap-6 py-4">
      {BADGES.map((badge) => (
        <div
          key={badge.label}
          className={cn(
            "flex items-center gap-1.5 text-xs text-taupe"
          )}
        >
          <badge.icon className="w-4 h-4 text-mint" />
          <span className="font-sans">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
