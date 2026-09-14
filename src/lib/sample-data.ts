import type { Category, Product } from "./types";
import catalogue from "./monarch-catalogue.json";

/**
 * Local data built from the real Monarch Gadgets catalogue
 * (src/lib/monarch-catalogue.json). Used when Supabase env vars are not
 * configured, so the site renders the full real catalogue out of the box.
 * The same JSON is the source for supabase/import_monarch.sql.
 */

export const sampleCategories: Category[] = [
  { id: "c1", name: "Charging Cables", slug: "charging-cables", description: "Fast, braided and durable cables for every device.", image_url: null, sort_order: 1 },
  { id: "c2", name: "Wall & Car Chargers", slug: "wall-car-chargers", description: "GaN wall chargers, car adapters and wireless pads that charge fast and stay cool.", image_url: null, sort_order: 2 },
  { id: "c3", name: "Power Banks", slug: "power-banks", description: "Portable power for phones, tablets and laptops.", image_url: null, sort_order: 3 },
  { id: "c4", name: "Audio", slug: "audio", description: "Speakers, earbuds and headphones tuned for everyday listening.", image_url: null, sort_order: 4 },
  { id: "c5", name: "Mounts & Holders", slug: "mounts-holders", description: "Keep your devices steady at the desk and on the road.", image_url: null, sort_order: 5 },
  { id: "c6", name: "Hubs & Adapters", slug: "hubs-adapters", description: "Expand your ports and connect everything.", image_url: null, sort_order: 6 },
  { id: "c7", name: "Smart Accessories", slug: "smart-accessories", description: "Smart gadgets and handy extras that make life easier.", image_url: null, sort_order: 7 },
];

type CatalogueItem = {
  title: string;
  slug: string;
  cat: string;
  price: number;
  compareAt: number | null;
  sku: string;
  stock: number;
  isNew: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  image: string;
  description: string;
};

const items = catalogue as CatalogueItem[];

export const sampleProducts: Product[] = items.map((p, idx) => {
  const category = sampleCategories.find((c) => c.slug === p.cat) ?? null;
  return {
    id: p.slug,
    title: p.title,
    slug: p.slug,
    description: p.description,
    specifications: {
      Brand: "Monarch Gadgets",
      Warranty: "2 years",
      SKU: p.sku || "—",
    },
    category_id: category?.id ?? null,
    category,
    brand: "Monarch Gadgets",
    price: p.price,
    compare_at_price: p.compareAt,
    currency: "GBP",
    sku: p.sku || null,
    stock: p.stock,
    in_stock: p.stock > 0,
    is_new: p.isNew,
    is_bestseller: p.isBestseller,
    is_featured: p.isFeatured,
    rating: 4.6,
    review_count: 20 + ((idx * 7) % 180),
    created_at: new Date(Date.now() - idx * 86400000).toISOString(),
    product_images: [
      { id: `img-${p.slug}`, product_id: p.slug, url: p.image, alt: `${p.title} product photo`, sort_order: 0 },
    ],
    product_variants: [],
  };
});
