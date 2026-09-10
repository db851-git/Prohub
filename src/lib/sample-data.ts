import type { Category, Product } from "./types";

/**
 * Local fallback data. Used when Supabase env vars are not configured, so the
 * site renders a full demo out of the box. Mirrors supabase/seed.sql.
 */

export const sampleCategories: Category[] = [
  { id: "c1", name: "Charging Cables", slug: "charging-cables", description: "Fast, braided and durable cables for every device.", image_url: null, sort_order: 1 },
  { id: "c2", name: "Wall & Car Chargers", slug: "wall-car-chargers", description: "GaN wall chargers and car adapters that charge fast and stay cool.", image_url: null, sort_order: 2 },
  { id: "c3", name: "Power Banks", slug: "power-banks", description: "Portable power for phones, tablets and laptops.", image_url: null, sort_order: 3 },
  { id: "c4", name: "Audio", slug: "audio", description: "Speakers and earphones tuned for everyday listening.", image_url: null, sort_order: 4 },
  { id: "c5", name: "Mounts & Holders", slug: "mounts-holders", description: "Keep your devices steady at the desk and on the road.", image_url: null, sort_order: 5 },
  { id: "c6", name: "Hubs & Adapters", slug: "hubs-adapters", description: "Expand your ports and connect everything.", image_url: null, sort_order: 6 },
  { id: "c7", name: "Smart Accessories", slug: "smart-accessories", description: "Smart gadgets that make life easier.", image_url: null, sort_order: 7 },
];

function img(seed: string, alt: string) {
  return {
    id: `img-${seed}`,
    product_id: seed,
    url: `https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&w=900&q=80`,
    alt,
    sort_order: 0,
  };
}

type P = Omit<Product, "in_stock" | "product_images"> & { catSlug: string };

const raw: P[] = [
  mk("USB-C to USB-C 100W Cable 2m", "c1", 14.99, 19.99, 120, { is_bestseller: true }),
  mk("Lightning to USB-C Fast Cable 1.2m", "c1", 12.99, null, 80, { is_new: true }),
  mk("Braided USB-C to USB-A 1m", "c1", 7.99, 9.99, 200, {}),
  mk("Nylon USB-C to USB-C 0.3m (2-Pack)", "c1", 9.99, null, 0, {}),
  mk("20W USB-C Wall Charger (UK)", "c2", 16.99, null, 150, { is_bestseller: true }),
  mk("65W GaN Dual-Port Charger", "c2", 39.99, 49.99, 60, { is_new: true, is_featured: true }),
  mk("3.4A Dual Car Charger", "c2", 13.99, null, 90, {}),
  mk("100W GaN 4-Port Desktop Charger", "c2", 59.99, 69.99, 25, {}),
  mk("10,000mAh Power Bank", "c3", 24.99, 29.99, 140, { is_bestseller: true }),
  mk("10,000mAh Wireless MagCharge Bank", "c3", 39.99, null, 70, { is_new: true }),
  mk("5,000mAh Slim Power Bank", "c3", 19.99, null, 110, {}),
  mk("20,000mAh 65W Laptop Power Bank", "c3", 64.99, 79.99, 0, { is_featured: true }),
  mk("Bubble Bluetooth Speaker", "c4", 34.99, 44.99, 55, { is_bestseller: true }),
  mk("Compact TWS Earbuds", "c4", 29.99, null, 95, { is_new: true }),
  mk("Wired Earphones with Mic", "c4", 9.99, 12.99, 180, {}),
  mk("Over-Ear ANC Headphones", "c4", 89.99, 99.99, 20, { is_featured: true }),
  mk("Universal Car Vent Mount", "c5", 11.99, null, 130, {}),
  mk("MagSafe Desk Stand", "c5", 22.99, 27.99, 65, { is_new: true }),
  mk("Adjustable Aluminium Phone Stand", "c5", 14.99, null, 100, {}),
  mk("Dashboard Suction Mount", "c5", 9.99, null, 0, {}),
  mk("4-in-1 USB-C Hub", "c6", 27.99, 34.99, 75, { is_bestseller: true }),
  mk("USB-C to HDMI Adapter", "c6", 15.99, null, 85, {}),
  mk("7-in-1 USB-C Docking Hub", "c6", 44.99, 54.99, 40, { is_featured: true }),
  mk("USB-C to Ethernet Adapter", "c6", 17.99, null, 60, {}),
  mk("Universal Stylus Pen", "c7", 18.99, 24.99, 90, { is_new: true }),
  mk("Smartwatch Charging Cable", "c7", 12.99, null, 110, {}),
  mk("Wireless Video Doorbell", "c7", 79.99, 99.99, 15, { is_featured: true, is_bestseller: true }),
  mk("Smart Wi-Fi Plug (2-Pack)", "c7", 21.99, null, 70, {}),
];

function mk(
  title: string,
  catSlug: string,
  price: number,
  compare: number | null,
  stock: number,
  flags: Partial<Pick<Product, "is_new" | "is_bestseller" | "is_featured">>
): P {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return {
    id: slug,
    title,
    slug,
    description: `${title} by ProHub — engineered for reliability, safety and everyday durability. Backed by our 2-year warranty and UK-based support.`,
    specifications: { Brand: "ProHub", Warranty: "2 years", Compatibility: "Universal" },
    category_id: catSlug,
    catSlug,
    brand: "ProHub",
    price,
    compare_at_price: compare,
    currency: "GBP",
    sku: slug.toUpperCase().slice(0, 12),
    stock,
    is_new: flags.is_new ?? false,
    is_bestseller: flags.is_bestseller ?? false,
    is_featured: flags.is_featured ?? false,
    rating: 4.6,
    review_count: Math.floor(20 + price),
    created_at: new Date().toISOString(),
  };
}

export const sampleProducts: Product[] = raw.map((p) => {
  const category = sampleCategories.find((c) => c.slug === p.catSlug) ?? null;
  return {
    ...p,
    category_id: category?.id ?? null,
    category,
    in_stock: p.stock > 0,
    product_images: [img(p.id, `${p.title} product photo`)],
    product_variants: [],
  };
});
