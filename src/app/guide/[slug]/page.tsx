import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const guides: Record<string, { title: string; desc: string; img: string; body: string }> = {
  "whey-guide": {
    title: "دليل اختيار البروتين",
    desc: "الفرق بين Whey و Isolate و Casein",
    img: "/images/blog/whey-guide.jpg",
    body: "البروتين هو أساس البناء العضلي. Whey Concentrate اقتصادي وسريع الامتصاص، Isolate نقي قليل اللاكتوز، Casein بطيء مثالي قبل النوم. اختر حسب هدفك وميزانيتك. جميع منتجاتنا أصلية مع Batch وتاريخ انتهاء واضح، مخزنة في غرداية.",
  },
  "creatine-guide": {
    title: "الكرياتين: كيف ومتى",
    desc: "الجرعة، التحميل، والتحذيرات",
    img: "/images/blog/creatine-guide.jpg",
    body: "الكرياتين مونوهيدرات هو الأكثر دراسة. جرعة 5غ يومياً بعد التحميل 20غ/5 أيام. اشرب ماء كافياً. لا ينصح للحوامل دون استشارة. احفظه بارداً وجافاً.",
  },
  warnings: {
    title: "تحذيرات مهمة",
    desc: "منتجاتنا مكملات وليست أدوية",
    img: "/images/blog/bmi-calculator.jpg",
    body: "المكملات لا تعوض نظاماً غذائياً متنوعاً ولا تغني عن استشارة طبية. لا نقدم وعود علاجية. افحص المنتج عند التسليم وتأكد من الختم وتاريخ الانتهاء.",
  },
};

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides[slug];
  if (!g) return notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pb-24">
      <div className="text-sm text-[var(--color-text-secondary)] mb-4">
        <Link href="/" className="hover:text-white">الرئيسية</Link> / <Link href="/#guide" className="hover:text-white">دليل المكملات</Link> / <span className="text-white">{g.title}</span>
      </div>
      <div className="relative h-[280px] w-full rounded-2xl overflow-hidden border border-[var(--color-border)]">
        <Image src={g.img} alt={g.title} fill className="object-cover" />
      </div>
      <h1 className="text-2xl font-extrabold mt-6">{g.title}</h1>
      <p className="text-sm text-[var(--color-text-secondary)] mt-2">{g.desc}</p>
      <div className="mt-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 leading-7 text-[var(--color-text-secondary)]">{g.body}</div>
      <Link href="/" className="inline-block mt-6 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-black font-bold">العودة للرئيسية</Link>
    </div>
  );
}
