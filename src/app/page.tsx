import Link from "next/link";
import {
  Cable,
  Plug,
  BatteryCharging,
  Headphones,
  Smartphone,
  Usb,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  Star,
} from "lucide-react";
import { Hero } from "@/components/home/hero";
import { ProductRow } from "@/components/product/product-row";
import { Eyebrow } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCategories, getFeatured, getProducts } from "@/lib/data";

const categoryIcons: Record<string, any> = {
  "charging-cables": Cable,
  "wall-car-chargers": Plug,
  "power-banks": BatteryCharging,
  audio: Headphones,
  "mounts-holders": Smartphone,
  "hubs-adapters": Usb,
  "smart-accessories": Sparkles,
};

const testimonials = [
  { name: "Amelia R.", text: "The 65W GaN charger powers my laptop and phone at once. Tiny and fast — exactly as described.", rating: 5 },
  { name: "Daniel K.", text: "Braided cables that actually last. Fast UK delivery and friendly support when I had a question.", rating: 5 },
  { name: "Priya S.", text: "Power bank charges my phone nearly three times. Great value and it feels premium.", rating: 4 },
];

export default async function HomePage() {
  const [categories, newProducts, bestsellers, featured] = await Promise.all([
    getCategories(),
    getFeatured("is_new", 4),
    getFeatured("is_bestseller", 8),
    getProducts(),
  ]);
  const hero = featured.find((p) => p.is_featured) ?? featured[0];

  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="border-b border-border bg-surface">
        <div className="container grid grid-cols-2 gap-6 py-6 md:grid-cols-4">
          {[
            { icon: Truck, label: "Free UK delivery over £50" },
            { icon: RotateCcw, label: "30-day returns" },
            { icon: ShieldCheck, label: "2-year warranty" },
            { icon: Lock, label: "Secure checkout" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon className="h-5 w-5 text-brand" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by category */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <Eyebrow>Browse</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Shop by category</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.slug] ?? Sparkles;
              return (
                <Link
                  key={cat.id}
                  href={`/shop/${cat.slug}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-5 text-center transition-shadow hover:shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium leading-tight">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* New launch */}
      {newProducts.length > 0 && (
        <section className="section pt-0">
          <div className="container">
            <div className="flex items-end justify-between">
              <div>
                <Eyebrow>Just landed</Eyebrow>
                <h2 className="mt-2 text-3xl font-bold">New launches</h2>
              </div>
              <Link href="/shop?sort=newest" className="text-sm font-medium text-brand hover:underline">
                View all →
              </Link>
            </div>
            <div className="mt-8">
              <ProductRow products={newProducts} />
            </div>
          </div>
        </section>
      )}

      {/* Featured banner */}
      {hero && (
        <section className="section pt-0">
          <div className="container">
            <div className="grid items-center gap-8 overflow-hidden rounded-2xl bg-dark text-white md:grid-cols-2">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#12306b] to-[#2e6bff]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hero.product_images?.[0]?.url ?? ""}
                  alt={hero.title}
                  className="h-full w-full object-cover opacity-90"
                />
              </div>
              <div className="p-8 md:p-12">
                <Eyebrow>Featured</Eyebrow>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl">{hero.title}</h2>
                <p className="mt-4 text-white/70">{hero.description}</p>
                <Link
                  href={`/product/${hero.slug}`}
                  className={cn(buttonVariants({ size: "lg" }), "mt-6")}
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Best sellers */}
      {bestsellers.length > 0 && (
        <section className="section pt-0">
          <div className="container">
            <div className="flex items-end justify-between">
              <div>
                <Eyebrow>Loved by customers</Eyebrow>
                <h2 className="mt-2 text-3xl font-bold">Best sellers</h2>
              </div>
              <Link href="/shop?sort=bestselling" className="text-sm font-medium text-brand hover:underline">
                View all →
              </Link>
            </div>
            <div className="mt-8">
              <ProductRow products={bestsellers.slice(0, 4)} />
            </div>
          </div>
        </section>
      )}

      {/* Why ProHub */}
      <section className="bg-surface">
        <div className="container section">
          <div className="grid gap-10 md:grid-cols-3">
            {[
              { title: "Built to last", text: "Every product is chosen and tested for reliability, safety and everyday durability." },
              { title: "2-year warranty", text: "We back everything we sell — because quality should be a promise, not a gamble." },
              { title: "UK-based support", text: "Responsive, friendly help from our Southampton team when you need it." },
            ].map((v) => (
              <div key={v.title}>
                <h3 className="text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <Eyebrow>Reviews</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold">What customers say</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-white p-6">
                <div className="flex gap-0.5 text-brand">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn("h-4 w-4", i < t.rating ? "fill-brand" : "fill-none text-border")}
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm text-ink">“{t.text}”</blockquote>
                <figcaption className="mt-4 text-sm font-medium text-muted">{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
