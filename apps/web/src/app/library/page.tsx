import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "My Library",
  description:
    "Your purchased books, audio editions and reading progress. Sign in to access your library.",
};

export default function LibraryPage() {
  return (
    <Container className="py-14 md:py-24">
      <div className="max-w-3xl">
        <p className="eyebrow">My Library</p>
        <h1 className="mt-4 font-display text-display-xl text-balance">
          Sign in to see your books.
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          Your library is where every Digital Life Press purchase lives — the
          eBook, the audio, the worksheets. Sign in with the email you used at
          checkout and we&apos;ll send you a one-tap magic link.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/account/sign-in">Sign in</Button>
          <Button href="/books" variant="outline">
            Browse the catalogue
          </Button>
        </div>

        <div className="rule mt-16" />

        <section className="mt-10">
          <p className="eyebrow">What you&apos;ll find here</p>
          <ul className="mt-6 space-y-3 text-ink-soft">
            {[
              "Download EPUB, PDF, MP3 and M4B — regenerable at any time.",
              "Reading progress and bookmark sync across devices.",
              "Companion worksheets for every title you own.",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ink-muted">
            Don&apos;t have an account yet?{" "}
            <Link href="/books" className="underline underline-offset-4">
              Pick something from the catalogue
            </Link>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}