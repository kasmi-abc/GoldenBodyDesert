export function TopBar() {
  return (
    <div className="bg-[#0B0E13] border-b border-[var(--color-border)] text-center text-xs sm:text-sm py-2 px-4 flex items-center justify-center gap-2">
      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
      <span className="text-[var(--color-text-secondary)]">شحن مجاني لكل الطلبات فوق <span className="text-[var(--color-accent)] font-bold">9000 دج</span> — الانطلاق من غرداية إلى 69 ولاية عبر Nord Ouest</span>
      <span className="hidden sm:inline-flex items-center gap-1 ms-4 text-[var(--color-text-muted)]">| <span className="text-white">0698066050</span></span>
    </div>
  );
}
