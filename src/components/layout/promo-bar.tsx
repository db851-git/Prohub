"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { PROMO_MESSAGES } from "@/lib/constants";

export function PromoBar() {
  const [dismissed, setDismissed] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PROMO_MESSAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  if (dismissed) return null;

  return (
    <div className="relative bg-dark text-white">
      <div className="container flex items-center justify-center py-2.5">
        <p className="text-center text-xs sm:text-sm font-medium animate-fade-up" key={idx}>
          {PROMO_MESSAGES[idx]}
        </p>
        <button
          aria-label="Dismiss announcement"
          onClick={() => setDismissed(true)}
          className="absolute right-4 text-white/70 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
