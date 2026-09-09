import Link from "next/link";
import { Container } from "@/components/container";

const serviceBlocks = [
  ["About the Press", "Who we are and how we publish.", "/about"],
  ["Reader devices", "Reading options for phone, tablet and desktop.", "/help"],
  ["Read online", "Open supported books in your browser.", "/library"],
  ["Troubleshooting", "Help with downloads, accounts and orders.", "/help"],
  ["Book formats", "Compare ebook, audio and bundle editions.", "/books"],
  ["FAQs", "Common questions about buying and reading.", "/help"],
  ["Reader software", "Guides for supported reading apps.", "/help"],
  ["Contact", "Get in touch with Digital Life Press.", "/contact"],
] as const;

const columns = [
  { title: "Introduction", links: [["How this works", "/about"], ["Getting started", "/free-library"], ["What is an ebook?", "/help"], ["About the Press", "/about"]] },
  { title: "Purchasing", links: [["Browse books", "/books"], ["Gift certificates", "/gifts"], ["Book formats", "/books"], ["My library", "/library"]] },
  { title: "Legal", links: [["Privacy", "/privacy"], ["Accessibility", "/accessibility"], ["Terms of use", "/terms"], ["Licenses", "/licenses"]] },
  { title: "More", links: [["For authors", "/authors"], ["For publishers", "/publishers"], ["Our blog", "/blog"], ["Feedback", "/feedback"]] },
];

export function SiteFooter() {
  return (
    <footer className="classic-footer mt-8">
      <Container>
        <div className="footer-service-grid">
          {serviceBlocks.map(([title, text, href]) => (
            <Link href={href} className="footer-service" key={title}>
              <span className="footer-service-icon" aria-hidden="true">◈</span>
              <span><strong>{title}</strong><small>{text}</small></span>
            </Link>
          ))}
        </div>
      </Container>

      <div className="footer-dark">
        <Container className="footer-dark-inner">
          <div>
            <Link href="/" className="site-logo text-[31px] text-white">eBooks<span className="text-logo-green">Press</span></Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/75">An independent digital bookstore for useful ideas, thoughtful reading and books you can keep close.</p>
          </div>
          <div className="footer-columns">
            {columns.map((column) => (
              <div key={column.title}><h2>{column.title}</h2>{column.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>
            ))}
          </div>
        </Container>
        <Container className="footer-legal">
          <p>© {new Date().getFullYear()} Digital Life Press · Digital delivery worldwide</p>
          <nav aria-label="Legal links">{[["Privacy", "/privacy"], ["Accessibility", "/accessibility"], ["Copyright", "/copyright"], ["Terms", "/terms"], ["Affiliates", "/affiliates"]].map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
        </Container>
      </div>
    </footer>
  );
}
