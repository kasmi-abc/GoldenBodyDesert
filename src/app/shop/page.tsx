import { products, categories } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ cat?: string; sort?: string; q?: string }> }) {
  const params = await searchParams;
  let list = [...products];
  if (params.cat) list = list.filter((p) => p.category === params.cat);
  if (params.q) list = list.filter((p) => p.name.includes(params.q!) || p.brand.includes(params.q!));
  if (params.sort === "price_asc") list.sort((a, b) => a.price - b.price);
  if (params.sort === "price_desc") list.sort((a, b) => b.price - a.price);

  const catName = categories.find((c) => c.slug === params.cat)?.name || "كل المنتجات";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-6">
      <div className="text-sm text-[var(--color-text-secondary)] mb-2"><Link href="/" className="hover:text-white">الرئيسية</Link> / <span className="text-white">{catName}</span></div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-2xl font-extrabold">{catName}</h1><p className="text-sm text-[var(--color-text-secondary)] mt-1">عدد المنتجات: {list.length} — وصف SEO: أفضل {catName} الأصلية في الجزائر مع تواريخ صلاحية و Batch Number، شحن من غرداية 69 ولاية.</p></div>
        <div className="flex gap-2">
          <Link href="/shop?sort=price_asc" className="px-3 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm">السعر: الأقل</Link>
          <Link href="/shop?sort=price_desc" className="px-3 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm">السعر: الأعلى</Link>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[280px_1fr] gap-6">
        <aside className="hidden lg:block space-y-4">
          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
            <div className="font-bold mb-3">الفلاتر</div>
            <div className="space-y-3 text-sm">
              <div><div className="font-semibold mb-2">التصنيف</div><div className="space-y-1">{categories.map((c) => <Link key={c.slug} href={`/shop?cat=${c.slug}`} className="block text-[var(--color-text-secondary)] hover:text-white">{c.name}</Link>)}</div></div>
              <div><div className="font-semibold mb-2">السعر</div><div className="text-[var(--color-text-muted)]">0 — 20000 دج (Range Slider)</div></div>
              <div><div className="font-semibold mb-2">التوفر</div><label className="flex gap-2"><input type="checkbox" /> متوفر فقط</label></div>
            </div>
          </div>
          <div className="rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 p-4 text-sm">مستودع غرداية • FIFO للتواريخ</div>
        </aside>

        <div>
          {list.length === 0 ? (
            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-12 text-center">
              <div className="text-4xl mb-3">🔍</div><div className="font-bold">لا توجد نتائج</div><div className="text-sm text-[var(--color-text-secondary)]">جرب كلمات أخرى أو تصفح التصنيفات</div>
              <Link href="/shop" className="inline-block mt-4 px-6 py-2 rounded-xl bg-[var(--color-accent)] text-black">عرض كل المنتجات</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {list.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          )}
          <div className="mt-6 flex justify-center gap-2">
            <span className="h-9 w-9 grid place-items-center rounded-xl bg-[var(--color-accent)] text-black">1</span>
            <span className="h-9 w-9 grid place-items-center rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
