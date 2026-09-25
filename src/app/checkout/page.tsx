"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const wilayas = ["غرداية", "الجزائر", "وهران", "قسنطينة", "عنابة", "البليدة", "ورقلة", "بسكرة", "أدرار", "الشلف", "سعيدة", "مستغانم", "تلمسان", "سطيف", "باتنة", "الجلفة"];

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 600;
  const total = subtotal + shipping;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const sendOtp = () => {
    if (phone.length < 9) return alert("أدخل رقم هاتف صحيح يبدأ بـ 06/07");
    setOtpSent(true);
    setTimeout(() => alert(`(تجريبي) كود OTP الخاص بك: 482917 - سينتهي بعد 5 دقائق`), 300);
  };
  const verifyOtp = () => {
    if (otp === "482917" || otp.length === 6) {
      setVerified(true);
      setStep(2);
    } else alert("كود غير صحيح");
  };

  const placeOrder = () => {
    const id = "GBD-" + Math.floor(Math.random() * 90000 + 10000);
    setOrderId(id);
    setStep(3);
    clear();
  };

  if (items.length === 0 && !orderId) {
    return <div className="mx-auto max-w-[720px] px-4 py-16 text-center">سلتك فارغة — <a href="/shop" className="text-[var(--color-accent)]">اذهب للمتجر</a></div>;
  }

  if (orderId) {
    return (
      <div className="mx-auto max-w-[720px] px-4 py-10 pb-24">
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-success)]/30 p-8 text-center">
          <div className="text-4xl mb-2">✓</div>
          <h1 className="text-2xl font-extrabold">تم تأكيد طلبك بنجاح!</h1>
          <div className="mt-2 inline-block rounded-full bg-black px-4 py-1 font-mono text-[var(--color-accent)]">رقم الطلب: {orderId}</div>
          <div className="mt-4 text-sm text-[var(--color-text-secondary)] leading-6">سيتم تجهيز طلبك من مستودع غرداية وشحنه عبر Nord Ouest خلال 24 ساعة. ستصلك رسالة SMS وواتساب للتتبع. التسليم 2-3 أيام حسب الولاية. الدفع عند الاستلام.</div>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/" className="px-6 py-3 rounded-xl bg-[var(--color-accent)] text-black font-bold">العودة للرئيسية</Link>
            <a href={`https://www.instagram.com/golden_body_desert/`} target="_blank" className="px-6 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">تابعنا على انستغرام</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[960px] px-4 py-6 pb-24">
      <h1 className="text-2xl font-extrabold">الدفع عند الاستلام — Checkout (خطوة واحدة + OTP)</h1>
      <div className="mt-2 flex gap-2 text-xs">
        <span className={`px-3 py-1 rounded-full ${step >= 1 ? "bg-[var(--color-accent)] text-black" : "bg-[var(--color-surface)]"}`}>1. التحقق</span>
        <span className={`px-3 py-1 rounded-full ${step >= 2 ? "bg-[var(--color-accent)] text-black" : "bg-[var(--color-surface)]"}`}>2. العنوان والشحن</span>
        <span className={`px-3 py-1 rounded-full ${step >= 3 ? "bg-[var(--color-accent)] text-black" : "bg-[var(--color-surface)]"}`}>3. التأكيد</span>
      </div>

      <div className="mt-6 grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6">
          {step === 1 && (
            <div>
              <h2 className="font-bold">تحقق من رقم هاتفك (OTP)</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">لتجنب الطلبات الوهمية، نرسل كود تحقق لمرة واحدة.</p>
              <div className="mt-4 space-y-3">
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06XXXXXXXX" className="w-full h-12 rounded-xl bg-black/30 border border-[var(--color-border)] px-4" />
                {!otpSent ? (
                  <Button onClick={sendOtp} className="w-full">إرسال كود OTP</Button>
                ) : (
                  <div className="space-y-3">
                    <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="أدخل الكود المكون من 6 أرقام" className="w-full h-12 rounded-xl bg-black/30 border border-[var(--color-border)] px-4 text-center tracking-widest" maxLength={6} />
                    <Button onClick={verifyOtp} className="w-full">تأكيد الكود</Button>
                    <button onClick={sendOtp} className="w-full text-sm text-[var(--color-accent)]">إعادة الإرسال بعد 60ث</button>
                    {verified && <div className="text-sm text-emerald-400">✓ تم التحقق بنجاح</div>}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-bold">بيانات الشحن — من غرداية</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <input placeholder="الاسم الكامل" className="h-11 rounded-xl bg-black/30 border border-[var(--color-border)] px-4" />
                <input value={phone} readOnly className="h-11 rounded-xl bg-black/20 border border-[var(--color-border)] px-4 opacity-70" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <select className="h-11 rounded-xl bg-black/30 border border-[var(--color-border)] px-4">
                  {wilayas.map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>
                <input placeholder="البلدية" className="h-11 rounded-xl bg-black/30 border border-[var(--color-border)] px-4" />
              </div>
              <input placeholder="العنوان التفصيلي (الحي، الشارع)" className="w-full h-11 rounded-xl bg-black/30 border border-[var(--color-border)] px-4" />
              <div>
                <div className="font-semibold mb-2">شركة الشحن</div>
                <label className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-accent)] bg-[var(--color-accent)]/10">
                  <span className="flex items-center gap-2"><input type="radio" defaultChecked /> Nord Ouest Express (موصى به)</span><span className="text-sm">{shipping === 0 ? "مجاني" : formatPrice(shipping)}</span>
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] mt-2">
                  <span className="flex items-center gap-2"><input type="radio" /> ZR Express</span><span className="text-sm">{formatPrice(600)}</span>
                </label>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>رجوع</Button>
                <Button onClick={() => setStep(3)} className="flex-1">مراجعة الطلب</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-bold">مراجعة وتأكيد</h2>
              <div className="rounded-xl bg-black/20 p-3 text-sm space-y-1">
                <div>الدفع: <span className="font-bold">عند الاستلام (COD)</span></div>
                <div>الشحن: من غرداية • Nord Ouest</div>
                <div className="text-xs text-[var(--color-text-muted)]">بدون استرجاع — يرجى فحص المنتج عند التسليم. تحقق من تاريخ الانتهاء و Batch Number.</div>
              </div>
              <label className="flex gap-2 text-sm"><input type="checkbox" defaultChecked /> أوافق على الشروط والتنبيه الطبي (المكمل ليس دواءً)</label>
              <Button onClick={placeOrder} className="w-full h-12 text-base">تأكيد الطلب — Nord Ouest سيتصل بك</Button>
              <button onClick={() => setStep(2)} className="w-full text-sm text-[var(--color-text-secondary)]">تعديل العنوان</button>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 h-fit">
          <h3 className="font-bold">ملخص ({items.length})</h3>
          <div className="mt-3 space-y-2 max-h-[220px] overflow-auto">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm"><span className="truncate">{i.name} ×{i.qty}</span><span>{formatPrice(i.price * i.qty)}</span></div>
            ))}
          </div>
          <div className="mt-4 border-t border-[var(--color-border)] pt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span>المجموع</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span>الشحن</span><span>{shipping === 0 ? "مجاني" : formatPrice(shipping)}</span></div>
            <div className="flex justify-between font-extrabold text-lg"><span>الإجمالي (COD)</span><span>{formatPrice(total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
