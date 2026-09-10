import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/product-grid";
import { Eyebrow } from "@/components/ui/badge";
import { getProducts } from "@/lib/data";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q ?? "";
  const products = q ? await getProducts({ search: q }) : [];

  return (
    <div className="container section">
      <Eyebrow>Search</Eyebrow>
      <h1 className="mt-2 text-3xl font-bold">
        {q ? `Results for “${q}”` : "Search products"}
      </h1>
      {q ? (
        <>
          <p className="mt-2 text-muted">{products.length} products found</p>
          <div className="mt-8">
            <ProductGrid products={products} />
          </div>
        </>
      ) : (
        <p className="mt-4 text-muted">Type a query to search our catalogue.</p>
      )}
    </div>
  );
}
