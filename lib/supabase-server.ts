import { createClient } from "@supabase/supabase-js";

/**
 * Supabase admin client for server-side operations.
 * Uses the service role key — bypasses Row Level Security.
 * Only use in API routes, server actions, and webhook handlers.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
