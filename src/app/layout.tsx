import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { CartProvider } from "@/store/cart";

const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-plex-arabic", display: "swap", preload: true });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Golden Body Desert | مكملات أصلية 100% - غرداية 69 ولاية",
    template: "%s | Golden Body Desert",
  },
  description: "متجر Golden Body Desert - بروتين، كرياتين، فيتامينات، أحماض أمينية. شحن مجاني فوق 9000 دج من غرداية عبر Nord Ouest. دفع عند الاستلام. أصلي 100% Batch موثق.",
  openGraph: { title: "Golden Body Desert", description: "مكملات أصلية من غرداية", images: ["/logo.jpg"], locale: "ar_DZ", type: "website" },
  robots: { index: true, follow: true },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${plexArabic.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <TopBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
