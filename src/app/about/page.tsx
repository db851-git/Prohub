import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: "ProHub Technologies — UK-based premium mobile accessories, built for reliability and backed by responsive support.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-dark text-white">
        <div className="container section">
          <Eyebrow>Our story</Eyebrow>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold md:text-5xl">
            Accessories as well-made as the devices they serve.
          </h1>
        </div>
      </section>

      <section className="container section">
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-ink/90">
          <p>
            ProHub Technologies is a UK-based company built on a simple belief: the
            accessories that power your day should be as well-made as the devices they
            serve. From fast-charging cables and GaN wall chargers to power banks, audio
            and smart gadgets, every ProHub product is chosen and tested for reliability,
            safety and everyday durability.
          </p>
          <p>
            We&apos;re proud to be based in {BRAND.address.city}, and just as proud to
            back everything we sell with responsive UK support, easy 30-day returns and a
            2-year warranty. We&apos;re only getting started — and we&apos;d love you to
            be part of the story.
          </p>
        </div>

        <div className="mt-12 grid gap-6 rounded-2xl bg-surface p-8 sm:grid-cols-3">
          {[
            { stat: "30+", label: "Products and growing" },
            { stat: "2-year", label: "Warranty on everything" },
            { stat: "UK", label: "Based in Southampton" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-bold text-brand">{s.stat}</div>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div id="careers" className="mt-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Our values</h2>
            <ul className="mt-4 space-y-3 text-muted">
              <li><strong className="text-ink">Quality first</strong> — we don&apos;t ship what we wouldn&apos;t use ourselves.</li>
              <li><strong className="text-ink">Honest pricing</strong> — fair prices, no hype.</li>
              <li><strong className="text-ink">Real support</strong> — friendly help from real people.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border p-8">
            <h2 className="text-xl font-bold">Become an affiliate</h2>
            <p className="mt-2 text-muted">
              Partner with ProHub and grow with us. We welcome distributors, resellers
              and affiliates across the UK.
            </p>
            <Link href="/distributor" className={buttonVariants({ className: "mt-5" })}>
              Apply now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
