"use client";
// /app/page.tsx

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import Link from "next/link";

// ✅ Google Analytics
const sendPageView = (path: string) => {
  // @ts-ignore
  if (typeof window.gtag !== "undefined") {
    // @ts-ignore
    window.gtag("config", "G-LQDNZRTPEM", {
      page_path: path,
    });
  }
};

// ✅ Compression Engine
async function compressToTarget(file: File, targetSizeKB = 50) {
  let quality = 0.9;
  let bestResult: Blob | null = null;

  while (quality >= 0.1) {
    const result = await imageCompression(file, {
      maxSizeMB: targetSizeKB / 1024,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
      initialQuality: quality,
    });

    const sizeKB = result.size / 1024;

    if (!bestResult || sizeKB < bestResult.size / 1024) {
      bestResult = result;
    }

    if (sizeKB <= targetSizeKB) return result;

    quality -= 0.1;
  }

  return bestResult!;
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const [originalURL, setOriginalURL] = useState<string | null>(null);
  const [compressedURL, setCompressedURL] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    sendPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (originalURL) URL.revokeObjectURL(originalURL);
      if (compressedURL) URL.revokeObjectURL(compressedURL);
    };
  }, [originalURL, compressedURL]);

  const handleFile = async (file: File) => {
    setSelectedFile(file);
    setCompressedFile(null);
    setCompressedURL(null);

    const original = URL.createObjectURL(file);
    setOriginalURL(original);

    try {
      setLoading(true);
      const compressed = await compressToTarget(file, 50);
      setCompressedFile(compressed);
      setCompressedURL(URL.createObjectURL(compressed));
    } catch {
      alert("Compression failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      {/* 🔥 HERO */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Compress Image to 50KB Online Free
      </h1>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        Free online tool to compress images to 50KB for forms, SSC, passport,
        and job applications.
      </p>

      {/* 🔥 UPLOAD */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
          }
        }}
        className="w-full max-w-md border-2 border-dashed border-gray-300 p-6 text-center rounded cursor-pointer bg-white mb-4"
      >
        Upload or Drag Image
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
        }}
        className="hidden"
      />

      {loading && <p className="text-blue-600">Compressing...</p>}

      {/* 🔥 RESULT */}
      {originalURL && compressedURL && (
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <img src={originalURL} className="max-w-xs rounded shadow" />
          <img src={compressedURL} className="max-w-xs rounded shadow" />
        </div>
      )}

      {/* 🔥 ACTION */}
      {compressedFile && selectedFile && (
        <button
          onClick={() => {
            const url = URL.createObjectURL(compressedFile);
            const a = document.createElement("a");
            a.href = url;
            a.download = "compressed_" + selectedFile.name;
            a.click();
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download
        </button>
      )}

      {/* 🔥 SEO CONTENT */}
      <div className="mt-12 max-w-xl text-left">
        <h2 className="text-xl font-semibold mb-4">
          Free Image Compressor for SSC, Passport & Forms
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          Compress images to exact KB size like 20KB, 50KB, or 100KB for online
          forms. Works for SSC, passport, job applications, and government
          portals.
        </p>
      </div>

      {/* 🔥 INTERNAL LINKS (VERY IMPORTANT FOR SEO) */}
<div className="mt-10 text-center">
  <h2 className="text-lg font-semibold mb-3">
    Popular Tools
  </h2>

  <div className="flex flex-col gap-2 text-blue-600 text-sm">

    {/* 🔥 CORE PAGES */}
    <Link href="/ssc/photo">SSC Photo Tool</Link>
    <Link href="/passport/photo">Passport Photo Tool</Link>

    {/* 🔥 HIGH SEARCH KB PAGES */}
    <Link href="/compress/image-50kb">Compress Image to 50KB</Link>
    <Link href="/compress/image-20kb">Compress Image to 20KB</Link>
    <Link href="/compress/image-100kb">Compress Image to 100KB</Link>

    {/* 🔥 SSC CLUSTER */}
    <Link href="/ssc/photo-20kb">SSC Photo 20KB</Link>
    <Link href="/ssc/photo-30kb">SSC Photo 30KB</Link>
    <Link href="/ssc/photo-50kb">SSC Photo 50KB</Link>

    {/* 🔥 PASSPORT CLUSTER */}
    <Link href="/passport/photo-20kb">Passport Photo 20KB</Link>
    <Link href="/passport/photo-50kb">Passport Photo 50KB</Link>

    {/* 🔥 FEATURE PAGES */}
    <Link href="/compress-pdf-to-100kb">Compress PDF to 100KB</Link>
    <Link href="/convert-pdf-to-word">Convert PDF to Word</Link>
    <Link href="/resize-image-for-whatsapp">Resize Image for WhatsApp</Link>

  </div>
</div>
    </main>
  );
}
