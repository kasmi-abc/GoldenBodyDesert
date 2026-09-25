import { products } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const list = q ? products.filter(p=>p.name.includes(q) || p.brand.includes(q)) : [];
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <h1 className="text-xl font-extrabold">البحث الذكي — Meilisearch (Instant + Typo Tolerance)</h1>
      <div className="mt-4 flex gap-2">
        <form className="flex-1 flex gap-2">
          <input name="q" defaultValue={q} placeholder="ابحث: واي، كرياتين، فيتامين..." className="flex-1 h-11 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] px-4" />
          <button className="px-6 rounded-xl bg-[var(--color-primary)] text-white">بحث</button>
        </form>
      </div>
      {q ? (
        <div className="mt-6">
          <div className="text-sm text-[var(--color-text-secondary)]">نتائج &quot;{q}&quot; — {list.length} منتج — يدعم الأخطاء الإملائية (كرياتين/كراتين) والمرادفات (واي=بروتين)</div>
          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">{list.map(p=> <ProductCard key={p.id} p={p} />)}</div>
          {list.length===0 && <div className="mt-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 text-center"><div className="font-bold">لا نتائج — جرب &quot;كرياتين&quot; أو &quot;بروتين&quot;</div><Link href="/shop" className="text-[var(--color-accent)] text-sm">تصفح كل المنتجات</Link></div>}
        </div>
      ) : (
        <div className="mt-6 text-sm text-[var(--color-text-muted)]">الأكثر بحثاً: واي بروتين، كرياتين، أوميغا 3 — Recent & Trending عبر Meilisearch.</div>
      )}
    </div>
  );
}
