// /components/ToolPage.tsx
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
    { href: "/ssc/photo-20kb", label: "SSC Photo 20KB" },
    { href: "/ssc/photo-30kb", label: "SSC Photo 30KB" },
    { href: "/ssc/photo-50kb", label: "SSC Photo 50KB" },
    { href: "/ssc/signature-10kb", label: "SSC Signature 10KB" },
    { href: "/ssc/signature-20kb", label: "SSC Signature 20KB" },
  ],
  passport: [{ href: "/passport/photo", label: "Passport Photo Tool" }],
  compress: [
    { href: "/compress/image-50kb", label: "Compress Image 50KB" },
    { href: "/compress/image-20kb", label: "Compress Image 20KB" },
    { href: "/compress/pdf-100kb", label: "Compress PDF 100KB" },
  ],
};

export default function ToolPage({
  title,
  description,
  sizes,
  faqs,
  maxSizeKB = 50,
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
    setOriginalURL(URL.createObjectURL(f));

    setLoading(true);
    const result = await compressToTarget(f);
    setCompressed(result);
    setCompressedURL(URL.createObjectURL(result));
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center">{title}</h1>

      <p className="text-xs text-gray-500 mt-1">
        Free online tool for instant processing
      </p>

      {content && (
        <div className="max-w-xl text-center text-gray-700 mt-4">
          <p>{content.intro}</p>
        </div>
      )}

      <p className="text-gray-600 mt-4 text-center max-w-md">{description}</p>

      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed p-6 rounded cursor-pointer bg-white text-center mt-6"
      >
        <p className="text-gray-600">Click to upload or drag & drop image</p>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />

      {loading && <p className="mt-4">Processing...</p>}

{originalURL && compressedURL && compressed && (
  <div className="flex gap-4 mt-6 flex-col md:flex-row">
    <div className="text-center">
      <p>Original</p>
      <img src={originalURL} className="max-w-xs rounded shadow" />
    </div>

    <div className="text-center">
      <p>Compressed</p>
      <img src={compressedURL} className="max-w-xs rounded shadow" />
      <p className="text-green-600 text-sm mt-1">
        {(compressed.size / 1024).toFixed(2)} KB
      </p>
    </div>
  </div>
)}

      {compressed && (
        <button
          onClick={() => {
            const url = URL.createObjectURL(compressed);
            const a = document.createElement("a");
            a.href = url;
            a.download = "compressed_" + file?.name.replace(/\s+/g, "_");
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download
        </button>
      )}

      <div className="mt-6 text-sm">
        <p>
          <b>Photo:</b> {sizes?.photo || "20KB–50KB"}
        </p>
        <p>
          <b>Signature:</b> {sizes?.signature || "10KB–20KB"}
        </p>
      </div>

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

      <div className="mt-10 text-blue-600 text-sm flex flex-col gap-2">
        <Link href="/">Home</Link>
      </div>

      {category && (
        <div className="mt-12 max-w-xl">
          <h2 className="text-lg font-semibold mb-3">Related Tools</h2>
          <div className="flex flex-col gap-2 text-blue-600 text-sm">
            {relatedLinks[category].map((link) => (
              <Link key={link.href} href={link.href} prefetch={true}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {content?.steps && (
        <ol className="mt-4 text-sm text-gray-700 list-decimal pl-5">
          {content.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      )}

      {content?.extra && (
        <p className="mt-4 text-sm text-gray-600">{content.extra}</p>
      )}
    </main>
  );
}
