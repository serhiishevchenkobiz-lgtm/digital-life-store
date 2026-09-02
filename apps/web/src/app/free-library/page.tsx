import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Free Library",
  description:
    "Three opening chapters and printable worksheets — free to read, print and keep.",
};

const freeItems = [
  {
    title: "The Quiet Architecture — Chapter I",
    type: "Opening chapter",
    blurb:
      "Read the opening chapter of our flagship book on building daily systems that hold you.",
  },
  {
    title: "Letters on Attention — Letters I–III",
    type: "Three opening letters",
    blurb:
      "Three short essays on attention, originally published as a free serial.",
  },
  {
    title: "The Weekly Reflection Worksheet",
    type: "Printable PDF",
    blurb:
      "A printable one-page worksheet for end-of-week reflection. Designed for A4 and US Letter.",
  },
];

export default function FreeLibraryPage() {
  return (
    <Container className="py-14 md:py-24">
      <header className="max-w-3xl">
        <p className="eyebrow">Free Library</p>
        <h1 className="mt-4 font-display text-display-xl text-balance">
          A small, free shelf.
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          No email wall. No newsletter pitch. Three opening chapters and a
          printable worksheet — to read, to print, to keep. We hope one of
          them earns the next hour of your evening.
        </p>
      </header>

      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {freeItems.map((item) => (
          <li
            key={item.title}
            className="rounded-xl border border-muted-line bg-paper-bright p-6 md:p-8"
          >
            <p className="eyebrow">{item.type}</p>
            <h2 className="mt-4 font-display text-2xl text-balance">{item.title}</h2>
            <p className="mt-3 text-ink-soft leading-relaxed">{item.blurb}</p>
            <Link
              href="#"
              className="mt-6 inline-flex items-center text-sm text-ink underline-offset-4 hover:underline"
            >
              Open & download
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}