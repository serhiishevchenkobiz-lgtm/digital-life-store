import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseRouteHandler } from "@/lib/supabase";

/**
 * Auth callback — completes the magic-link flow.
 *
 * Supabase redirects here with `?code=...` after the user clicks the email
 * link. We exchange the code for a session (Supabase sets the cookies via
 * @supabase/ssr), then redirect to `next` or the library.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/library";

  if (code) {
    const supabase = await getSupabaseRouteHandler();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    return NextResponse.redirect(
      `${origin}/account/sign-in?error=${encodeURIComponent(error.message)}`,
    );
  }

  return NextResponse.redirect(`${origin}/account/sign-in?error=missing_code`);
}