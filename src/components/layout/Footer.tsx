import Link from "next/link";
import { STORE_PHONE, STORE_INSTAGRAM } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--color-border)] bg-[#0B0E13]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.jpg" alt="logo" className="h-10 w-10 rounded-full" />
            <div>
              <div className="font-extrabold text-sm">GOLDEN BODY DESERT</div>
              <div className="text-xs text-[var(--color-accent)]">غرداية - 69 ولاية</div>
            </div>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] leading-6">متجر مكملات أصلي 100% — نوفر بروتين، كرياتين، فيتامينات ومنتجات رياضية مع شحن سريع من غرداية عبر Nord Ouest. المنتجات ليست أدوية ولا تغني عن استشارة الطبيب.</p>
          <div className="mt-4 flex gap-2">
            <a href={STORE_INSTAGRAM} target="_blank" aria-label="Instagram" className="h-9 w-9 grid place-items-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={`tel:${STORE_PHONE}`} className="h-9 px-3 grid place-items-center rounded-lg bg-[var(--color-accent)] text-black text-sm font-bold">{STORE_PHONE}</a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-3">التصنيفات</h4>
          <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <li><Link href="/shop?cat=protein">البروتينات</Link></li>
            <li><Link href="/shop?cat=creatine">الكرياتين</Link></li>
            <li><Link href="/shop?cat=preworkout">ما قبل التمرين</Link></li>
            <li><Link href="/shop?cat=vitamins">الفيتامينات</Link></li>
            <li><Link href="/shop?cat=bars">ألواح الطاقة</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">المساعدة</h4>
          <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <li><Link href="/shipping">الشحن والتوصيل</Link></li>
            <li><Link href="/faq">الأسئلة الشائعة</Link></li>
            <li><Link href="/contact">تواصل معنا</Link></li>
            <li><Link href="/about">من نحن</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">قانوني</h4>
          <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <li><Link href="/privacy">الخصوصية</Link></li>
            <li><Link href="/terms">شروط الاستخدام</Link></li>
            <li><Link href="/medical-disclaimer">التنبيه الطبي</Link></li>
          </ul>
          <div className="mt-4 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">الدفع عند الاستلام فقط (COD). الشحن مجاني فوق 9000 دج. المستودع: غرداية.</div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-4 text-center text-xs text-[var(--color-text-muted)]">
        <div>© {new Date().getFullYear()} Golden Body Desert — جميع الحقوق محفوظة. Livraison 69 wilayas par Nord Ouest & ZR Express. <Link href="/admin/login" className="opacity-30 hover:opacity-100">admin</Link></div>
        <div className="mt-2">
          تم تطوير المتجر بواسطة <a href="https://www.instagram.com/abdelkader_haith/" target="_blank" className="text-[var(--color-accent)] hover:underline font-bold">Kasmi .H dev</a>
        </div>
      </div>
    </footer>
  );
}
