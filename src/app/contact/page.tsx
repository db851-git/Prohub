import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { Eyebrow } from "@/components/ui/badge";
import { LeadForm } from "@/components/forms/lead-form";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the ProHub Technologies team.",
};

export default function ContactPage() {
  return (
    <div className="container section">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">Get in touch</h1>
      <p className="mt-2 max-w-xl text-muted">
        Questions about an order, a product, or a partnership? We&apos;re here to help.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <LeadForm
          endpoint="/api/contact"
          submitLabel="Send message"
          fields={[
            { name: "name", label: "Name", required: true, half: true },
            { name: "email", label: "Email", type: "email", required: true, half: true },
            { name: "subject", label: "Subject" },
            { name: "message", label: "Message", type: "textarea", required: true },
          ]}
        />

        <div className="space-y-6">
          <div className="flex gap-3">
            <Mail className="h-5 w-5 text-brand" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted">{BRAND.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-brand" />
            <div>
              <p className="font-medium">Address</p>
              <p className="text-sm text-muted">
                {BRAND.address.line1}
                <br />
                {BRAND.address.city}, {BRAND.address.postcode}
                <br />
                {BRAND.address.country}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="h-5 w-5 text-brand" />
            <div>
              <p className="font-medium">Response time</p>
              <p className="text-sm text-muted">We aim to reply within 1 working day.</p>
            </div>
          </div>
          <div className="aspect-video w-full rounded-2xl bg-surface">
            <div className="flex h-full items-center justify-center text-sm text-muted">
              Map placeholder — {BRAND.address.city}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
