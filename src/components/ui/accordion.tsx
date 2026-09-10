"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-border border-t border-b border-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="font-display font-medium text-ink">{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-muted transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden text-sm text-muted transition-all",
                isOpen ? "max-h-[1000px] pb-5" : "max-h-0"
              )}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
