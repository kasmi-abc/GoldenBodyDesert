import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { heroImage } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[24px] bg-[#111111] border border-[var(--color-border)]">
      <Image src={heroImage} alt="Golden Body Athlete" fill priority sizes="100vw" className="object-cover opacity-[0.14]" />
      <div className="absolute inset-0 bg-gradient-to-l from-[var(--color-primary)]/12 to-transparent" />
      <div className="absolute -left-20 -top-20 h-[480px] w-[480px] rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
      <div className="relative grid lg:grid-cols-2 gap-8 p-6 sm:p-10 lg:p-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/20 px-3 py-1 text-xs text-[var(--color-accent)]">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse" /> توصيل 69 ولاية من غرداية • Livraison par Nord Ouest
          </div>
          <h1 className="mt-4 text-[32px] sm:text-[42px] font-extrabold leading-[0.95] tracking-tight">
            قوتك تبدأ <span className="text-[var(--color-accent)]">من هنا</span>
            <br />
            مكملات أصلية،
            <br />
            نتائج موثوقة.
          </h1>
          <p className="mt-4 text-[var(--color-text-secondary)] leading-7 max-w-[52ch]">تشكيلة مختارة من أفضل العلامات العالمية — بروتين، كرياتين، فيتامينات. تواريخ صلاحية واضحة، Batch Number لكل منتج، وشحن سريع لكل الولايات. الدفع عند الاستلام.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/shop">
              <Button size="lg">تسوق الآن</Button>
            </Link>
            <Link href="/shop?sort=discount">
              <Button variant="outline" size="lg">
                عروض اليوم
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -end-6 h-32 w-32 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
          <div className="relative grid grid-cols-2 gap-4">
            <Image src="/images/products/whey-gold-standard.jpg" alt="whey" width={400} height={400} priority sizes="(max-width: 1024px) 50vw, 400px" className="rounded-2xl border border-[var(--color-border)] object-cover h-[280px] w-full bg-white p-2" />
            <Image src="/images/products/creatine-300.jpg" alt="creatine" width={400} height={400} sizes="(max-width: 1024px) 50vw, 400px" className="rounded-2xl border border-[var(--color-border)] object-cover h-[280px] w-full mt-8 bg-white p-2" />
          </div>
          <div className="absolute bottom-4 start-4 bg-white text-black rounded-2xl p-3 shadow-xl flex items-center gap-3">
            <Image src="/logo.jpg" alt="logo" width={40} height={40} className="h-10 w-10 rounded-full" />
            <div className="leading-tight">
              <div className="font-bold text-sm">Golden Body Desert</div>
              <div className="text-xs text-black/60">غرداية • 0698066050</div>
            </div>
            <div className="ms-2 bg-black text-white text-xs px-2 py-1 rounded-full">-20%</div>
          </div>
        </div>
      </div>
    </section>
  );
}
