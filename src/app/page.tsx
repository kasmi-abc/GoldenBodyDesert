import { Hero } from "@/components/sections/Hero";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories, brands, bundles } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

const guides = [
  { slug: "whey-guide", title: "دليل اختيار البروتين", desc: "الفرق بين Whey و Isolate و Casein", img: "/images/blog/whey-guide.jpg" },
  { slug: "creatine-guide", title: "الكرياتين: كيف ومتى", desc: "الجرعة، التحميل، والتحذيرات", img: "/images/blog/creatine-guide.jpg" },
  { slug: "warnings", title: "تحذيرات مهمة", desc: "منتجاتنا مكملات وليست أدوية", img: "/images/blog/bmi-calculator.jpg" },
];

export default function HomePage() {
  return (
    <div className="py-6 space-y-8 pb-24 lg:pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-[var(--color-border)]/60">
          {[
            { label: "أصلي 100% موثق", sub: "Batch & Expiry" },
            { label: "شحن 69 ولاية", sub: "Livraison par Nord Ouest" },
            { label: "دفع عند الاستلام", sub: "آمن ومضمون" },
            { label: "شحن مجاني +9000دج", sub: "من غرداية" },
            { label: "دعم 0698066050", sub: "انستغرام • هاتف" },
          ].map((i) => (
            <div key={i.label} className="flex items-center gap-2.5">
              <span className="h-7 w-7 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/20 grid place-items-center text-[var(--color-accent)] text-xs">✓</span>
              <div className="leading-tight">
                <div className="text-xs font-bold">{i.label}</div>
                <div className="text-[11px] text-[var(--color-text-muted)]">{i.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl font-extrabold">اختر هدفك</h2>
          <span className="text-xs text-[var(--color-text-muted)]">69 ولاية • توصيل 24-48س</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "زيادة الكتلة العضلية", slug: "protein", desc: "بروتين + كرياتين" },
            { label: "حرق الدهون والتنشيف", slug: "fatburner", desc: "حوارق دهون" },
            { label: "الطاقة والتركيز", slug: "preworkout", desc: "Pre-workout" },
            { label: "الفيتامينات والصحة", slug: "vitamins", desc: "Omega 3 وغيرها" },
          ].map((g) => (
            <Link key={g.slug} href={`/shop?cat=${g.slug}`} className="rounded-2xl p-5 text-center bg-[var(--color-surface)] border border-[var(--color-accent)]/15 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface-hover)] transition group">
              <div className="h-10 w-10 mx-auto rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 grid place-items-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-black transition">◆</div>
              <div className="font-bold text-sm mt-3">{g.label}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">{g.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl font-extrabold">التصنيفات الرئيسية</h2>
          <Link href="/shop" className="text-sm text-[var(--color-accent)]">عرض الكل →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.slice(0, 6).map((c) => (
            <Link key={c.slug} href={`/shop?cat=${c.slug}`} className="group rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div className="relative h-28 w-full overflow-hidden bg-white">
                <Image src={c.image} alt={c.name} fill sizes="(max-width: 768px) 50vw, 16vw" className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-3">
                <div className="font-semibold text-sm">{c.name}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{c.count} منتج</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold">الأكثر مبيعاً</h2>
          <div className="hidden sm:flex gap-2">
            <Link href="/shop?sort=best" className="px-3 py-1 rounded-full bg-[var(--color-accent)] text-black text-xs font-bold">الأكثر مبيعاً</Link>
            <Link href="/shop?sort=new" className="px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-xs">الجديد</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] py-5 overflow-hidden">
          <p className="text-center text-xs tracking-[0.15em] text-[var(--color-text-muted)]">علامات تجارية موثوقة — 69 ولاية</p>
          <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar px-4 justify-center flex-wrap">
            {brands.map((b) => (
              <Image key={b.name} src={b.src} alt={b.name} width={120} height={48} className="h-12 w-auto object-contain bg-white border border-[var(--color-border)] px-4 py-2 rounded-full shrink-0" />
            ))}
          </div>
          <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">منتجات أصلية 100% • فواتير وضمان</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#0B0E13] border border-[var(--color-border)] p-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-white">الحزم والعروض الذكية</h2>
              <p className="text-sm text-white/60">وفّر أكثر مع الـ Stacks المتكاملة</p>
            </div>
            <Link href="/shop" className="hidden sm:inline-flex bg-white text-black px-5 py-2 rounded-full text-xs font-black">كل الـ Bundles</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {bundles.map((b) => (
              <div key={b.id} className="group flex flex-col rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-card)] transition-all">
                <div className="relative aspect-square bg-[#0F1115] overflow-hidden">
                  <Image src={b.image} alt={b.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                  <div className="absolute top-3 start-3 bg-[var(--color-accent)] text-black px-2.5 py-1 rounded-full text-xs font-bold">{b.badge}</div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold leading-5 line-clamp-1">{b.name}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">{b.items.join(" • ")}</p>
                  <div className="flex items-baseline gap-2 mt-3">
                    <span className="text-lg font-extrabold">{b.price} دج</span>
                    <span className="text-sm text-[var(--color-text-muted)] line-through">{b.oldPrice} دج</span>
                  </div>
                  <Link href="/shop" className="mt-4 block text-center bg-[var(--color-accent)] text-black py-3 rounded-full font-bold text-sm hover:bg-[#B89A5A] transition">عرض الـ Pack</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-extrabold mb-4">دليل المكملات</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {guides.map((a) => (
            <Link key={a.slug} href={`/guide/${a.slug}`} className="group rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-accent)]/30 transition">
              <div className="relative h-36 w-full overflow-hidden">
                <Image src={a.img} alt={a.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-5">
                <div className="font-bold group-hover:text-[var(--color-accent)] transition">{a.title}</div>
                <div className="text-sm text-[var(--color-text-secondary)] mt-1">{a.desc}</div>
                <div className="text-xs text-[var(--color-accent)] mt-3">قراءة المقال →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-extrabold mb-4">آراء زبائننا</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: "أمين - وهران", text: "وصلتني في 24 ساعة من غرداية، منتج أصلي." },
            { name: "سارة - الجزائر", text: "Omega 3 ممتاز، خدمة انستغرام سريعة." },
            { name: "ياسين - قسنطينة", text: "باك التنشيف ساعدني أنشف 6كغ." },
          ].map((t) => (
            <div key={t.name} className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
              <div className="font-bold text-sm">
                {t.name} <span className="text-[#F59E0B]">★★★★★</span>
              </div>
              <div className="text-sm text-[var(--color-text-secondary)] mt-2">&quot;{t.text}&quot;</div>
              <div className="text-xs text-emerald-400 mt-2">شراء مؤكد ✓</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-extrabold mb-4 text-center">Golden Body Desert في أرقام</h2>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
            <div className="font-black text-2xl">5000+</div>
            <div className="text-xs text-[var(--color-text-muted)]">عميل سعيد</div>
          </div>
          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
            <div className="font-black text-2xl">69</div>
            <div className="text-xs text-[var(--color-text-muted)]">ولاية توصيل</div>
          </div>
          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
            <div className="font-black text-2xl">24h</div>
            <div className="text-xs text-[var(--color-text-muted)]">تجهيز من غرداية</div>
          </div>
        </div>
      </section>
    </div>
  );
}
