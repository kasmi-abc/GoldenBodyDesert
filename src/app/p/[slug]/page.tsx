import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";

export default async function PDP({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug) || products[0];
  const out = p.stock === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-6">
      <div className="text-sm text-[var(--color-text-secondary)] mb-4"><Link href="/">الرئيسية</Link> / <Link href="/shop">المتجر</Link> / <span className="text-white">{p.name}</span></div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden"><img src={p.image} alt="thumb" className="h-full w-full object-cover opacity-70" /></div>
            ))}
          </div>
          <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-3 text-xs text-[var(--color-text-secondary)]">صور: عبوة أمامية، خلفية، مكونات، شهادة الأصالة (تُضاف لاحقاً من صاحب المحل)</div>
        </div>

        <div>
          <div className="text-sm text-[var(--color-text-muted)]">{p.brand} • SKU: {p.sku}</div>
          <h1 className="text-2xl font-extrabold mt-1">{p.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-amber-400">★ {p.rating} ({p.reviews} تقييم موثق)</span>
            <Badge variant="default">أصلي 100%</Badge>
            {p.stock > 0 ? <span className="text-emerald-400 text-sm">متوفر — {p.stock} قطع</span> : <span className="text-red-400 text-sm">نفد المخزون</span>}
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold">{formatPrice(p.price)}</span>
            {p.compareAtPrice && <span className="line-through text-[var(--color-text-muted)]">{formatPrice(p.compareAtPrice)}</span>}
          </div>
          <div className="text-sm text-[var(--color-text-secondary)] mt-1">شحن متوقع 2-3 أيام لولايتك • من غرداية عبر Nord Ouest • شحن مجاني فوق 9000 دج</div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="font-semibold mb-2">النكهة</div>
              <div className="flex gap-2 flex-wrap">{(p.flavors || ["بدون نكهة"]).map((f) => <button key={f} className="px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-sm hover:border-[var(--color-accent)]">{f}</button>)}</div>
            </div>
            <div>
              <div className="font-semibold mb-2">الوزن</div>
              <div className="flex gap-2 flex-wrap">{p.weights.map((w) => <button key={w} className="px-4 py-2 rounded-full bg-[var(--color-accent)] text-black text-sm">{w}</button>)}</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
            <Button disabled={out} className="w-full h-14 text-base">{out ? "أعلمني عند التوفر (Notify Me)" : "أضف للسلة — Add to Cart"}</Button>
            <div className="flex gap-2 justify-center sm:justify-start">
              <button className="h-14 w-14 grid place-items-center rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">♡</button>
              <button className="h-14 w-14 grid place-items-center rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">↗</button>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-3">شراء الآن — Buy Now (COD)</Button>

          <div className="mt-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
            <div className="px-4 py-3 font-bold border-b border-[var(--color-border)]">القيم الغذائية — Nutrition Facts</div>
            <div className="p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>حجم الحصة</span><span className="font-bold">30غ (سكوب)</span></div>
              <div className="flex justify-between"><span>السعرات</span><span>120</span></div>
              <div className="flex justify-between"><span>البروتين</span><span className="font-bold text-[var(--color-accent)]">24غ</span></div>
              <div className="flex justify-between"><span>الكربوهيدرات</span><span>3غ</span></div>
              <div className="flex justify-between"><span>الدهون</span><span>1غ</span></div>
              <div className="pt-2 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">المكونات: Whey Protein Concentrate, Isolate,نكهة, محلي. مسببات الحساسية: حليب، صويا. تحذير: ليس دواءً، استشر طبيبك. التخزين: مكان بارد وجاف. بلد المنشأ: USA. انتهاء: {p.expiryDate} • Batch: {p.batchNumber}</div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs leading-6">⚠️ تنبيه طبي: هذا المنتج مكمل غذائي وليس بديلاً عن نظام غذائي متنوع أو استشارة طبية. لا يُنصح للحوامل والأطفال دون استشارة مختص. لا نقدم وعود علاجية.</div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold">التقييمات</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">التقييم متاح فقط للعملاء الذين اشتروا المنتج.</p>
        <div className="mt-4 grid md:grid-cols-[300px_1fr] gap-6">
          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
            <div className="text-4xl font-extrabold">4.8</div><div className="text-amber-400">★★★★★</div><div className="text-xs text-[var(--color-text-muted)]">312 تقييم موثق</div>
            <div className="mt-4 space-y-1 text-xs text-start">
              {[5, 4, 3, 2, 1].map((s) => <div key={s} className="flex items-center gap-2"><span>{s}★</span><div className="flex-1 h-2 bg-black/30 rounded-full"><div className="h-2 bg-amber-400 rounded-full" style={{ width: s === 5 ? "78%" : s === 4 ? "15%" : "4%" }} /></div></div>)}
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
              <div className="flex items-center gap-2"><span className="font-bold">محمد — غرداية</span><Badge variant="success" className="text-[10px]">شراء موثق ✓</Badge><span className="ms-auto text-amber-400">★★★★★</span></div>
              <div className="text-sm mt-2">منتج أصلي، التوصيل في يومين لغرداية، تاريخ انتهاء واضح 2027.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold mb-4">منتجات مشابهة</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{products.slice(0, 4).map((x) => <ProductCard key={x.id} p={x} />)}</div>
      </section>
    </div>
  );
}
