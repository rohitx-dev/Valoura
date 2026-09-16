import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "../components/layout/site-header";
import { SiteFooter } from "../components/layout/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valoura | Find Your Wedding Vendors",
  description:
    "Discover wedding venues, photographers, makeup artists and more with Valoura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only z-50 rounded bg-brand px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}