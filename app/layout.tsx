import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import GlobalNav from "@/components/site/GlobalNav";
import SiteFooter from "@/components/site/SiteFooter";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
});

export const metadata: Metadata = {
  title: "printtie",
  description: "작가와 팬을 잇는, 작품 발견에서 배송까지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={atkinson.variable}>
      <body className="min-h-dvh bg-printtie-background text-printtie-text font-atkinson">
        <GlobalNav />
        <div className="pt-[72px]">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
