"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { books } from "@/lib/catalog";

const INACTIVITY_MS = 10 * 60 * 1000;
const locales = ["EN", "UA", "PL", "DE", "ES", "FR"] as const;

export function BookAssistant() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [locale, setLocale] = useState<(typeof locales)[number]>("EN");
  const [question, setQuestion] = useState("");
  const [activeBook, setActiveBook] = useState(books[0]);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const recommendations = useMemo(() => books.filter((book) => book.slug !== activeBook.slug && book.category === activeBook.category).slice(0, 2), [activeBook]);

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

  if (dismissed) return null;

  return (
    <div className="book-assistant-root">
      {open && (
        <aside className="book-assistant-panel" aria-label="Book selection assistant">
          <div className="book-assistant-head"><div><p className="book-assistant-kicker">Book guide</p><h2>How can I help?</h2></div><button type="button" className="book-assistant-close" onClick={() => setOpen(false)} aria-label="Minimize assistant">−</button></div>
          <div className="book-assistant-body">
            <p className="book-assistant-copy">Ask about a topic, format, language or another book that may fit your reading.</p>
            <div className="book-assistant-locales" aria-label="Assistant language">{locales.map((item) => <button key={item} type="button" className={locale === item ? "active" : ""} onClick={() => setLocale(item)}>{item}</button>)}</div>
            <div className="book-assistant-prompts">{["Help me choose", "Something for focus", "Something for home"].map((label) => <button key={label} type="button" onClick={() => { const next = label === "Something for focus" ? books.find((book) => book.slug === "letters-on-attention") : label === "Something for home" ? books.find((book) => book.slug === "the-house-you-live-in") : books[0]; setActiveBook(next ?? books[0]); }}>{label}</button>)}</div>
            <form className="book-assistant-form" onSubmit={(event) => event.preventDefault()}><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a question…" aria-label="Ask the book assistant" /><button type="submit" aria-label="Send question">→</button></form>
            <div className="book-assistant-recommendation"><span>Suggested starting point</span><Link href={`/books/${activeBook.slug}`}>{activeBook.title}</Link><p>{activeBook.subtitle}</p>{recommendations.length > 0 && <small>More like this: {recommendations.map((book) => book.title).join(" · ")}</small>}</div>
          </div>
        </aside>
      )}
      <button type="button" className={`book-assistant-trigger${open ? " is-open" : ""}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Open book assistant"><span className="book-assistant-avatar"><img src="/art/assistant-avatar.svg" alt="" aria-hidden="true" /></span><span>How can I help?</span></button>
    </div>
  );
}
