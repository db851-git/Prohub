import { createClient } from "./supabase/server";
import { sampleCategories, sampleProducts } from "./sample-data";
import type { Category, Product } from "./types";

export function supabaseConfigured() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
  );
}

const PRODUCT_SELECT =
  "*, category:categories(*), product_images(*), product_variants(*)";

export async function getCategories(): Promise<Category[]> {
  if (!supabaseConfigured()) return sampleCategories;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return sampleCategories;
    return data as Category[];
  } catch {
    return sampleCategories;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cats = await getCategories();
  return cats.find((c) => c.slug === slug) ?? null;
}

export type ProductQuery = {
  categorySlug?: string;
  inStockOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  sort?: string;
  search?: string;
};

export async function getProducts(q: ProductQuery = {}): Promise<Product[]> {
  let products: Product[];

  if (!supabaseConfigured()) {
    products = [...sampleProducts];
  } else {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select(PRODUCT_SELECT);
      products = error || !data ? [...sampleProducts] : (data as Product[]);
    } catch {
      products = [...sampleProducts];
    }
  }

  // Filtering (applied uniformly for both sources)
  if (q.categorySlug) {
    products = products.filter((p) => p.category?.slug === q.categorySlug);
  }
  if (q.inStockOnly) products = products.filter((p) => p.in_stock);
  if (typeof q.minPrice === "number")
    products = products.filter((p) => p.price >= q.minPrice!);
  if (typeof q.maxPrice === "number")
    products = products.filter((p) => p.price <= q.maxPrice!);
  if (q.brand) products = products.filter((p) => p.brand === q.brand);
  if (q.search) {
    const s = q.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.description?.toLowerCase().includes(s) ||
        p.category?.name.toLowerCase().includes(s)
    );
  }

  switch (q.sort) {
    case "price-asc":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      products.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      products.sort(
        (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
      );
      break;
    case "az":
      products.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "bestselling":
      products.sort((a, b) => Number(b.is_bestseller) - Number(a.is_bestseller));
      break;
    default: // featured
      products.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
  }

  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!supabaseConfigured()) {
    return sampleProducts.find((p) => p.slug === slug) ?? null;
  }
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("slug", slug)
      .single();
    if (error || !data) return sampleProducts.find((p) => p.slug === slug) ?? null;
    return data as Product;
  } catch {
    return sampleProducts.find((p) => p.slug === slug) ?? null;
  }
}

export async function getFeatured(
  flag: "is_new" | "is_bestseller" | "is_featured",
  limit = 4
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p[flag]).slice(0, limit);
}

export async function getRelated(product: Product, limit = 4): Promise<Product[]> {
  const products = await getProducts();
  return products
    .filter((p) => p.id !== product.id && p.category?.slug === product.category?.slug)
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return sampleProducts.map((p) => p.slug);
}
