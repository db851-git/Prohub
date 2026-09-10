"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-3 flex items-center gap-2 text-sm text-success">
        <Check className="h-4 w-4" /> Thanks — you&apos;re subscribed!
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 flex gap-2">
      <input
        type="email"
        required
        aria-label="Email address"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        aria-label="Subscribe"
        className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand hover:bg-brand/90 disabled:opacity-50"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </form>
  );
}
