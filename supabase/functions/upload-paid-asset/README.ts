// Digital Life Press — Supabase Edge Function example.
//
// This file documents how to upload paid assets from CI or an admin script
// without ever exposing the service-role key to the browser.
//
// Usage (from CI):
//   supabase functions deploy upload-paid-asset
//   curl -X POST https://<project>.functions.supabase.co/upload-paid-asset \
//        -H "Authorization: Bearer <service-role-key-from-CI>" \
//        -H "Content-Type: application/json" \
//        -d '{"slug":"the-quiet-architecture","format":"ebook","path":"the-quiet-architecture.epub"}'
//
// The function:
//   1. Verifies the caller is an OWNER (via shared secret header).
//   2. Inserts/updates the `products` row.
//   3. Returns the storage path so the admin UI can confirm.
//
// We keep this as documentation only — actual deployment happens once a
// Supabase project is provisioned.

export {}; // module marker — no runtime code here.