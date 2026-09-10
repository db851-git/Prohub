import Link from "next/link";
import { ShieldCheck, Headphones, RotateCcw, Truck } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { NewsletterForm } from "./newsletter-form";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Product Catalogue", href: "/catalogue" },
      { label: "Become a Distributor", href: "/distributor" },
      { label: "Careers", href: "/about#careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Customer Support", href: "/support" },
      { label: "Contact", href: "/contact" },
      { label: "Complaints", href: "/complaints" },
      { label: "Track Order", href: "/support#tracking" },
      { label: "FAQ", href: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Refund Policy", href: "/policies/refund" },
      { label: "Terms of Service", href: "/policies/terms" },
      { label: "Shipping Policy", href: "/policies/shipping" },
      { label: "Cookie Policy", href: "/policies/cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Trust row */}
      <div className="border-b border-white/10">
        <div className="container grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {[
            { icon: Truck, label: "Fast dispatch" },
            { icon: Headphones, label: "UK-based support" },
            { icon: RotateCcw, label: "Easy 30-day returns" },
            { icon: ShieldCheck, label: "Secure checkout" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-brand" />
              <span className="text-sm text-white/80">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container grid grid-cols-2 gap-10 py-14 md:grid-cols-5">
        <div className="col-span-2">
          <span className="font-display text-2xl font-bold">
            Pro<span className="text-brand">Hub</span>
          </span>
          <p className="mt-3 max-w-xs text-sm text-white/70">{BRAND.tagline}</p>
          <div className="mt-6 max-w-sm">
            <p className="text-sm font-medium">
              Subscribe to our emails
            </p>
            <p className="mt-1 text-xs text-white/60">
              Be the first to know about new drops and exclusive offers.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-4 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            {BRAND.address.line1}, {BRAND.address.city}, {BRAND.address.postcode},{" "}
            {BRAND.address.country} · © 2026 {BRAND.name}
          </p>
          <div className="flex flex-col gap-1.5 md:items-end">
            <div className="flex flex-wrap gap-2 opacity-50">
              {["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "PayPal"].map(
                (m) => (
                  <span
                    key={m}
                    className="rounded border border-white/20 px-2 py-0.5 text-[10px]"
                  >
                    {m}
                  </span>
                )
              )}
            </div>
            <span className="text-[10px]">Payment methods coming soon.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
