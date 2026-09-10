"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "textarea";
  required?: boolean;
  half?: boolean;
};

export function LeadForm({
  endpoint,
  fields,
  hidden,
  submitLabel = "Submit",
  successText = "Thanks — we&apos;ll be in touch shortly.",
}: {
  endpoint: string;
  fields: Field[];
  hidden?: Record<string, string>;
  submitLabel?: string;
  successText?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, ...hidden }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Something went wrong.");
      }
      setStatus("done");
    } catch (err: any) {
      setError(err.message);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/5 p-6 text-success">
        <CheckCircle2 className="h-6 w-6 shrink-0" />
        <p dangerouslySetInnerHTML={{ __html: successText }} />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
      {fields.map((f) => (
        <div key={f.name} className={f.half ? "col-span-2 sm:col-span-1" : "col-span-2"}>
          <Label htmlFor={f.name}>
            {f.label}
            {f.required && " *"}
          </Label>
          {f.type === "textarea" ? (
            <Textarea
              id={f.name}
              required={f.required}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
            />
          ) : (
            <Input
              id={f.name}
              type={f.type ?? "text"}
              required={f.required}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
            />
          )}
        </div>
      ))}
      {error && <p className="col-span-2 text-sm text-sale">{error}</p>}
      <div className="col-span-2">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
