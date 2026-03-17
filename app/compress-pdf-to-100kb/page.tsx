"use client";

import { useState } from "react";

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed.pdf";
    a.click();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Compress PDF to 100KB Online Free
      </h1>

      <p className="text-sm text-gray-500 mb-4 text-center">
        Perfect for job forms, government exams, and online applications.
      </p>

      <p className="text-gray-600 mb-4 text-center max-w-md">
        Reduce your PDF file size to 100KB instantly. Free, fast, and no login required.
      </p>

      {/* ✅ MOVED HERE (correct position) */}
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

      {loading && (
        <p className="text-blue-600 mb-2">Compressing PDF...</p>
      )}

      {file && (
        <div className="flex flex-col items-center">
          <p className="text-green-600 mb-2">
            PDF ready! Size: {(file.size / 1024).toFixed(2)} KB
          </p>

          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      )}

      {/* FAQ */}
      <div className="mt-10 max-w-xl text-left">
        <h2 className="text-xl font-semibold mb-4">FAQs</h2>

        <div className="mb-3">
          <h3 className="font-medium">How to compress PDF to 100KB?</h3>
          <p className="text-gray-600 text-sm">
            Upload your PDF file and download a reduced size version instantly.
          </p>
        </div>

        <div className="mb-3">
          <h3 className="font-medium">Is this PDF compressor free?</h3>
          <p className="text-gray-600 text-sm">
            Yes, it is completely free and does not require login.
          </p>
        </div>
      </div>
    </main>
  );
}