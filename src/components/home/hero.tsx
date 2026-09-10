"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    eyebrow: "ProHub Technologies",
    headline: "Premium tech, everyday ready.",
    sub: "Accessories built for the way you live — tested for reliability, safety and durability.",
    cta: { label: "Shop all", href: "/shop" },
    bg: "from-[#0b0f14] to-[#1a2436]",
  },
  {
    eyebrow: "New GaN Chargers",
    headline: "Charge faster. Stay cooler.",
    sub: "65W & 100W GaN chargers that power your phone, tablet and laptop from a single port.",
    cta: { label: "Shop chargers", href: "/shop/wall-car-chargers" },
    bg: "from-[#12306b] to-[#2e6bff]",
  },
  {
    eyebrow: "Power Banks",
    headline: "Power that keeps up.",
    sub: "From slim 5,000mAh pockets to 20,000mAh laptop-class packs.",
    cta: { label: "Shop power banks", href: "/shop/power-banks" },
    bg: "from-[#0b0f14] to-[#3a2a5a]",
  },
];

export function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[idx];

  return (
    <section className="relative overflow-hidden">
      <div
        className={cn(
          "bg-gradient-to-br text-white transition-all duration-700",
          slide.bg
        )}
      >
        <div className="container flex min-h-[520px] flex-col justify-center py-20">
          <div key={idx} className="max-w-xl animate-fade-up">
            <p className="eyebrow text-white/80">{slide.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
              {slide.headline}
            </h1>
            <p className="mt-5 text-lg text-white/80">{slide.sub}</p>
            <Link
              href={slide.cta.href}
              className={cn(buttonVariants({ size: "lg" }), "mt-8")}
            >
              {slide.cta.label}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIdx(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === idx ? "w-8 bg-white" : "w-1.5 bg-white/40"
            )}
          />
        ))}
      </div>
    </section>
  );
}
