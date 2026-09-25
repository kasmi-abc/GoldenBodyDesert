"use client";
import { useCart } from "@/store/cart";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, updateQty, remove, subtotal } = useCart();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 600;

  if (items.length===0) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-16 text-center pb-24">
        <div className="text-5xl mb-4">🛒</div>
        <h1 className="text-2xl font-extrabold">سلتك فارغة</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">ابدأ التسوق واكتشف أفضل المكملات الأصلية</p>
        <Link href="/shop" className="inline-block mt-6 px-8 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold">تصفح المتجر</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 pb-24 lg:pb-6">
      <h1 className="text-2xl font-extrabold">السلة — {items.length} منتجات</h1>

      <div className="mt-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
        <div className="flex justify-between text-sm mb-2">
          <span>{remaining===0? "🎉 حصلت على شحن مجاني!" : `أضف ${formatPrice(remaining)} للشحن المجاني`}</span>
          <span className="text-[var(--color-text-muted)]">{formatPrice(subtotal)} / {formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
        </div>
        <div className="h-2 bg-black/30 rounded-full overflow-hidden"><div className="h-2 bg-[var(--color-success)] transition-all" style={{width: `${progress}%`}} /></div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="space-y-3">
          {items.map(i=>(
            <div key={i.id} className="flex gap-4 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <img src={i.image} alt={i.name} className="h-20 w-20 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="font-semibold">{i.name}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{i.selectedWeight} • {i.selectedFlavor} • Batch {i.batchNumber}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={()=>updateQty(i.id, i.qty-1)} className="h-8 w-8 grid place-items-center rounded-lg bg-black/30 border border-[var(--color-border)]">-</button>
                  <span className="w-8 text-center font-bold">{i.qty}</span>
                  <button onClick={()=>updateQty(i.id, i.qty+1)} className="h-8 w-8 grid place-items-center rounded-lg bg-black/30 border border-[var(--color-border)]">+</button>
                  <button onClick={()=>remove(i.id)} className="ms-auto text-sm text-red-400">حذف</button>
                </div>
              </div>
              <div className="font-bold">{formatPrice(i.price * i.qty)}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 h-fit sticky top-[88px]">
          <h3 className="font-bold">ملخص الطلب</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">المجموع الفرعي</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">الشحن (من غرداية)</span><span>{shipping===0? "مجاني" : formatPrice(shipping)}</span></div>
            <div className="flex justify-between font-extrabold text-lg border-t border-[var(--color-border)] pt-3"><span>الإجمالي</span><span>{formatPrice(subtotal + shipping)}</span></div>
          </div>
          <Link href="/checkout"><Button className="w-full mt-6 h-12 text-base">المتابعة للدفع عند الاستلام</Button></Link>
          <div className="mt-3 text-xs text-center text-[var(--color-text-muted)]">الدفع عند الاستلام فقط • بدون استرجاع — افحص منتجك عند التسليم</div>
        </div>
      </div>
    </div>
  );
}
