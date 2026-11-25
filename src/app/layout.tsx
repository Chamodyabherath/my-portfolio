import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/frame";
import { Navigation } from "@/components/layout/navigation";
import { indexable, siteUrl } from "@/lib/metadata";
import { profile } from "@/data/profile";
import "./globals.css";
import "./editorial.css";

const metadataMono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
  weight: "400",
});

export const metadata: Metadata = {
  ...(siteUrl && { metadataBase: siteUrl }),
  title: { default: profile.name, template: `%s | ${profile.name}` },
  icons: { icon: "/icon.svg" },
  robots: { index: indexable, follow: indexable },
};

const themeScript =
  'try { if (localStorage.getItem("portfolio-theme") === "light") document.documentElement.dataset.theme = "light"; } catch {}';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${metadataMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
