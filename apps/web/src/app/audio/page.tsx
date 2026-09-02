import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { BookCover } from "@/components/book-cover";
import { books } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Audio",
  description:
    "Audio editions of every Digital Life Press title. Human-narrated at a humane pace.",
};

export default function AudioPage() {
  const audioBooks = books.filter((b) => b.formats.includes("audio") && b.audioPriceCents);

  return (
    <Container className="py-14 md:py-20">
      <header className="max-w-3xl">
        <p className="eyebrow">Audio</p>
        <h1 className="mt-4 font-display text-display-xl text-balance">
          Every book, read by a human voice.
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          Our audio editions are narrated at a calm, low-arousal pace by a
          single voice you can recognise. Delivered as MP3 chapter files and
          M4B. No AI narration for paid editions.
        </p>
      </header>

      <section id="samples" className="mt-12">
        <p className="eyebrow">Listen first</p>
        <h2 className="mt-3 font-display text-3xl">Free samples</h2>
        <ul className="mt-6 grid gap-3">
          {audioBooks.map((b) => (
            <li
              key={b.slug}
              className="flex items-center justify-between gap-4 rounded-lg border border-muted-line bg-paper-bright px-5 py-4"
            >
              <div>
                <p className="font-display text-xl">{b.title}</p>
                <p className="text-sm text-ink-muted">
                  {b.audioSampleMinutes} minute sample · read by the editorial voice
                </p>
              </div>
              <Link href={`/books/${b.slug}`} className="text-sm underline-offset-4 hover:underline">
                Listen →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <p className="eyebrow">The catalogue</p>
        <h2 className="mt-3 font-display text-3xl">Audio editions</h2>
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {audioBooks.map((b) => (
            <li key={b.slug} className="flex flex-col gap-4">
              <div className="w-40">
                <BookCover
                  palette={b.cover.palette}
                  motif={b.cover.motif}
                  spineLabel={b.cover.spineLabel}
                  title={b.title}
                />
              </div>
              <div>
                <p className="font-display text-xl">{b.title}</p>
                <p className="text-sm text-ink-muted tabular">
                  {formatPrice(b.audioPriceCents ?? 0)}
                </p>
                <Link href={`/books/${b.slug}`} className="mt-2 inline-block text-sm underline-offset-4 hover:underline">
                  View edition →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}