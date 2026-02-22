import type { Metadata } from "next";
import "./globals.css";

import { Footer } from "./components/Footer";
import { SiteNav } from "./components/SiteNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://jobs.luciovilla.com"),
  title: "Journalism Jobs",
  description:
    "Journalism jobs focused on DC, Maryland, Virginia and New York.",
  openGraph: {
    title: "Journalism Jobs",
    description:
      "Journalism jobs focused on DC, Maryland, Virginia and New York.",
    url: "/",
    siteName: "Journalism Jobs",
    images: [
      {
        url: "/share.png",
        width: 1200,
        height: 630,
        alt: "Journalism Jobs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journalism Jobs",
    description:
      "Journalism jobs focused on DC, Maryland, Virginia and New York.",
    images: ["/share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
