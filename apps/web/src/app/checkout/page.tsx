"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, removeItem, subtotalCents, discountCents, totalCents } = useCart();
  const booksNeeded = Math.max(0, 3 - items.length);

  return (
    <>
      <section className="border-b border-muted-line bg-night text-paper"><Container className="py-12 md:py-16"><p className="eyebrow eyebrow-light">Your basket</p><h1 className="mt-3 font-display text-display-xl">A good stack is taking shape.</h1></Container></section>
      <Container className="grid gap-10 py-10 md:py-14 lg:grid-cols-[1fr_380px]">
        <section aria-labelledby="basket-items">
          <div className="flex items-baseline justify-between gap-4 border-b border-muted-line pb-5"><h2 id="basket-items" className="font-display text-3xl">Your selections</h2><p className="text-sm text-ink-muted">{items.length} item{items.length === 1 ? "" : "s"}</p></div>
          {items.length === 0 ? (
            <div className="mt-8 border-l-4 border-accent bg-paper-deep p-7"><h3 className="font-display text-2xl">Your basket is ready for a first book.</h3><p className="mt-2 text-ink-soft">Choose a title, add a format, and return here whenever you&apos;re ready.</p><Link href="/books" className="mt-6 inline-flex bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-accent">Browse the catalogue</Link></div>
          ) : (
            <ul className="divide-y divide-muted-line">
              {items.map((item) => <li key={item.id} className="flex items-start justify-between gap-5 py-6"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{item.format === "ebook" ? "eBook · EPUB + PDF" : item.format === "audio" ? "Audio edition" : "Complete bundle"}</p><h3 className="mt-1 font-display text-2xl">{item.book.title}</h3><p className="mt-1 text-sm text-ink-soft">{item.book.subtitle}</p><button type="button" onClick={() => removeItem(item.id)} className="mt-3 text-sm font-semibold text-accent hover:text-accent-deep">Remove</button></div><p className="shrink-0 font-display text-xl">{formatPrice(item.priceCents)}</p></li>)}
            </ul>
          )}
        </section>
        <aside className="h-fit border border-muted-line bg-paper-bright p-6 md:p-8" aria-label="Order summary">
          <p className="eyebrow">Order summary</p>
          <dl className="mt-6 space-y-4 text-sm"><div className="flex justify-between gap-4"><dt className="text-ink-soft">Subtotal</dt><dd>{formatPrice(subtotalCents)}</dd></div>{discountCents > 0 && <div className="flex justify-between gap-4 text-accent"><dt>Three-book saving</dt><dd>−{formatPrice(discountCents)}</dd></div>}<div className="flex justify-between gap-4 border-t border-muted-line pt-4 font-semibold"><dt>Total</dt><dd className="font-display text-2xl">{formatPrice(totalCents)}</dd></div></dl>
          {items.length < 3 && items.length > 0 && <div className="mt-6 border-l-2 border-accent bg-paper-deep px-4 py-3 text-sm leading-6 text-ink-soft">Add {booksNeeded} more book{booksNeeded === 1 ? "" : "s"} to unlock 10% off your whole basket.</div>}
          <button type="button" disabled className="mt-7 w-full bg-ink px-5 py-3 text-sm font-semibold text-paper disabled:cursor-not-allowed disabled:opacity-45">Secure checkout coming soon</button>
          <p className="mt-4 text-xs leading-5 text-ink-muted">Checkout is awaiting the approved payment-provider connection. Prices, formats, and the three-book saving are calculated in this local basket.</p>
        </aside>
      </Container>
    </>
  );
}
