import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE O.P | Official Site",
  description: "54歳の夏、難波で結成。THE O.P公式サイト。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "THE O.P | Official Site",
    description: "54歳、まだ夏の途中。",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "THE O.P" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
