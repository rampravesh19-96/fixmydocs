"use client";

import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";

const sendPageView = (path: string) => {
    // @ts-ignore
  if (typeof window.gtag !== 'undefined') {
    // @ts-ignore
    window.gtag('config', 'G-LQDNZRTPEM', {
      page_path: path,
    });
  }
};

export default function ConvertPDFtoWord() {
  const [file, setFile] = useState<File | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    sendPageView(pathname);
  }, [pathname]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setFile(e.target.files[0]);
  };

  const handleDownload = () => {
    if (!file) return;
    // For now, just download the uploaded PDF as a placeholder
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(".pdf", ".docx");
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Convert PDF to Word Online Free
      </h1>

      <p className="text-sm text-gray-500 mb-4 text-center">
        Convert your PDF files to editable Word documents instantly.
      </p>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        Upload your PDF and download it as a Word document. Free, fast, and no login required.
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
        <div className="flex flex-col items-center">
          <p className="text-green-600 mb-2">
            PDF ready! Convert to Word now.
          </p>

          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download as Word
          </button>
        </div>
      )}

      {/* FAQ */}
      <div className="mt-10 max-w-xl text-left">
        <h2 className="text-xl font-semibold mb-4">FAQs</h2>

        <div className="mb-3">
          <h3 className="font-medium">How to convert PDF to Word?</h3>
          <p className="text-gray-600 text-sm">
            Upload your PDF file and download the converted Word document instantly.
          </p>
        </div>

        <div className="mb-3">
          <h3 className="font-medium">Is this tool free?</h3>
          <p className="text-gray-600 text-sm">
            Yes, this tool is completely free and does not require login.
          </p>
        </div>
      </div>
    </main>
  );
}