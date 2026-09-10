import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { Eyebrow } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { getCategories, getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description: "Browse the full ProHub Technologies product catalogue by category.",
};

export default async function CataloguePage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <div className="container section">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Catalogue</Eyebrow>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Product catalogue</h1>
        </div>
        <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-ink px-5 text-sm font-medium hover:bg-ink hover:text-white">
          <Download className="h-4 w-4" />
          Download PDF
        </button>
      </div>

      <div className="mt-10 space-y-12">
        {categories.map((cat) => {
          const items = products.filter((p) => p.category?.slug === cat.slug);
          if (!items.length) return null;
          return (
            <section key={cat.id}>
              <h2 className="border-b border-border pb-2 font-display text-xl font-semibold">
                {cat.name}
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted">
                      <th className="py-2 font-medium">Product</th>
                      <th className="py-2 font-medium">SKU</th>
                      <th className="py-2 font-medium">Price</th>
                      <th className="py-2 font-medium">Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((p) => (
                      <tr key={p.id} className="border-t border-border">
                        <td className="py-2.5">
                          <Link href={`/product/${p.slug}`} className="font-medium hover:text-brand">
                            {p.title}
                          </Link>
                        </td>
                        <td className="py-2.5 text-muted">{p.sku}</td>
                        <td className="py-2.5">{formatPrice(p.price)}</td>
                        <td className="py-2.5">
                          {p.in_stock ? (
                            <span className="text-success">In stock</span>
                          ) : (
                            <span className="text-sale">Sold out</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
