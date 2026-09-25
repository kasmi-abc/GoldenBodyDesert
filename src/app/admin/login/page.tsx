"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!user.trim() || !pass.trim()) {
      setErr("أدخل البيانات");
      return;
    }
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.trim(), password: pass }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "بيانات غير صحيحة");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setErr("خطأ اتصال");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <form onSubmit={handle} className="w-full max-w-md rounded-2xl bg-[var(--color-surface)] border border-[var(--color-accent)]/20 p-8 shadow-xl">
        <div className="text-center">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-black border border-[var(--color-accent)]/30 grid place-items-center overflow-hidden">
            <img src="/logo.jpg" alt="logo" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-xl font-black mt-4 text-white">دخول الإدارة</h1>
          <p className="text-sm font-bold text-[var(--color-accent)] mt-1">Golden Body Desert</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">غرداية • وصول محدود</p>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-[var(--color-text-secondary)]">اسم المستخدم</label>
            <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="admin" className="mt-1 w-full h-12 rounded-xl bg-black/40 border border-[var(--color-border)] px-4 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20" required />
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--color-text-secondary)]">كلمة المرور</label>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" className="mt-1 w-full h-12 rounded-xl bg-black/40 border border-[var(--color-border)] px-4 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20" required />
          </div>
          {err && <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl p-3">{err}</p>}
          <button type="submit" className="w-full h-12 rounded-xl bg-[var(--color-accent)] text-black font-black hover:bg-[#B89A5A] transition">دخول لوحة التحكم</button>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] text-center mt-4">محمي - /admin/login</p>
      </form>
    </div>
  );
}
