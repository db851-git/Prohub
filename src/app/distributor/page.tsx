import type { Metadata } from "next";
import { Handshake, TrendingUp, Package } from "lucide-react";
import { Eyebrow } from "@/components/ui/badge";
import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = {
  title: "Become a Distributor",
  description: "Partner with ProHub Technologies — distributor and affiliate opportunities across the UK.",
};

export default function DistributorPage() {
  return (
    <div className="container section">
      <Eyebrow>Partnerships</Eyebrow>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">Become a distributor or affiliate</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Grow your business with a premium accessories range your customers will love.
        Competitive wholesale pricing, reliable stock and UK-based support.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {[
          { icon: TrendingUp, title: "Competitive margins", text: "Attractive wholesale pricing that scales with volume." },
          { icon: Package, title: "Reliable supply", text: "Consistent stock and fast UK fulfilment." },
          { icon: Handshake, title: "Real partnership", text: "Dedicated support and marketing assets." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-border p-6">
            <Icon className="h-6 w-6 text-brand" />
            <h3 className="mt-3 font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-2xl">
        <h2 className="mb-6 text-2xl font-bold">Apply now</h2>
        <LeadForm
          endpoint="/api/distributor"
          submitLabel="Submit application"
          successText="Thanks for applying — our partnerships team will review your details and be in touch."
          fields={[
            { name: "business_name", label: "Business name", required: true, half: true },
            { name: "contact_name", label: "Contact name", required: true, half: true },
            { name: "email", label: "Email", type: "email", required: true, half: true },
            { name: "phone", label: "Phone", type: "tel", half: true },
            { name: "website", label: "Website", type: "url" },
            { name: "message", label: "Tell us about your business", type: "textarea" },
          ]}
        />
      </div>
    </div>
  );
}
