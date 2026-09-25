import { cn } from "@/lib/utils";
export function Badge({ children, variant="default", className }: { children: React.ReactNode; variant?: "default"|"discount"|"success"|"outline"; className?: string }) {
  const styles = {
    default: "bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent)]/20",
    discount: "bg-[var(--color-discount)] text-white",
    success: "bg-[var(--color-success)] text-white",
    outline: "border border-[var(--color-border-strong)] text-[var(--color-text-secondary)] bg-transparent"
  };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", styles[variant], className)}>{children}</span>;
}
