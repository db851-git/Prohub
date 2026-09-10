export const BRAND = {
  name: "ProHub Technologies",
  short: "ProHub",
  tagline: "Power. Sound. Connect.",
  address: {
    line1: "52 Mercury Close",
    city: "Southampton",
    postcode: "SO16 8BH",
    country: "England, United Kingdom",
  },
  email: "support@prohubtechnologies.com",
  phone: "",
  currency: "GBP",
  currencySymbol: "£",
} as const;

export const FREE_DELIVERY_THRESHOLD = 50;
export const BULK_DISCOUNT_RATE = 0.2; // 20% off orders over threshold
export const STANDARD_SHIPPING = 3.99;

export const PROMO_MESSAGES = [
  "Free next-day delivery + 20% off orders over £50 — automatically at checkout.",
  "UK-based support • Easy 30-day returns • 2-year warranty.",
  "New drops just landed — shop the latest ProHub gear.",
];

export const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Cables", href: "/shop/charging-cables" },
  { label: "Chargers", href: "/shop/wall-car-chargers" },
  { label: "Power Banks", href: "/shop/power-banks" },
  { label: "Audio", href: "/shop/audio" },
  { label: "Accessories", href: "/shop/smart-accessories" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

export const CATEGORY_ORDER = [
  "charging-cables",
  "wall-car-chargers",
  "power-banks",
  "audio",
  "mounts-holders",
  "hubs-adapters",
  "smart-accessories",
];
