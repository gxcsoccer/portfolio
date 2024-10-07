import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "高晓晨 (gxcsoccer) - JavaScript 程序员 & 开源爱好者",
  description: "高晓晨的个人网站 - JavaScript 开发者和开源贡献者",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className={inter.variable}>
      <body className="font-sans antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
