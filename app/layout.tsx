// /app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FixMyDocs - Free Image & PDF Tools",
  description:
    "Compress images, resize photos, and optimize PDFs online for free. No signup required.",
  verification: {
    google: "TI8r6zW1uqvtlu49_YKSPN086MYwLLFcRY9tO_DhqHM",
  },
  openGraph: {
    title: "FixMyDocs - Free Image & PDF Tools",
    description:
      "Compress images, resize photos, and optimize PDFs online for free. Works on all devices.",
    url: "https://fixmydocs.in",
    siteName: "FixMyDocs",
    images: [
      {
        url: "https://fixmydocs.in/og-image.png", // optional, recommended for social previews
        width: 1200,
        height: 630,
        alt: "FixMyDocs Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FixMyDocs - Free Image & PDF Tools",
    description:
      "Compress images, resize photos, and optimize PDFs online for free.",
    images: ["https://fixmydocs.in/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}