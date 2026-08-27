import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/produtos`, lastModified: now },
    { url: `${base}/categorias`, lastModified: now },
    { url: `${base}/buscar`, lastModified: now },
  ];

  const catRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/categoria/${c.slug}`,
    lastModified: now,
  }));

  const prodRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/produto/${p.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...catRoutes, ...prodRoutes];
}
