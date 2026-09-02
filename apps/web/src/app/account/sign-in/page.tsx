"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { isSupabaseConfigured } from "@/lib/supabase-env";

type State = "idle" | "sending" | "sent" | "error";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setState("sending");

    if (!isSupabaseConfigured()) {
      setError(
        "Sign-in is not configured in this environment. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in apps/web/.env.local.",
      );
      setState("error");
      return;
    }

    const supabase = getSupabaseBrowser();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=/library`,
      },
    });

    if (signInError) {
      setError(signInError.message);
      setState("error");
      return;
    }
    setState("sent");
  }

  return (
    <Container className="py-14 md:py-24 max-w-xl">
      <p className="eyebrow">Account</p>
      <h1 className="mt-4 font-display text-display-xl text-balance">
        Sign in to your library.
      </h1>
      <p className="mt-4 text-ink-soft leading-relaxed">
        Enter your email and we&apos;ll send you a one-tap magic link — no
        passwords to remember. The link expires after one hour.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 rounded-xl border border-muted-line bg-paper-bright p-6 md:p-8"
      >
        <label htmlFor="email" className="block">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-muted">
            Email address
          </span>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-md border border-muted-line bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none transition-colors"
            placeholder="you@example.com"
            aria-describedby={error ? "email-error" : undefined}
          />
        </label>

        {error && (
          <p id="email-error" role="alert" className="mt-3 text-sm text-accent">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="submit" className="disabled:opacity-60" >
            {state === "sending" ? "Sending…" : "Send magic link"}
          </Button>
          <p className="text-xs text-ink-muted">
            One email, no password, no tracking pixels.
          </p>
        </div>

        {state === "sent" && (
          <p
            role="status"
            className="mt-6 rounded-md border border-ink/15 bg-paper px-4 py-3 text-sm text-ink-soft"
          >
            Check your inbox. We sent a sign-in link to{" "}
            <strong className="text-ink">{email}</strong>.
          </p>
        )}
      </form>
    </Container>
  );
}