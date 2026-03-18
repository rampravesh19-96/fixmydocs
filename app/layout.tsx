import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Compress Image to 50KB Online Free | FixMyDocs",
  description:
    "Compress image to 50KB online for free. Reduce image size instantly without losing quality.",
  keywords: [
    "compress image to 50kb",
    "image compressor 50kb",
    "reduce image size online",
  ],
  verification: {
    google: "TI8r6zW1uqvtlu49_YKSPN086MYwLLFcRY9tO_DhqHM",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
  src="https://www.googletagmanager.com/gtag/js?id=G-LQDNZRTPEM"
  strategy="afterInteractive"
/>

<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-LQDNZRTPEM');
  `}
</Script>

{/* ✅ JSON-LD Schema */}
<Script
  id="schema"
  type="application/ld+json"
  strategy="afterInteractive"
>
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Compress Image to 50KB Online Free",
    description:
      "Reduce image size to 50KB instantly without losing quality.",
    url: "https://fixmydocs.in",
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How to compress image to 50KB?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Upload your image and it will be compressed to 50KB or below.",
          },
        },
        {
          "@type": "Question",
          name: "Is this tool free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, it is completely free and requires no login.",
          },
        },
      ],
    },
  })}
</Script>
      </body>
    </html>
  );
}