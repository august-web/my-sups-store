const WHATSAPP_NUMBER = "972594455472";

const BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Generate a WhatsApp link with a pre-filled message.
 */
export function getWhatsAppLink(message?: string): string {
  const encoded = message ? `?text=${encodeURIComponent(message)}` : "";
  return `${BASE_URL}${encoded}`;
}

/**
 * Pre-filled messages for different contexts.
 */
export const whatsappMessages = {
  general: "Hi! I'm interested in your products 🌿",
  product: (productName: string) =>
    `Hi! I'd like to know more about ${productName} ✨`,
  order: (orderSummary: string) =>
    `Hi! I'd like to place an order:\n\n${orderSummary}`,
  quiz: "Hi! I just took the skin quiz and need help choosing 🎯",
  support: "Hi! I need help with my order 📦",
} as const;
