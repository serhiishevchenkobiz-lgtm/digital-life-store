/**
 * Server-only Supabase client with the SERVICE ROLE key.
 *
 * ⚠️  NEVER import this module from a Client Component or from any file that
 * ends up in a client bundle. Doing so would leak the service-role key.
 *
 * Use only from:
 *   - Server Actions
 *   - Route Handlers (under src/app/api/...)
 *   - Edge Functions
 *   - Build-time scripts
 *
 * The service-role bypasses Row Level Security — every query must be
 * author-checked explicitly in the calling code.
 */

import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

let cached: SupabaseClient<Database> | null = null;

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase admin env vars missing — set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  cached = createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}