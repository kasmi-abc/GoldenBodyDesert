"use client";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, discountPercent } from "@/lib/utils";
import type { Product } from "@/lib/data";
import { useCart } from "@/store/cart";
import { useState } from "react";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const hasDiscount = !!p.compareAtPrice;
  const out = p.stock === 0;
  const low = p.stock > 0 && p.stock <= 5;

  return (
    <div className="group relative flex flex-col rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-card)] transition-all">
      <Link href={`/p/${p.slug}`} className="relative aspect-square bg-[#0F1115] overflow-hidden">
        <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-300" />
        <div className="absolute top-3 start-3 flex flex-col gap-2">
          {hasDiscount && <Badge variant="discount">-{discountPercent(p.compareAtPrice!, p.price)}%</Badge>}
          {p.isNew && <Badge className="bg-[var(--color-accent)] text-black">جديد</Badge>}
          {out && <Badge variant="outline" className="bg-black/60 text-white border-white/20">نفد المخزون</Badge>}
          {low && <Badge variant="outline" className="bg-[var(--color-warning)] text-black">تبقى {p.stock} فقط</Badge>}
        </div>
        <div className="absolute top-3 end-3 h-8 w-8 grid place-items-center rounded-full bg-black/40 backdrop-blur border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">♡</div>
        <div className="absolute bottom-2 start-2 flex items-center gap-1 bg-black/70 text-white text-[11px] px-2 py-1 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> أصلي 100%
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-[var(--color-text-muted)]">{p.brand} • {p.sku}</div>
        <Link href={`/p/${p.slug}`} className="font-semibold leading-5 line-clamp-2 mt-1 hover:text-[var(--color-accent)]">{p.name}</Link>
        <div className="mt-1 flex items-center gap-1 text-xs">
          <span className="text-amber-400">★ {p.rating}</span><span className="text-[var(--color-text-muted)]">({p.reviews})</span><span className="ms-auto text-[10px] text-emerald-400 border border-emerald-400/20 rounded-full px-2 py-0.5">Batch {p.batchNumber}</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-extrabold">{formatPrice(p.price)}</span>
          {hasDiscount && <span className="text-sm text-[var(--color-text-muted)] line-through">{formatPrice(p.compareAtPrice!)}</span>}
        </div>
        <div className="text-xs text-[var(--color-text-muted)] mt-1">انتهاء: {p.expiryDate} • {p.weights.join(" / ")}</div>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <Button disabled={out} onClick={()=>{ add(p); setAdded(true); setTimeout(()=>setAdded(false), 1200); }} className="w-full">{out? "أعلمني عند التوفر" : added? "✓ تمت الإضافة" : "أضف للسلة"}</Button>
          <Link href={`/p/${p.slug}`} className="h-11 w-11 grid place-items-center rounded-[var(--radius-button)] bg-[var(--color-surface-hover)] border border-[var(--color-border)]">👁</Link>
        </div>
      </div>
    </div>
  );
}
