import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Customer Support & FAQ",
  description: "Answers to common questions about delivery, returns, warranty and payment.",
};

const faqs = [
  { title: "How long does delivery take?", content: "We dispatch within 1 working day. Standard UK delivery is 2–3 working days; orders over £50 qualify for free next-day delivery." },
  { title: "What is your returns policy?", content: "We offer easy 30-day returns on unused items in their original packaging. See our Refund Policy for details." },
  { title: "Are products covered by warranty?", content: "Yes — every ProHub product is backed by a 2-year limited warranty against manufacturing defects." },
  { title: "How do I track my order?", content: "Order tracking is coming soon. In the meantime, email our support team with your order number and we'll update you." },
  { title: "How do I pay?", content: "Payment integration is coming soon. Orders are reserved and our team will contact you with secure payment details (bank transfer / card link)." },
  { title: "Do you ship outside the UK?", content: "We currently focus on UK delivery. International shipping is on our roadmap." },
];

export default function SupportPage() {
  return (
    <div className="container section">
      <Eyebrow>Support</Eyebrow>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">How can we help?</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_300px]">
        <div>
          <Accordion items={faqs} />
          <div id="tracking" className="mt-8 rounded-2xl bg-surface p-6">
            <h2 className="font-semibold">Track your order</h2>
            <p className="mt-1 text-sm text-muted">
              Order tracking is coming soon. Email us your order number and we&apos;ll
              send you an update.
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border p-6">
          <h2 className="font-display font-semibold">Still need help?</h2>
          <p className="mt-2 text-sm text-muted">
            Our UK-based team is happy to help with anything.
          </p>
          <Link href="/contact" className={buttonVariants({ className: "mt-4 w-full" })}>
            Contact support
          </Link>
          <div className="mt-6 space-y-2 text-sm">
            <Link href="/policies/shipping" className="block text-brand hover:underline">Shipping Policy</Link>
            <Link href="/policies/refund" className="block text-brand hover:underline">Refund Policy</Link>
            <Link href="/complaints" className="block text-brand hover:underline">Make a complaint</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
