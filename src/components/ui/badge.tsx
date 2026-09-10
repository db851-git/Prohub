import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "new" | "sale" | "soft" | "success";
  className?: string;
}) {
  const variants = {
    default: "bg-ink text-white",
    new: "bg-brand text-white",
    sale: "bg-sale text-white",
    soft: "bg-brand-soft text-brand",
    success: "bg-success/10 text-success",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
      {children}
    </span>
  );
}
