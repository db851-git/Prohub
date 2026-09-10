import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui/badge";
import { policies, policySlugs } from "@/lib/policies";

export function generateStaticParams() {
  return policySlugs.map((policy) => ({ policy }));
}

export function generateMetadata({
  params,
}: {
  params: { policy: string };
}): Metadata {
  const p = policies[params.policy];
  return { title: p?.title ?? "Policy" };
}

export default function PolicyPage({ params }: { params: { policy: string } }) {
  const policy = policies[params.policy];
  if (!policy) notFound();

  return (
    <div className="container section max-w-3xl">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">{policy.title}</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {policy.updated}</p>

      <div className="mt-4 rounded-xl border border-brand/20 bg-brand-soft p-4 text-sm text-ink">
        This is a template for guidance only and is not legal advice. Please have it
        reviewed by a qualified professional before launch.
      </div>

      <div className="mt-8 space-y-8">
        {policy.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl font-semibold">{s.heading}</h2>
            {s.body.map((para, i) => (
              <p key={i} className="mt-2 leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
