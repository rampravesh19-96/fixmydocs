"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const sendPageView = (path: string) => {
  // @ts-ignore
  if (typeof window.gtag !== "undefined") {
    // @ts-ignore
    window.gtag("config", "G-LQDNZRTPEM", {
      page_path: path,
    });
  }
};

export default function ConvertPDFtoWordClient() {
  const [file, setFile] = useState<File | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    sendPageView(pathname);
  }, [pathname]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setFile(e.target.files[0]);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Convert PDF to Word Online Free
      </h1>

      <p className="text-sm text-gray-500 mb-4 text-center">
        Convert your PDF files into editable Word documents.
      </p>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        Upload your PDF and convert it into a Word file. Free and easy to use.
      </p>

      <p className="text-sm text-blue-600 mb-6 text-center">
        <a href="/" className="underline">
          ← Back to Image Compressor
        </a>
      </p>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="border border-gray-300 rounded p-2 mb-4"
      />

      {file && (
        <div className="flex flex-col items-center text-center">
          <p className="text-yellow-600 mb-2">
            🚧 PDF to Word conversion is coming soon.
          </p>

          <p className="text-gray-500 text-sm mb-3">
            Uploaded file: {file.name}
          </p>

          <button
            disabled
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      )}

      {/* SEO content */}
      <div className="mt-10 max-w-xl text-left">
        <h2 className="text-xl font-semibold mb-4">
          How to Convert PDF to Word
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          Converting a PDF to Word requires extracting text, formatting, and images accurately.
          Our upcoming tool will automate this process and deliver editable Word documents.
        </p>
      </div>
    </main>
  );
}