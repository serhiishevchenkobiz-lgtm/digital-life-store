import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digitallifepress.com";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/library"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}