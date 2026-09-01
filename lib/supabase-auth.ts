"use client";

/**
 * Auth helper functions.
 * In demo mode (no Supabase credentials), uses localStorage to simulate auth.
 * In production, these call the Supabase Auth API.
 */

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
}

const DEMO_USER_KEY = "mysups-demo-user";

function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Sign up with email and password.
 */
export async function signUp(
  email: string,
  password: string,
  metadata: { full_name: string; phone?: string }
): Promise<{ user: AuthUser | null; error: string | null }> {
  if (!isSupabaseConfigured()) {
    // Demo mode — simulate signup
    const user: AuthUser = {
      id: crypto.randomUUID(),
      email,
      full_name: metadata.full_name,
      phone: metadata.phone,
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
    return { user, error: null };
  }

  // TODO: Real Supabase signup
  // const { createClient } = await import("@supabase/supabase-js");
  // const supabase = createClient(...)
  // const { data, error } = await supabase.auth.signUp({ email, password, options: { data: metadata } });
  return { user: null, error: "Supabase not configured" };
}

/**
 * Sign in with email and password.
 */
export async function signIn(
  email: string,
  password: string
): Promise<{ user: AuthUser | null; error: string | null }> {
  if (!isSupabaseConfigured()) {
    // Demo mode — accept any email/password combo
    const stored = localStorage.getItem(DEMO_USER_KEY);
    if (stored) {
      const user = JSON.parse(stored) as AuthUser;
      if (user.email === email) {
        return { user, error: null };
      }
    }
    // Create a new demo user on login
    const user: AuthUser = {
      id: crypto.randomUUID(),
      email,
      full_name: email.split("@")[0].replace(/[._]/g, " "),
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
    return { user, error: null };
  }

  return { user: null, error: "Supabase not configured" };
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  localStorage.removeItem(DEMO_USER_KEY);
}

/**
 * Get the current session/user.
 */
export async function getUser(): Promise<AuthUser | null> {
  if (!isSupabaseConfigured()) {
    const stored = localStorage.getItem(DEMO_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }
  return null;
}
