import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24 md:py-32 max-w-2xl">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-display-xl text-balance">
        That page is not on the shelf.
      </h1>
      <p className="mt-4 text-lg text-ink-soft leading-relaxed">
        The link may be old, or the page may have been moved. Try the
        catalogue, or return to the homepage.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-ink text-paper px-5 py-3 text-sm font-medium hover:bg-ink-soft transition-colors"
        >
          Back home
        </Link>
        <Link
          href="/books"
          className="inline-flex items-center rounded-md border border-ink/15 bg-paper-bright px-5 py-3 text-sm font-medium hover:border-ink/40 transition-colors"
        >
          Browse books
        </Link>
      </div>
    </Container>
  );
}