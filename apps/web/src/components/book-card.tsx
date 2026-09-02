import Link from "next/link";
import { BookCover } from "@/components/book-cover";
import { Button } from "@/components/button";
import { formatPrice } from "@/lib/utils";
import type { Book } from "@/lib/catalog";

export function BookCard({ book }: { book: Book }) {
  const lowestPriceCents = Math.min(
    book.priceCents,
    book.audioPriceCents ?? book.priceCents,
    book.bundlePriceCents ?? book.priceCents,
  );

  return (
    <article className="group flex flex-col gap-5">
      <Link href={`/books/${book.slug}`} className="block" aria-label={`${book.title} — view details`}>
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 -z-10 bg-paper-deep rounded-lg" aria-hidden />
          <BookCover
            palette={book.cover.palette}
            motif={book.cover.motif}
            spineLabel={book.cover.spineLabel}
            title={book.title}
            className="group-hover:-translate-y-1"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-2">
        <p className="eyebrow">{book.category}</p>
        <h3 className="font-display text-2xl leading-tight tracking-tight text-balance">
          <Link href={`/books/${book.slug}`} className="hover:text-accent transition-colors">
            {book.title}
          </Link>
        </h3>
        <p className="text-sm text-ink-soft leading-relaxed line-clamp-2">
          {book.subtitle}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <p className="tabular text-sm text-ink">
          From <span className="font-medium">{formatPrice(lowestPriceCents)}</span>
        </p>
        <Button href={`/books/${book.slug}`} variant="outline" className="px-4 py-2">
          View
        </Button>
      </div>
    </article>
  );
}