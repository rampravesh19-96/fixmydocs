"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import imageCompression from "browser-image-compression";
import Link from "next/link";

// Analytics
const sendPageView = (path: string) => {
  // @ts-ignore
  if (typeof window.gtag !== "undefined") {
    // @ts-ignore
    window.gtag("config", "G-LQDNZRTPEM", {
      page_path: path,
    });
  }
};

// Compression
async function compressToTarget(file: File, targetSizeKB = 50) {
  let quality = 0.9;
  let best: Blob | null = null;

  while (quality >= 0.1) {
    const result = await imageCompression(file, {
      maxSizeMB: targetSizeKB / 1024,
      maxWidthOrHeight: 600,
      useWebWorker: true,
      initialQuality: quality,
    });

    if (!best || result.size < best.size) best = result;

    if (result.size / 1024 <= targetSizeKB) return result;

    quality -= 0.1;
  }

  return best!;
}

export default function PassportClient() {
  const [file, setFile] = useState<File | null>(null);
  const [compressed, setCompressed] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const [originalURL, setOriginalURL] = useState<string | null>(null);
  const [compressedURL, setCompressedURL] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
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

  const handleFile = async (f: File) => {
    setFile(f);
    const original = URL.createObjectURL(f);
    setOriginalURL(original);

    try {
      setLoading(true);
      const result = await compressToTarget(f, 50);

      setCompressed(result);
      setCompressedURL(URL.createObjectURL(result));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 p-4">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-4">
        Passport Size Photo Tool (KB, Pixels, CM)
      </h1>

      <p className="text-gray-600 text-center max-w-md mb-6">
        Resize and compress passport size photo for government forms,
        job applications, and online uploads.
      </p>

      {/* INFO */}
      <div className="bg-white shadow rounded p-4 max-w-md w-full mb-6 text-sm">
        <h2 className="font-semibold mb-2">Standard Passport Size</h2>

        <p><strong>Size:</strong> 3.5cm × 4.5cm</p>
        <p><strong>Pixels:</strong> 413 × 531 px</p>
        <p><strong>File Size:</strong> 20KB – 50KB</p>
        <p><strong>Format:</strong> JPG/JPEG</p>
      </div>

      {/* UPLOAD */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed p-6 rounded cursor-pointer bg-white text-center mb-4"
      >
        Upload Photo
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />

      {loading && <p className="text-blue-600">Processing...</p>}

      {/* PREVIEW */}
      {originalURL && compressedURL && (
        <div className="flex gap-4 mt-6 flex-col md:flex-row">

          <div className="text-center">
            <p>Original</p>
            <img src={originalURL} className="max-w-xs" />
            <p>{(file!.size / 1024).toFixed(2)} KB</p>
          </div>

          <div className="text-center">
            <p>Compressed</p>
            <img src={compressedURL} className="max-w-xs" />
            <p className="text-green-600">
              {(compressed!.size / 1024).toFixed(2)} KB
            </p>
          </div>

        </div>
      )}

      {/* DOWNLOAD */}
      {compressed && (
        <button
          onClick={() => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(compressed);
            a.download = "passport_photo.jpg";
            a.click();
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download
        </button>
      )}

      {/* SEO CONTENT */}
      <div className="mt-12 max-w-xl text-left">

        <h2 className="text-xl font-semibold mb-4">
          Passport Photo Size in KB, Pixels & CM
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          Passport size photos are required for many government forms.
          Use this free tool to resize image for passport size and reduce
          file size in KB instantly.
        </p>

        <h3 className="font-medium">FAQs</h3>

        <p className="text-sm mt-2">
          <strong>What is passport size photo in pixels?</strong><br />
          Around 413 × 531 pixels.
        </p>

        <p className="text-sm mt-2">
          <strong>What is passport photo size in KB?</strong><br />
          Usually between 20KB and 50KB.
        </p>

      </div>

      {/* INTERNAL LINKS */}
      <div className="mt-10 text-center text-blue-600 text-sm flex flex-col gap-2">
        <Link href="/">Compress Image</Link>
        <Link href="/image-size-for-ssc-form">SSC Image Tool</Link>
      </div>

    </main>
  );
}