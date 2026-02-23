import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { siteConfig, seoConfig } from "@/config/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StickyMobileBar } from "@/components/sticky-mobile-bar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: seoConfig.description,
  metadataBase: new URL(seoConfig.baseUrl),
  openGraph: {
    title: siteConfig.name,
    description: seoConfig.description,
    type: "website",
    url: seoConfig.baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    site: seoConfig.twitterHandle,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${fraunces.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}

