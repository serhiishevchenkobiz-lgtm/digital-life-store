import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartProvider } from "@/components/cart-provider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digitallifepress.com";

export const viewport: Viewport = {
  themeColor: "#F6F2EA",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Digital Life Press — Premium digital publishing for a calmer, more capable life",
    template: "%s — Digital Life Press",
  },
  description:
    "Thoughtfully written eBooks, audio editions, and practical guides. Editorial quality, designed for everyday life.",
  applicationName: "Digital Life Press",
  authors: [{ name: "Digital Life Press" }],
  keywords: [
    "ebooks",
    "audiobooks",
    "self-improvement",
    "lifestyle",
    "personal development",
    "editorial",
  ],
  openGraph: {
    type: "website",
    siteName: "Digital Life Press",
    locale: "en_US",
    url: siteUrl,
    title: "Digital Life Press",
    description:
      "Thoughtfully written eBooks, audio editions, and practical guides.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Life Press",
    description:
      "Thoughtfully written eBooks, audio editions, and practical guides.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "uk-UA": "/uk",
      "de-DE": "/de",
      "es-ES": "/es",
      "fr-FR": "/fr",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:text-paper focus:px-3 focus:py-2 focus:rounded-md"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
