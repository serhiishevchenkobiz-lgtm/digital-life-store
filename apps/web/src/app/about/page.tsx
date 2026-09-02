import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Digital Life Press — a small editorial house for digital books and audio, made carefully.",
};

export default function AboutPage() {
  return (
    <Container className="py-14 md:py-24 max-w-3xl">
      <p className="eyebrow">About</p>
      <h1 className="mt-4 font-display text-display-xl text-balance">
        A small press for books and audio that respect your time.
      </h1>

      <div className="mt-8 prose-editorial space-y-5 text-lg">
        <p>
          Digital Life Press publishes short, well-edited digital books and
          audio editions on the everyday practice of living — work, attention,
          home, routines, reading, rest. Every title is treated as a small
          object: written, edited, designed and narrated by hand.
        </p>
        <p>
          We believe the best publishing has always been slow. We release four
          to six titles a year. We narrate our audio editions ourselves rather
          than outsourcing them to a synthetic voice. We ship companion
          worksheets as printable PDFs because books work better with a
          pencil.
        </p>
        <p>
          We do not chase scale, and we do not chase algorithms. We make things
          we would want to read, listen to and keep — and we try to make them
          honestly priced, honestly described and honestly delivered.
        </p>
      </div>

      <div className="rule mt-12" />

      <section className="mt-12">
        <p className="eyebrow">Editorial Standards</p>
        <ul className="mt-6 space-y-4">
          {[
            "Every manuscript passes through at least two human editorial passes before release.",
            "Fact-checking is its own step — never folded into copyediting.",
            "Audio is narrated by a human voice at a humane tempo. No AI narration for paid editions.",
            "Covers are illustrated in-house or commissioned; no generic stock.",
            "Accessibility: WCAG 2.2 AA across all reader pages and downloads.",
          ].map((line) => (
            <li key={line} className="flex gap-4 text-ink-soft leading-relaxed">
              <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16">
        <Button href="/books" variant="outline">
          Browse the catalogue
        </Button>
      </div>
    </Container>
  );
}