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

// Real, category-matched product photos from Monarch Gadgets' own store CDN.
// Several per category so products don't all repeat the same image.
const CDN = "https://cdn.shopify.com/s/files/1/2220/0245";
const MONARCH_IMAGES: Record<string, string[]> = {
  "charging-cables": [
    `${CDN}/files/Z-SERIESUSB-CTOUSB-C1.2M.png?v=1690885714`,
    `${CDN}/files/1.2A-C.png?v=1691395700`,
    `${CDN}/files/Z-SERIESUSB-CTOIPHONE1.2M.png?v=1690885758`,
    `${CDN}/files/2mA-C.png?v=1691401185`,
  ],
  "wall-car-chargers": [
    `${CDN}/files/G453CC-01_6.png?v=1701423026`,
    `${CDN}/files/G303CA-01_6.png?v=1701423670`,
    `${CDN}/files/TP205CQ-01_6.png?v=1701422712`,
    `${CDN}/files/PD30_aa1f361e-34da-4f59-b40d-1e924c6e0b6a.png?v=1690807608`,
  ],
  "power-banks": [
    `${CDN}/files/1031.839.png?v=1690798249`,
    `${CDN}/files/Image_20230802174933.jpg?v=1690980750`,
    `${CDN}/files/Image_20230802161901.jpg?v=1690975794`,
    `${CDN}/files/Image_20230802162041.jpg?v=1690974880`,
  ],
  audio: [
    `${CDN}/files/T90.jpg?v=1690184652`,
    `${CDN}/files/Image_20230803153929.png?v=1691059342`,
    `${CDN}/products/H3.png?v=1652159827`,
    `${CDN}/products/lADPBbCc1UCLFxzNEsDNF3A_6000_4800.jpg?v=1571712841`,
  ],
  "mounts-holders": [
    `${CDN}/files/CarMount304.jpg?v=1690546193`,
    `${CDN}/files/C9-F6.374.png?v=1690540986`,
    `${CDN}/products/14.png?v=1652159093`,
    `${CDN}/products/819BK_10.jpg?v=1571712841`,
  ],
  "hubs-adapters": [
    `${CDN}/files/Image_20230707143728.jpg?v=1690277562`,
    `${CDN}/products/06_2fbf809b-a6b9-4d73-a6e5-cc0d83e0c679.png?v=1652159178`,
    `${CDN}/products/J1_3.png?v=1652159189`,
    `${CDN}/products/03_3b85ebc4-54a4-4deb-a1f7-149cff003614.png?v=1652159193`,
  ],
  "smart-accessories": [
    `${CDN}/files/wirelessDoorBellb.png?v=1691481136`,
    `${CDN}/files/1.jpg?v=1691058488`,
    `${CDN}/files/smaeartwatchwithusb-C.jpg?v=1691489064`,
    `${CDN}/products/IMG-20170504-WA0007.jpg?v=1571712839`,
  ],
};

const categoryCounters: Record<string, number> = {};

export function imageForProduct(_slug: string, categorySlug: string | null) {
  const pool = categorySlug ? MONARCH_IMAGES[categorySlug] : null;
  if (!pool || pool.length === 0) return "/placeholder.svg";
  const i = categoryCounters[categorySlug!] ?? 0;
  categoryCounters[categorySlug!] = i + 1;
  return pool[i % pool.length];
}

function img(seed: string, alt: string, url: string) {
  return { id: `img-${seed}`, product_id: seed, url, alt, sort_order: 0 };
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
  // `p.catSlug` holds the category id ("c1"…"c7"); match on id.
  const category =
    sampleCategories.find((c) => c.id === p.catSlug || c.slug === p.catSlug) ?? null;
  return {
    ...p,
    category_id: category?.id ?? null,
    category,
    in_stock: p.stock > 0,
    product_images: [
      img(p.id, `${p.title} product photo`, imageForProduct(p.slug, category?.slug ?? null)),
    ],
    product_variants: [],
  };
});
