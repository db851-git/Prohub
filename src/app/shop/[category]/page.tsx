import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShopToolbar } from "@/components/shop/shop-toolbar";
import { ProductGrid } from "@/components/product/product-grid";
import { Eyebrow } from "@/components/ui/badge";
import { getCategories, getCategoryBySlug, getProducts } from "@/lib/data";

export async function generateStaticParams() {
  const cats = await getCategories();
  return cats.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const cat = await getCategoryBySlug(params.category);
  if (!cat) return { title: "Category" };
  return {
    title: cat.name,
    description: cat.description ?? `Shop ${cat.name} from ProHub Technologies.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: Record<string, string | undefined>;
}) {
  const category = await getCategoryBySlug(params.category);
  if (!category) notFound();

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      categorySlug: params.category,
      inStockOnly: searchParams.availability === "in",
      minPrice: searchParams.min ? Number(searchParams.min) : undefined,
      maxPrice: searchParams.max ? Number(searchParams.max) : undefined,
      sort: searchParams.sort,
    }),
  ]);

  let filtered = products;
  if (searchParams.availability === "out") filtered = products.filter((p) => !p.in_stock);

  return (
    <div className="container section">
      <div className="mb-8">
        <Eyebrow>Category</Eyebrow>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">{category.name}</h1>
        {category.description && (
          <p className="mt-2 max-w-2xl text-muted">{category.description}</p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Categories
          </h2>
          <ul className="mt-3 space-y-1">
            <li>
              <Link href="/shop" className="block rounded-lg px-2 py-1.5 text-sm text-ink/80 hover:bg-surface">
                All products
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/shop/${c.slug}`}
                  className={`block rounded-lg px-2 py-1.5 text-sm hover:bg-surface ${
                    c.slug === params.category ? "font-medium text-brand" : "text-ink/80"
                  }`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          <ShopToolbar count={filtered.length} categories={categories} />
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}
