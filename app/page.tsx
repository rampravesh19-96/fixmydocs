"use client";

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

// ✅ IMPROVED compression (more accurate)
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

    // keep best result (closest to target)
    if (!bestResult || sizeKB < bestResult.size / 1024) {
      bestResult = result;
    }

    if (sizeKB <= targetSizeKB) {
      return result;
    }

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

  // ✅ CLEANUP (IMPORTANT - fixes blank/memory bugs)
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

      const compressedUrl = URL.createObjectURL(compressed);
      setCompressedURL(compressedUrl);

    } catch (err) {
      console.error(err);
      alert("Compression failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDownload = () => {
    if (!compressedFile || !selectedFile) return;

    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed_" + selectedFile.name.replace(/\s+/g, "_");
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCompressedFile(null);
    setOriginalURL(null);
    setCompressedURL(null);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 p-4">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Compress Image to 50KB Online Free
      </h1>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        Upload your image and we will automatically compress it to under 50KB.
      </p>

      {/* DRAG & DROP */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="w-full max-w-md border-2 border-dashed border-gray-300 p-6 text-center rounded cursor-pointer bg-white mb-4"
      >
        <p className="text-gray-500">
          Drag & drop image here or click to upload
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {loading && <p className="text-blue-600">Compressing...</p>}

      {/* BEFORE / AFTER */}
      {originalURL && compressedURL && (
        <div className="flex flex-col md:flex-row gap-4 mt-6">

          <div className="text-center">
            <p className="font-medium mb-2">Original</p>
            <img
              src={originalURL}
              className="max-w-xs rounded shadow"
              alt="Original"
            />
            <p className="text-sm text-gray-600 mt-1">
              {(selectedFile!.size / 1024).toFixed(2)} KB
            </p>
          </div>

          <div className="text-center">
            <p className="font-medium mb-2">Compressed</p>
            <img
              src={compressedURL}
              className="max-w-xs rounded shadow"
              alt="Compressed"
            />
            <p className="text-sm text-green-600 mt-1">
              {(compressedFile!.size / 1024).toFixed(2)} KB ✅
            </p>
          </div>

        </div>
      )}

      {/* SAVINGS */}
      {compressedFile && selectedFile && (
        <p className="mt-4 text-gray-700">
          Saved:{" "}
          {(
            100 -
            (compressedFile.size / selectedFile.size) * 100
          ).toFixed(1)}
          %
        </p>
      )}

      {/* ACTIONS */}
      {compressedFile && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Download
          </button>

          <button
            onClick={handleReset}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Try Another
          </button>
        </div>
      )}

      {/* SEO CONTENT */}
<div className="mt-12 max-w-xl text-left">

  <h2 className="text-xl font-semibold mb-4">
    Compress Image to 50KB Online – Free Tool
  </h2>

  <p className="text-gray-600 text-sm mb-4">
    This free image compressor helps you reduce image size to 50KB for job applications,
    government exams, and online forms. Simply upload your image and download the compressed version instantly.
  </p>

  {/* FAQ */}
  <h2 className="text-lg font-semibold mb-3">FAQs</h2>

  <div className="mb-3">
    <h3 className="font-medium">How to compress image to 50KB?</h3>
    <p className="text-gray-600 text-sm">
      Upload your image and our tool will automatically reduce its size to under 50KB while maintaining quality.
    </p>
  </div>

  <div className="mb-3">
    <h3 className="font-medium">Is this image compressor free?</h3>
    <p className="text-gray-600 text-sm">
      Yes, FixMyDocs is completely free and does not require login or signup.
    </p>
  </div>

  <div className="mb-3">
    <h3 className="font-medium">Does compression reduce quality?</h3>
    <p className="text-gray-600 text-sm">
      Our tool balances compression and quality to give you the best possible result under 50KB.
    </p>
  </div>
</div>

{/* INTERNAL LINKS */}

<div className="mt-10 text-center">
  <h2 className="text-lg font-semibold mb-3">
    More Tools (Coming Soon)
  </h2>

  <div className="flex flex-col gap-2 text-blue-600 text-sm">
    <Link href="/compress-pdf-to-100kb" className="hover:underline">
      Compress PDF to 100KB
    </Link>

    <Link href="/resize-image-for-whatsapp" prefetch={true} className="hover:underline">
      Resize Image for WhatsApp
    </Link>

    <Link href="/convert-pdf-to-word" className="hover:underline">
      Convert PDF to Word
    </Link>
  </div>
</div>

    </main>
  );
}