"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { books } from "@/lib/catalog";

const INACTIVITY_MS = 10 * 60 * 1000;

export function BookAssistant() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [activeBook, setActiveBook] = useState(books[0]);
  const [locale, setLocale] = useState("en-US");
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const recommendations = useMemo(() => {
    return books.filter((book) => book.slug !== activeBook.slug && book.category === activeBook.category).slice(0, 2);
  }, [activeBook.slug, activeBook.category]);

  useEffect(() => {
    const showTimer = setTimeout(() => setOpen(true), 9000);
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

  function chooseBook(slug: string) {
    setActiveBook(books.find((book) => book.slug === slug) ?? books[0]);
    setOpen(true);
  }

  if (dismissed) return null;

  return (
    <aside className="fixed bottom-4 right-4 z-50" aria-label="Book assistant">
      {!open ? (
        <button type="button" onClick={() => setOpen(true)} className="group flex items-center gap-2 rounded-full border border-sky-200 bg-white/75 px-3 py-2 text-sm text-blue-deep shadow-[0_10px_30px_rgba(8,59,99,.12)] backdrop-blur hover:bg-white">
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-emerald-300 bg-gradient-to-br from-pink-50 via-white to-sky-50" aria-hidden="true">
            <svg viewBox="0 0 64 64" className="h-8 w-8 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="32" cy="22" r="9" fill="currentColor" opacity=".18" />
              <path d="M18 50c2-10 8-15 14-15s12 5 14 15" fill="currentColor" opacity=".14" />
              <path d="M23 18c2-6 14-7 18 1" strokeLinecap="round" />
            </svg>
          </span>
          <span className="whitespace-nowrap font-medium">What can I help you find?</span>
        </button>
      ) : (
        <section className="w-[min(350px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-sky-200 bg-white/95 shadow-[0_18px_55px_rgba(8,59,99,.2)] backdrop-blur" role="dialog" aria-modal="false">
          <div className="flex items-center justify-between gap-3 border-b border-sky-100 bg-sky-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-300 bg-white text-emerald-500" aria-hidden="true">✦</span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-sky-700">Book guide</p>
                <h2 className="text-sm font-semibold text-blue-deep">What are you looking for?</h2>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="text-lg leading-none text-slate hover:text-blue-deep" aria-label="Minimize assistant">×</button>
          </div>
          <div className="space-y-3 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs leading-5 text-slate">A quiet guide for choosing, comparing and discovering another useful title.</p>
              <select value={locale} onChange={(event) => setLocale(event.target.value)} className="shrink-0 border border-sky-200 bg-white px-2 py-1 text-[11px]" aria-label="Assistant language">
                <option value="en-US">English</option>
                <option value="uk-UA">Українська</option>
                <option value="pl-PL">Polski</option>
                <option value="de-DE">Deutsch</option>
                <option value="es-ES">Español</option>
                <option value="fr-FR">Français</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => chooseBook("a-small-book-of-routines")} className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-blue-deep hover:border-sky-300 hover:bg-sky-50">Something practical</button>
              <button type="button" onClick={() => chooseBook("letters-on-attention")} className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-blue-deep hover:border-sky-300 hover:bg-sky-50">Help me focus</button>
              <button type="button" onClick={() => chooseBook("the-house-you-live-in")} className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-blue-deep hover:border-sky-300 hover:bg-sky-50">For my home</button>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate">A starting point</p>
              <Link href={`/books/${activeBook.slug}`} className="mt-1 block text-sm font-semibold text-blue-deep hover:text-sky-700">{activeBook.title}</Link>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate">{activeBook.subtitle}</p>
            </div>
            {recommendations.length > 0 && (
              <div className="border-t border-slate-200 pt-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate">A gentle next suggestion</p>
                {recommendations.map((book) => <Link key={book.slug} href={`/books/${book.slug}`} className="mt-1 block text-xs font-semibold text-sky-700 hover:underline">{book.title} →</Link>)}
              </div>
            )}
          </div>
          <div className="border-t border-slate-100 px-4 py-2 text-[10px] text-slate">Closes after 10 minutes without activity.</div>
        </section>
      )}
    </aside>
  );
}
