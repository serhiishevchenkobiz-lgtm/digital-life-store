import type { MetadataRoute } from "next";
import { books, getCategories } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digitallifepress.com";
  const lastModified = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    "",
    "/books",
    "/audio",
    "/categories",
    "/free-library",
    "/about",
    "/library",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));

  const bookUrls: MetadataRoute.Sitemap = books.map((b) => ({
    url: `${base}/books/${b.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = getCategories().map((category) => ({
    url: `${base}/categories/${category.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticUrls, ...categoryUrls, ...bookUrls];
}
