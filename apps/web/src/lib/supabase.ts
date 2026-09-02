/**
 * Cookie-aware Supabase clients for Next.js (App Router).
 *
 *   - getSupabaseServer()        — Server Components, Route Handlers, Server Actions
 *   - getSupabaseRouteHandler()  — explicit alias for the above
 *   - getSupabaseAnonymous()     — typed client without cookies (for scripts/tests)
 *
 * Browser code uses `getSupabaseBrowser()` from `./supabase-browser.ts`.
 *
 * All clients read keys from environment variables only — no hardcoded secrets.
 * The service-role key lives in `./supabase-admin.ts` and is marked server-only.
 */

import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/database.types";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "@/lib/supabase-env";

/**
 * Server-side client bound to the current request's cookies.
 */
export async function getSupabaseServer(): Promise<SupabaseClient<Database>> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase env vars missing — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in apps/web/.env.local.",
    );
  }
  const cookieStore = await cookies();

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options as CookieOptions);
          });
        } catch {
          // `set` is a no-op inside Server Components (read-only cookies).
          // The middleware refreshes the session instead.
        }
      },
    },
  });
}

/**
 * Explicit alias — use in Route Handlers and Server Actions where you want
 * the intent to be obvious at the call site.
 */
export const getSupabaseRouteHandler = getSupabaseServer;

/**
 * Re-export of the env helpers so server code only needs one import.
 */
export { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "@/lib/supabase-env";

/**
 * Typed client without cookie persistence. For scripts and tests.
 */
export function getSupabaseAnonymous(): SupabaseClient<Database> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase env vars missing.");
  }
  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}