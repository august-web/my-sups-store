import { type NextRequest } from "next/server";

/**
 * Middleware to refresh Supabase auth session on every request.
 * In demo mode (no Supabase credentials), this is a no-op passthrough.
 *
 * In production with Supabase, use @supabase/ssr middleware:
 *
 * import { createServerClient } from "@supabase/ssr";
 *
 * export async function middleware(request: NextRequest) {
 *   let supabaseResponse = NextResponse.next({ request });
 *   const supabase = createServerClient(url, anonKey, {
 *     cookies: { ... },
 *   });
 *   await supabase.auth.getUser();
 *   return supabaseResponse;
 * }
 */
export function middleware(request: NextRequest) {
  // Passthrough — no auth checks in demo mode
  return undefined;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static, _next/image, favicon.ico (static files)
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
