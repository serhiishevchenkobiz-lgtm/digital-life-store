"use server";

import { getSupabaseRouteHandler, isSupabaseConfigured } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type SignedDownloadResult =
  | { ok: true; url: string; expiresAt: number }
  | { ok: false; error: string };

/**
 * Returns a short-lived signed URL for a paid asset the current user owns.
 *
 * Security model:
 * 1. The signed URL is created with the SERVICE ROLE key (RLS bypass).
 * 2. Before signing we verify, via the ANON client, that the user has a
 *    matching row in `purchases`. If not, we return an error — never the URL.
 * 3. The signed URL is valid for 5 minutes (300s) and is single-purpose.
 * 4. Each issuance is recorded in `download_log`.
 */
export async function getSignedDownloadUrl(productId: string): Promise<SignedDownloadResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase is not configured in this environment." };
  }

  const supabase = await getSupabaseRouteHandler();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false, error: "You must be signed in to download." };

  // 1. Confirm ownership via RLS-protected read.
  const { data: purchase, error: purchaseError } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (purchaseError) return { ok: false, error: purchaseError.message };
  if (!purchase) return { ok: false, error: "You do not own this product." };

  // 2. Look up the private storage path. Users cannot see this directly
  //    (no RLS policy exposes the path), so we use the admin client after
  //    ownership was confirmed.
  const admin = getSupabaseAdmin();
  const { data: product, error: productError } = await admin
    .from("products")
    .select("private_storage_path")
    .eq("id", productId)
    .maybeSingle();

  if (productError || !product) return { ok: false, error: "Product not found." };

  // 3. Mint a short-lived signed URL.
  const { data: signed, error: signedError } = await admin.storage
    .from("paid-assets")
    .createSignedUrl(product.private_storage_path, 300);

  if (signedError || !signed) {
    return { ok: false, error: signedError?.message ?? "Could not create download link." };
  }

  // 4. Audit log (best-effort, do not block download on failure).
  await admin.from("download_log").insert({
    user_id: user.id,
    product_id: productId,
    ip: null,
    user_agent: null,
  });

  return { ok: true, url: signed.signedUrl, expiresAt: Date.now() + 300_000 };
}