import type { Metadata } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New, Space_Mono } from "next/font/google";
import "./globals.css";

const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Ashutosh Sagar — The Wind Chronicle",
  description: "Portfolio of Ashutosh Sagar, full-stack creative — a Naruto-themed quest log.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${shippori.variable} ${zenKaku.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
