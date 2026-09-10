import Link from "next/link";
import { Container } from "@/components/container";

const columns = [
  { title: "Discover", links: [["Browse books", "/books"], ["Full Book", "/full-book"], ["Categories", "/categories"], ["Free library", "/free-library"], ["Gift certificates", "/gifts"]] },
  { title: "Read & Buy", links: [["My library", "/library"], ["Wishlist", "/wishlist"], ["Book formats", "/books"], ["How it works", "/about"], ["Help", "/help"]] },
  { title: "About", links: [["About the shop", "/about"], ["For authors", "/authors"], ["For publishers", "/publishers"], ["Our blog", "/blog"], ["Feedback", "/feedback"]] },
  { title: "Legal", links: [["Privacy", "/privacy"], ["Accessibility", "/accessibility"], ["Terms", "/terms"], ["Copyright", "/copyright"], ["Licenses", "/licenses"]] },
];

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t-4 border-emerald-300 bg-slate-50 text-blue-deep">
      <Container>
        <section className="grid gap-4 py-5 md:grid-cols-3" aria-label="Reader services">
          <Link href="/free-library" className="rounded-xl border border-sky-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Start reading</span>
            <h2 className="mt-1 text-lg font-semibold">Begin with a free read</h2>
            <p className="mt-1 text-sm leading-5 text-slate">Discover the shop before choosing your next paid title.</p>
          </Link>
          <Link href="/contact" className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Need a hand?</span>
            <h2 className="mt-1 text-lg font-semibold">Talk to us</h2>
            <p className="mt-1 text-sm leading-5 text-slate">Questions about books, purchases, access or reading.</p>
          </Link>
          <Link href="/blog" className="rounded-xl border border-amber-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Keep exploring</span>
            <h2 className="mt-1 text-lg font-semibold">Ideas beyond the shelf</h2>
            <p className="mt-1 text-sm leading-5 text-slate">Notes, guides and useful reading from the editorial desk.</p>
          </Link>
        </section>
      </Container>

      <div className="bg-blue-deep text-white">
        <Container className="grid gap-8 py-8 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Link href="/" className="site-logo text-[36px] leading-none text-white sm:text-[42px]">Book<span className="text-emerald-300">haven</span></Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">An independent digital bookstore for thoughtful reading, useful ideas and books designed to stay close.</p>
            <div className="mt-5 flex items-center gap-2" aria-label="Social media">
              <a href="#social-instagram" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-sm font-bold hover:border-white hover:bg-white/10">◎</a>
              <a href="#social-facebook" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-sm font-bold hover:border-white hover:bg-white/10">f</a>
              <a href="#social-pinterest" aria-label="Pinterest" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-sm font-bold hover:border-white hover:bg-white/10">P</a>
              <a href="#social-x" aria-label="X" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-sm font-bold hover:border-white hover:bg-white/10">X</a>
              <a href="#social-youtube" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-sm font-bold hover:border-white hover:bg-white/10">▶</a>
            </div>
            <p className="mt-3 text-[11px] text-white/50">Social destinations are placeholders until the real business profile URLs are approved.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-emerald-200">{column.title}</h2>
                <div className="mt-3 space-y-2 text-sm text-white/75">
                  {column.links.map(([label, href]) => <Link href={href} key={href} className="block hover:text-white hover:underline">{label}</Link>)}
                </div>
              </div>
            ))}
          </div>
        </Container>
        <Container className="flex flex-col gap-2 border-t border-white/10 py-4 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bookhaven · Digital delivery worldwide</p>
          <p>EN-US is the canonical editorial language.</p>
        </Container>
      </div>
    </footer>
  );
}
