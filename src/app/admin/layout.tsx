"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);

  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (isLogin) return;
    let cancelled = false;
    async function check() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (cancelled) return;
        if (res.ok) {
          setAuthed(true);
          return;
        }
        setAuthed(false);
        router.replace("/admin/login");
      } catch {
        if (cancelled) return;
        setAuthed(false);
        router.replace("/admin/login");
      }
    }
    check();
    return () => {
      cancelled = true;
    };
  }, [isLogin, router]);

  if (isLogin) {
    return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</div>;
  }

  if (authed === null) {
    return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center text-sm">جاري التحقق...</div>;
  }

  if (!authed) {
    return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center text-sm">يجب تسجيل الدخول</div>;
  }

  const isActive = (href: string) => pathname === href;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="logo" className="h-10 w-10 rounded-xl border border-[var(--color-border)] object-cover" />
          <div>
            <p className="font-black">لوحة تحكم Golden Body Desert</p>
            <p className="text-xs text-[var(--color-text-muted)]">غرداية • إدارة المنتجات والطلبات</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              router.push("/admin/login");
              router.refresh();
            }}
            className="bg-[var(--color-surface-hover)] border border-[var(--color-border)] px-4 py-2 rounded-full text-xs font-bold"
          >
            خروج
          </button>
          <Link href="/" className="bg-white text-black px-4 py-2 rounded-full text-xs font-black">المتجر</Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6 mt-6">
        <aside className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-3 h-fit sticky top-24">
          <nav className="space-y-1 text-sm font-bold">
            <Link href="/admin" className={`block px-4 py-2.5 rounded-xl ${isActive("/admin") ? "bg-[var(--color-accent)] text-black" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-white"}`}>نظرة عامة</Link>
            <Link href="/admin/products" className={`block px-4 py-2.5 rounded-xl ${isActive("/admin/products") ? "bg-[var(--color-accent)] text-black" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-white"}`}>المنتجات</Link>
            <Link href="/admin/orders" className={`block px-4 py-2.5 rounded-xl ${isActive("/admin/orders") ? "bg-[var(--color-accent)] text-black" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-white"}`}>الطلبات</Link>
          </nav>
        </aside>
        <div className="bg-transparent p-0 min-h-[500px]">{children}</div>
      </div>
    </div>
  );
}
