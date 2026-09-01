export interface BoxItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface DiscountTier {
  minItems: number;
  discount: number; // percentage
  label: string;
  color: "coral" | "cyan" | "mint";
}

export const DISCOUNT_TIERS: DiscountTier[] = [
  { minItems: 3, discount: 10, label: "Save 10%", color: "coral" },
  { minItems: 4, discount: 15, label: "Save 15%", color: "cyan" },
  { minItems: 5, discount: 20, label: "Save 20%", color: "mint" },
];

/**
 * Calculate the discount tier based on number of items in the box.
 */
export function getDiscountTier(itemCount: number): DiscountTier | null {
  // Find the highest applicable tier
  for (let i = DISCOUNT_TIERS.length - 1; i >= 0; i--) {
    if (itemCount >= DISCOUNT_TIERS[i].minItems) {
      return DISCOUNT_TIERS[i];
    }
  }
  return null;
}

/**
 * Calculate box total with tier discount.
 */
export function calculateBoxTotal(
  items: BoxItem[],
  subscriptionExtraDiscount: number = 0
): {
  subtotal: number;
  discountTier: DiscountTier | null;
  tierDiscount: number;
  subscriptionDiscount: number;
  total: number;
  totalSavings: number;
} {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const discountTier = getDiscountTier(itemCount);
  const tierDiscountPercent = discountTier?.discount ?? 0;

  const tierDiscount = subtotal * (tierDiscountPercent / 100);
  const afterTierDiscount = subtotal - tierDiscount;

  const subscriptionDiscount =
    subscriptionExtraDiscount > 0
      ? afterTierDiscount * (subscriptionExtraDiscount / 100)
      : 0;

  const total = afterTierDiscount - subscriptionDiscount;
  const totalSavings = tierDiscount + subscriptionDiscount;

  return {
    subtotal,
    discountTier,
    tierDiscount,
    subscriptionDiscount,
    total,
    totalSavings,
  };
}
