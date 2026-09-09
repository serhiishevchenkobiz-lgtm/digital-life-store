"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { books } from "@/lib/catalog";

const INACTIVITY_MS = 10 * 60 * 1000;

export function BookAssistant() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [activeBook, setActiveBook] = useState(books[0]);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const recommendations = useMemo(() => {
    return books.filter((book) => book.slug !== activeBook.slug && book.category === activeBook.category).slice(0, 2);
  }, [activeBook.slug, activeBook.category]);

  useEffect(() => {
    const showTimer = setTimeout(() => setOpen(true), 7000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!open || dismissed) return;
    const resetIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setOpen(false), INACTIVITY_MS);
    };
    resetIdle();
    window.addEventListener("pointerdown", resetIdle);
    window.addEventListener("keydown", resetIdle);
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      window.removeEventListener("pointerdown", resetIdle);
      window.removeEventListener("keydown", resetIdle);
    };
  }, [open, dismissed]);

  if (dismissed || !open) return null;

  return (
    <aside className="fixed bottom-4 right-4 z-50 w-[min(360px,calc(100vw-24px))] border border-sky-200 bg-white shadow-[0_16px_50px_rgba(8,59,99,.18)]" aria-label="Book assistant">
      <div className="border-b border-sky-100 bg-sky-50 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-700">Book guide</p>
            <h2 className="mt-1 text-sm font-semibold text-blue-deep">Looking for the right shelf?</h2>
          </div>
          <button type="button" onClick={() => setDismissed(true)} className="text-xs text-slate hover:text-blue-deep" aria-label="Close assistant">×</button>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <p className="text-xs leading-5 text-slate">Tell me what you&apos;re interested in and I&apos;ll help you compare nearby titles without interrupting your browsing.</p>
        <div className="flex flex-wrap gap-2">
          {["Something practical", "Help me focus", "A book for home"].map((label) => (
            <button key={label} type="button" onClick={() => {
              if (label === "Help me focus") setActiveBook(books.find((book) => book.slug === "letters-on-attention") ?? books[0]);
              if (label === "A book for home") setActiveBook(books.find((book) => book.slug === "the-house-you-live-in") ?? books[0]);
              if (label === "Something practical") setActiveBook(books.find((book) => book.slug === "a-small-book-of-routines") ?? books[0]);
            }} className="border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-blue-deep hover:border-sky-300 hover:bg-sky-50">
              {label}
            </button>
          ))}
        </div>
        <div className="border-t border-slate-200 pt-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate">A starting point</p>
          <Link href={`/books/${activeBook.slug}`} className="mt-1 block text-sm font-semibold text-blue-deep hover:text-sky-700">{activeBook.title}</Link>
          <p className="mt-1 text-xs leading-5 text-slate">{activeBook.subtitle}</p>
        </div>
        {recommendations.length > 0 && (
          <div className="space-y-1 border-t border-slate-200 pt-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate">You may also like</p>
            {recommendations.map((book) => <Link key={book.slug} href={`/books/${book.slug}`} className="block text-xs font-semibold text-sky-700 hover:underline">{book.title} →</Link>)}
          </div>
        )}
      </div>
    </aside>
  );
}
