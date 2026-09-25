"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/store/cart";

const categories = [
  { label:"البروتينات", href:"/shop?cat=protein" },
  { label:"الكرياتين", href:"/shop?cat=creatine" },
  { label:"ما قبل التمرين", href:"/shop?cat=preworkout" },
  { label:"الفيتامينات", href:"/shop?cat=vitamins" },
  { label:"حرق الدهون", href:"/shop?cat=fatburner" },
  { label:"الأحماض", href:"/shop?cat=amino" },
  { label:"الكتلة", href:"/shop?cat=mass" },
  { label:"ألواح الطاقة", href:"/shop?cat=bars" },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-[72px]">
          <button onClick={()=>setOpen(!open)} className="lg:hidden p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="w-5 h-4 flex flex-col justify-between"><span className="h-0.5 bg-white"/><span className="h-0.5 bg-white"/><span className="h-0.5 bg-white"/></div>
          </button>

          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img src="/logo.jpg" alt="Golden Body Desert" className="h-10 w-10 rounded-full object-cover border border-[var(--color-border)]" />
            <div className="hidden sm:block leading-tight">
              <div className="font-extrabold tracking-widest text-sm">GOLDEN BODY</div>
              <div className="text-[10px] tracking-[0.3em] text-[var(--color-accent)] -mt-1">DESERT</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ms-6">
            {categories.slice(0,6).map(c=>(
              <Link key={c.label} href={c.href} className="px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-white rounded-lg hover:bg-[var(--color-surface)] transition-colors">{c.label}</Link>
            ))}
            <Link href="/shop" className="px-3 py-2 text-sm text-[var(--color-accent)]">كل التصنيفات</Link>
          </nav>

          <div className="flex-1 max-w-[520px] mx-2 sm:mx-6 relative">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="ابحث عن واي بروتين، كرياتين..." className="w-full h-11 ps-11 pe-4 rounded-[var(--radius-input)] bg-[var(--color-surface)] border border-[var(--color-border)] text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary)] outline-none" />
            <span className="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </span>
            {q && (
              <div className="absolute top-12 inset-x-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-2 shadow-xl">
                <Link href={`/search?q=${q}`} className="block px-3 py-2 hover:bg-[var(--color-surface-hover)] rounded-lg text-sm">بحث عن &quot;{q}&quot;</Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link href="/account" className="hidden sm:inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> </Link>
            <Link href="/wishlist" className="hidden sm:inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">♡</Link>
            <Link href="/cart" className="relative h-11 px-4 inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] text-white font-semibold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6h15l-1.5 9h-13z"/><path d="M6 6L5 2H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>
              <span className="hidden sm:inline">السلة</span>
              {count>0 && <span className="bg-white text-[var(--color-primary)] text-xs font-bold rounded-full h-5 min-w-5 px-1 grid place-items-center">{count}</span>}
            </Link>
          </div>
        </div>

        {open && (
          <div className="lg:hidden pb-4 grid grid-cols-2 gap-2">
            {categories.map(c=> <Link key={c.label} href={c.href} onClick={()=>setOpen(false)} className="px-3 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-center">{c.label}</Link>)}
          </div>
        )}
      </div>
    </header>
  );
}
