"use client";

import { useState, useEffect, useRef } from "react";
import imageCompression from "browser-image-compression";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  sizes?: {
    photo?: string;
    signature?: string;
  };
  maxSizeKB?: number;
  category?: "ssc" | "passport" | "compress";
  faqs?: { question: string; answer: string }[];

  content?: {
    intro: string;
    steps: string[];
    extra: string;
  };
};

const relatedLinks = {
  ssc: [
    { href: "/ssc/photo", label: "SSC Photo Size Tool" },
    { href: "/ssc/signature", label: "SSC Signature Tool" },
    { href: "/ssc/photo-50kb", label: "Compress SSC Photo to 50KB" },
  ],
  passport: [
    { href: "/passport/photo", label: "Passport Photo Maker" },
    { href: "/passport/india-photo", label: "Passport Photo India" },
    { href: "/passport/photo-50kb", label: "Compress Passport Photo" },
  ],
  compress: [
    { href: "/compress/image-50kb", label: "Compress Image to 50KB" },
    { href: "/compress/image-20kb", label: "Compress Image to 20KB" },
    { href: "/compress/pdf-100kb", label: "Compress PDF to 100KB" },
  ],
};

export default function ToolPage({
  title,
  description,
  sizes,
  faqs,
  maxSizeKB = 50, // ✅ default fix
  category,
  content,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [compressed, setCompressed] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const [originalURL, setOriginalURL] = useState<string | null>(null);
  const [compressedURL, setCompressedURL] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (originalURL) URL.revokeObjectURL(originalURL);
      if (compressedURL) URL.revokeObjectURL(compressedURL);
    };
  }, [originalURL, compressedURL]);

  const compressToTarget = async (file: File) => {
    let quality = 0.9;
    let best: Blob | null = null;

    while (quality >= 0.1) {
      const result = await imageCompression(file, {
        maxSizeMB: maxSizeKB / 1024,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        initialQuality: quality,
      });

      if (!best || result.size < best.size) best = result;
      if (result.size / 1024 <= maxSizeKB) return result;

      quality -= 0.1;
    }

    return best!;
  };

  const handleFile = async (f: File) => {
    setFile(f);
    const original = URL.createObjectURL(f);
    setOriginalURL(original);

    setLoading(true);
    const result = await compressToTarget(f);
    setCompressed(result);
    setCompressedURL(URL.createObjectURL(result));
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
      {content && (
        <div className="max-w-xl text-center text-gray-700 mb-6">
          <p>{content.intro}</p>
        </div>
      )}
      <p className="text-gray-600 mb-6 text-center max-w-md">{description}</p>

      {/* Upload */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed p-6 rounded cursor-pointer bg-white text-center mb-4"
      >
        Upload Image
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />

      {loading && <p>Processing...</p>}

      {/* Preview */}
      {originalURL && compressedURL && (
        <div className="flex gap-4 mt-6 flex-col md:flex-row">
          <div className="text-center">
            <p>Original</p>
            <img src={originalURL} className="max-w-xs rounded shadow" />
          </div>

          <div className="text-center">
            <p>Compressed</p>
            <img src={compressedURL} className="max-w-xs rounded shadow" />
          </div>
        </div>
      )}

      {/* Download */}
      {compressed && (
        <button
          onClick={() => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(compressed);
            a.download = "compressed.jpg";
            a.click();
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download
        </button>
      )}

      {/* Sizes */}
      <div className="mt-6 text-sm">
        <p>
          <b>Photo:</b> {sizes?.photo || "20KB–50KB"}
        </p>
        <p>
          <b>Signature:</b> {sizes?.signature || "10KB–20KB"}
        </p>
      </div>

      {/* FAQ */}
      {faqs && (
        <div className="mt-8 max-w-xl">
          <h2 className="font-semibold mb-3">FAQs</h2>
          {faqs.map((f, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{f.question}</p>
              <p className="text-sm text-gray-600">{f.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Home Link */}
      <div className="mt-10 text-blue-600 text-sm flex flex-col gap-2">
        <Link href="/">Home</Link>
      </div>

      {/* Auto Related Links */}
      {category && (
        <div className="mt-12 max-w-xl text-left">
          <h2 className="text-lg font-semibold mb-3">Related Tools</h2>

          <div className="flex flex-col gap-2 text-blue-600 text-sm">
            {relatedLinks[category].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className="hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 max-w-xl text-left">
        <h2 className="text-lg font-semibold mb-3">HOW TO</h2>

        {content?.steps && (
          <div className="mt-10 max-w-xl text-left">
            <h2 className="text-xl font-semibold mb-3">
              How to {title.toLowerCase()}?
            </h2>

            <ol className="list-decimal pl-5 text-gray-700 space-y-1">
              {content.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {content?.extra && (
        <div className="mt-6 max-w-xl text-gray-700">
          <p>{content.extra}</p>
        </div>
      )}

      {faqs && faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.answer,
                },
              })),
            }),
          }}
        />
      )}
    </main>
  );
}
