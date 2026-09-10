import type { Metadata } from "next";
import Link from "next/link";
import { ShopToolbar } from "@/components/shop/shop-toolbar";
import { ProductGrid } from "@/components/product/product-grid";
import { Eyebrow } from "@/components/ui/badge";
import { getCategories, getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop all products",
  description: "Browse all ProHub mobile accessories — cables, chargers, power banks, audio and more.",
};

const PAGE_SIZE = 24;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      inStockOnly: searchParams.availability === "in",
      minPrice: searchParams.min ? Number(searchParams.min) : undefined,
      maxPrice: searchParams.max ? Number(searchParams.max) : undefined,
      sort: searchParams.sort,
    }),
  ]);

  let filtered = products;
  if (searchParams.availability === "out") filtered = products.filter((p) => !p.in_stock);

  const total = filtered.length;
  const paged = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paged.length < total;

  const qs = (p: number) => {
    const next = new URLSearchParams(searchParams as Record<string, string>);
    next.set("page", String(p));
    return `/shop?${next.toString()}`;
  };

  return (
    <div className="container section">
      <div className="mb-8">
        <Eyebrow>Shop</Eyebrow>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">All products</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Categories
          </h2>
          <ul className="mt-3 space-y-1">
            <li>
              <Link href="/shop" className="block rounded-lg px-2 py-1.5 text-sm font-medium text-brand">
                All products
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/shop/${c.slug}`}
                  className="block rounded-lg px-2 py-1.5 text-sm text-ink/80 hover:bg-surface"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          <ShopToolbar count={total} categories={categories} />
          <ProductGrid products={paged} />
          {hasMore && (
            <div className="mt-10 text-center">
              <Link
                href={qs(page + 1)}
                className="inline-flex h-11 items-center rounded-xl border border-ink px-6 text-sm font-medium hover:bg-ink hover:text-white"
              >
                Load more
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
