import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase client for use in browser/client components.
 * Uses the anon key — respects Row Level Security policies.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
