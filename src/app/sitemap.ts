import type { MetadataRoute } from "next";
import { getCategories, getProducts } from "@/lib/data";
import { policySlugs } from "@/lib/policies";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const staticPaths = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/support",
    "/distributor",
    "/complaints",
    "/catalogue",
    "/cart",
  ];

  return [
    ...staticPaths.map((p) => ({ url: `${base}${p}`, lastModified: new Date() })),
    ...categories.map((c) => ({ url: `${base}/shop/${c.slug}`, lastModified: new Date() })),
    ...products.map((p) => ({ url: `${base}/product/${p.slug}`, lastModified: new Date() })),
    ...policySlugs.map((s) => ({ url: `${base}/policies/${s}`, lastModified: new Date() })),
  ];
}
