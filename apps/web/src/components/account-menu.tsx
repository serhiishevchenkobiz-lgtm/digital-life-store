"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { isSupabaseConfigured } from "@/lib/supabase-env";

interface UserState {
  email: string | undefined;
}

/**
 * Client island that shows the user's email (and a sign-out action button) when
 * signed in, or a sign-in link otherwise. Renders nothing until mounted to
 * avoid hydration mismatch.
 */
export function AccountMenu() {
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = getSupabaseBrowser();
    let cancelled = false;

    supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      setState({ email: data.user?.email });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ email: session?.user?.email });
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (!state) {
    return (
      <Link
        href="/account/sign-in"
        className="hidden sm:inline-flex text-sm text-ink-soft hover:text-ink transition-colors"
      >
        My Library
      </Link>
    );
  }

  if (!state.email) {
    return (
      <Link
        href="/account/sign-in"
        className="hidden sm:inline-flex text-sm text-ink-soft hover:text-ink transition-colors"
      >
        My Library
      </Link>
    );
  }

  return (
    <Link
      href="/library"
      className="hidden sm:inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors"
      aria-label={`Signed in as ${state.email} — open library`}
    >
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="max-w-[12ch] truncate">{state.email}</span>
    </Link>
  );
}