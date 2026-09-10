import Link from "next/link";
import { BookCover } from "@/components/book-cover";
import { Button } from "@/components/button";
import { formatPrice } from "@/lib/utils";
import type { Book } from "@/lib/catalog";

export function BookCard({ book }: { book: Book }) {
  const lowestPriceCents = Math.min(book.priceCents, book.audioPriceCents ?? book.priceCents, book.bundlePriceCents ?? book.priceCents);

  return (
    <article className="group min-w-0">
      <Link href={`/books/${book.slug}`} className="block" aria-label={`${book.title} — view details`}>
        <div className="book-tile">
          <BookCover palette={book.cover.palette} motif={book.cover.motif} spineLabel={book.cover.spineLabel} title={book.title} className="book-tile-cover origin-bottom group-hover:-translate-y-1.5" />
        </div>
      </Link>

      <div className="mt-4">
        <p className="text-[10px] font-bold uppercase tracking-[.13em] text-ink-muted">{book.category}</p>
        <h3 className="mt-1 font-display text-[21px] leading-tight tracking-[-.015em]">
          <Link href={`/books/${book.slug}`} className="hover:text-accent">{book.title}</Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-ink-soft">{book.subtitle}</p>
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-muted-line pt-3">
          <p className="tabular text-sm font-semibold text-ink">{formatPrice(lowestPriceCents)}</p>
          <Button href={`/books/${book.slug}`} variant="ghost" className="px-1.5 py-1.5 text-xs">View →</Button>
        </div>
      </div>
    </article>
  );
}
