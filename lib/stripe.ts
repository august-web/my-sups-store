import Stripe from "stripe";

/**
 * Stripe server-side client.
 * Used in API routes for creating checkout sessions, subscriptions, and webhooks.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion,
  typescript: true,
});
