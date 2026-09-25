export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function sanitizeInput(input: string, maxLen = 100): string {
  return input.replace(/[<>`$]/g, "").slice(0, maxLen).trim();
}
export function formatPrice(price: number) {
  return new Intl.NumberFormat("ar-DZ").format(price) + " دج";
}
export function discountPercent(original: number, current: number) {
  return Math.round(((original - current) / original) * 100);
}
export const FREE_SHIPPING_THRESHOLD = 9000;
export const ORIGIN_WILAYA = "غرداية";
export const STORE_PHONE = "0698066050";
export const STORE_INSTAGRAM = "https://www.instagram.com/golden_body_desert/";
