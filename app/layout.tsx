import type { Metadata, Viewport } from "next";
// Fonts are bundled from npm, so the site never waits on Google Fonts at runtime.
import "@fontsource/instrument-serif/400.css";
import "@fontsource-variable/dm-sans/index.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
    // Preview image when a link is shared (LinkedIn, iMessage, Slack)
    images: [{ url: "/images/hero-blue-sky.jpg", width: 1376, height: 1696, alt: "Katrina Saya Webb" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f7f5f0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-svh">
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
