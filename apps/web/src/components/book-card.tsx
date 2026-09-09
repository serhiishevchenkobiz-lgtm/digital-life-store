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
    <article className="group flex min-w-0 flex-col gap-4">
      <Link href={`/books/${book.slug}`} className="block" aria-label={`${book.title} — view details`}>
        <div className="relative overflow-visible rounded-sm bg-paper-deep p-3 sm:p-4">
          <div className="absolute inset-x-5 bottom-1 h-3 bg-ink/15 blur-lg" aria-hidden />
          <BookCover
            palette={book.cover.palette}
            motif={book.cover.motif}
            spineLabel={book.cover.spineLabel}
            title={book.title}
            className="relative z-10 origin-bottom group-hover:-translate-y-2 group-hover:rotate-[-1deg]"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-1.5">
        <p className="eyebrow">{book.category}</p>
        <h3 className="font-display text-xl leading-tight tracking-tight text-balance sm:text-2xl">
          <Link href={`/books/${book.slug}`} className="hover:text-accent transition-colors">
            {book.title}
          </Link>
        </h3>
        <p className="text-sm text-ink-soft leading-relaxed line-clamp-2">
          {book.subtitle}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-muted-line pt-3">
        <p className="tabular text-sm text-ink">
          From <span className="font-medium">{formatPrice(lowestPriceCents)}</span>
        </p>
        <Button href={`/books/${book.slug}`} variant="ghost" className="px-2 py-2">
          Details →
        </Button>
      </div>
    </article>
  );
}
