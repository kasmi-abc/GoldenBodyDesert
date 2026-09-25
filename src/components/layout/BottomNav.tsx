"use client";
import Link from "next/link";
import { useCart } from "@/store/cart";
export function BottomNav() {
  const { count } = useCart();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex justify-around py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      {[
        { label:"الرئيسية", href:"/", icon:"⌂" },
        { label:"المتجر", href:"/shop", icon:"▦" },
        { label:"البحث", href:"/search", icon:"⌕" },
        { label:"السلة", href:"/cart", icon:"🛒", badge: count },
        { label:"حسابي", href:"/account", icon:"◯" },
      ].map(i=>(
        <Link key={i.label} href={i.href} className="flex flex-col items-center gap-1 text-xs text-[var(--color-text-secondary)] relative">
          <span className="text-lg leading-none">{i.icon}</span>{i.label}
          {i.badge ? <span className="absolute -top-1 end-2 bg-[var(--color-primary)] text-white text-[10px] rounded-full h-4 min-w-4 grid place-items-center px-1">{i.badge}</span> : null}
        </Link>
      ))}
    </nav>
  );
}
