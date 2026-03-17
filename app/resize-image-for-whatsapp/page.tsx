"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const sendPageView = (path: string) => {
    // @ts-ignore
  if (typeof window.gtag !== "undefined") {
    // @ts-ignore
    window.gtag("config", "G-LQDNZRTPEM", { page_path: path });
  }
};

export default function ResizeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    sendPageView(pathname);
  }, [pathname]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Resize Image for WhatsApp
      </h1>

      <p className="text-sm text-gray-500 mb-4 text-center">
        Upload your image to resize it for WhatsApp profile, status, or messages.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border border-gray-300 rounded p-2 mb-4"
      />

      {loading && <p className="text-blue-600 mb-2">Processing image...</p>}

      {file && (
        <div className="text-center">
          <p className="text-green-600 mb-2">
            File ready: {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </p>
          <p className="text-gray-600 text-sm">
            Resizing feature coming soon!
          </p>
        </div>
      )}
    </main>
  );
}