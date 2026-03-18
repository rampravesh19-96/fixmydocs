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

export default function ResizeImageClient() {
  const [file, setFile] = useState<File | null>(null);
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
        Resize images for WhatsApp profile, status, or messages.
      </p>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        Upload your image and resize it instantly. Fast and free.
      </p>

      <p className="text-sm text-blue-600 mb-6 text-center">
        <a href="/" className="underline">
          ← Back to Image Compressor
        </a>
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border border-gray-300 rounded p-2 mb-4"
      />

      {file && (
        <div className="text-center">
          <p className="text-yellow-600 mb-2">
            🚧 Image resizing feature coming soon.
          </p>

          <p className="text-gray-500 text-sm">
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </p>
        </div>
      )}

      {/* SEO content */}
      <div className="mt-10 max-w-xl text-left">
        <h2 className="text-xl font-semibold mb-4">
          Resize Image for WhatsApp Online
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          WhatsApp images often need specific sizes for profile pictures, status updates,
          and sharing. Our upcoming tool will help you resize images perfectly without losing quality.
        </p>
      </div>
    </main>
  );
}