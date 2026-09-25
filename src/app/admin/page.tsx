export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold">لوحة التحكم — Admin Dashboard</h1>
      <p className="text-sm text-zinc-500">الأدوار: Admin / Store Manager / Inventory Manager (FIFO) / Support / Marketing / Content / Finance</p>

      <div className="mt-6 grid md:grid-cols-4 gap-4">
        {[
          { k: "المبيعات اليوم", v: "42,500 دج" },
          { k: "الطلبات", v: "18" },
          { k: "متوسط السلة", v: "8,900 دج" },
          { k: "منخفض المخزون", v: "3 منتجات" },
        ].map((s) => <div key={s.k} className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5"><div className="text-xs text-[var(--color-text-muted)]">{s.k}</div><div className="text-xl font-extrabold mt-1">{s.v}</div></div>)}
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
          <h3 className="font-bold">إدارة المنتجات — Variants + SKU + Batch + Expiry (FIFO)</h3>
          <div className="mt-3 text-sm text-[var(--color-text-secondary)]">إضافة منتج: اسم عربي/فرنسي، علامة، تصنيف، صور (Cloudinary), SKU فريد، باركود، سعر، سعر مقارن، تكلفة، مخزون، حد تنبيه، وزن/أبعاد، Nutrition Facts، مكونات، SEO.</div>
          <div className="mt-3 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 text-xs">مثال: Gold Standard 2.5كغ — Batch ON2026A12 — انتهاء 2027-06-15 — مستودع غرداية — FIFO: يُصرف الأقدم أولاً.</div>
        </div>
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
          <h3 className="font-bold">المخزون — غرداية فقط</h3>
          <div className="mt-3 text-sm text-[var(--color-text-secondary)]">سجل حركة (Ledger): كل دخول/خروج مع السبب. تنبيه انخفاض & منتهي الصلاحية. جرد يدوي.</div>
          <table className="mt-3 w-full text-xs border border-[var(--color-border)] rounded-xl overflow-hidden">
            <thead className="bg-black/30"><tr><th className="p-2">SKU</th><th className="p-2">Batch</th><th className="p-2">انتهاء</th><th className="p-2">مخزون</th></tr></thead>
            <tbody><tr><td className="p-2">ON-GOLD-25</td><td className="p-2">ON2026A12</td><td className="p-2">2027-06-15</td><td className="p-2">12</td></tr><tr><td className="p-2">MP-CRE-500</td><td className="p-2">MP2026B04</td><td className="p-2">2027-03-20</td><td className="p-2 text-amber-400">3 ⚠</td></tr></tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
        <h3 className="font-bold">الطلبات — Nord Ouest Webhook + OTP Verified</h3>
        <div className="mt-3 grid md:grid-cols-5 gap-2 text-xs">
          {["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => <div key={s} className="rounded-xl bg-black/30 border border-[var(--color-border)] p-3 text-center">{s}</div>)}
        </div>
        <div className="mt-3 text-xs text-[var(--color-text-muted)]">الدفع COD فقط — Idempotency يمنع التكرار — تتبع عبر Nord Ouest API — لا يوجد استرجاع.</div>
      </div>
    </div>
  );
}
