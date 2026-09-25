import { cn } from "@/lib/utils";
import React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"secondary"|"ghost"|"outline"; size?: "sm"|"md"|"lg" };
export function Button({ variant="primary", size="md", className, children, ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-[var(--radius-button)] font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none";
  const variants = {
    primary: "bg-[var(--color-accent)] text-black hover:bg-[#B89A5A] shadow-[0_4px_12px_rgba(201,168,106,0.25)]",
    secondary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[0_4px_12px_rgba(44,115,210,0.3)]",
    ghost: "text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-surface)]",
    outline: "border border-[var(--color-border-strong)] bg-transparent text-white hover:bg-[var(--color-surface)]"
  };
  const sizes = { sm:"h-9 px-4 text-sm", md:"h-11 px-6 text-[14px]", lg:"h-12 px-8 text-base" };
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props}>{children}</button>;
}
