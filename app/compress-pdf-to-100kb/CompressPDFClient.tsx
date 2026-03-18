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

export default function CompressPDFClient() {
  const [file, setFile] = useState<File | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    sendPageView(pathname);
  }, [pathname]);

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Compress PDF to 100KB Online Free
      </h1>

      <p className="text-sm text-gray-500 mb-4 text-center">
        Perfect for job forms and exams.
      </p>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="border border-gray-300 rounded p-2 mb-4"
      />

      {file && (
        <div className="text-center">
          <p className="text-yellow-600 mb-2">
            🚧 Coming soon (≤100KB guarantee)
          </p>
          <p className="text-gray-500 text-sm">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}
    </main>
  );
}