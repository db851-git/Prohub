import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/badge";
import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = {
  title: "Complaints",
  description: "How to raise a complaint with ProHub Technologies and what to expect.",
};

export default function ComplaintsPage() {
  return (
    <div className="container section">
      <Eyebrow>Complaints</Eyebrow>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">Making a complaint</h1>
      <p className="mt-2 max-w-2xl text-muted">
        We take every complaint seriously. Tell us what went wrong and we&apos;ll put it
        right as quickly as we can.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">Our process</h2>
          <ol className="mt-4 space-y-4">
            {[
              "Submit your complaint using the form — include your order number if relevant.",
              "We acknowledge receipt within 2 working days.",
              "We investigate and aim to resolve within 10 working days.",
              "If you're not satisfied, we'll escalate to a senior team member.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
                  {i + 1}
                </span>
                <span className="text-sm text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="mb-6 text-xl font-semibold">Submit a complaint</h2>
          <LeadForm
            endpoint="/api/contact"
            hidden={{ type: "complaint" }}
            submitLabel="Submit complaint"
            successText="Thanks — we've received your complaint and will acknowledge it within 2 working days."
            fields={[
              { name: "name", label: "Name", required: true, half: true },
              { name: "email", label: "Email", type: "email", required: true, half: true },
              { name: "subject", label: "Order number / subject" },
              { name: "message", label: "Details of your complaint", type: "textarea", required: true },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
