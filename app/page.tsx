"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    setCompressedFile(null);

    const options = {
      maxSizeMB: 0.05, // ~50KB
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      setLoading(true);
      const compressedBlob = await imageCompression(file, options);
      setCompressedFile(compressedBlob);
    } catch (err) {
      console.error("Compression error:", err);
      alert("Failed to compress image. Try another one.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed_" + selectedFile?.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Compress Image to 50KB Online Free
      </h1>
      <p className="text-sm text-gray-500 mb-4 text-center">
        Perfect for job forms, government exams, and online applications.
      </p>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        Reduce your image size to 50KB instantly without losing quality. Free,
        fast, and no login required.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border border-gray-300 rounded p-2 mb-4"
      />

      {loading && <p className="text-blue-600 mb-2">Compressing image...</p>}

      {compressedFile && (
        <div className="flex flex-col items-center">
          <p className="text-green-600 mb-2">
            Image compressed! Size: {(compressedFile.size / 1024).toFixed(2)} KB
          </p>
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download Compressed Image
          </button>
        </div>
      )}

      <div className="mt-10 max-w-xl text-left">
        <h2 className="text-xl font-semibold mb-4">FAQs</h2>

        <div className="mb-3">
          <h3 className="font-medium">How to compress image to 50KB?</h3>
          <p className="text-gray-600 text-sm">
            Upload your image, and our tool will automatically reduce its size
            to around 50KB while maintaining quality.
          </p>
        </div>

        <div className="mb-3">
          <h3 className="font-medium">Is this image compressor free?</h3>
          <p className="text-gray-600 text-sm">
            Yes, FixMyDocs is completely free and does not require login or
            signup.
          </p>
        </div>

        <div className="mb-3">
          <h3 className="font-medium">Does it reduce image quality?</h3>
          <p className="text-gray-600 text-sm">
            Our tool optimizes compression to reduce file size while keeping the
            best possible quality.
          </p>
        </div>
      </div>
      <div className="mt-10 text-center">
  <h2 className="text-lg font-semibold mb-3">More Tools (Coming Soon)</h2>

  <div className="flex flex-col gap-2 text-blue-600 text-sm">
    <a href="/compress-pdf-to-100kb" className="hover:underline">
      Compress PDF to 100KB
    </a>
    <a href="/resize-image-for-whatsapp" className="hover:underline">
      Resize Image for WhatsApp
    </a>
    <a href="/convert-pdf-to-word" className="hover:underline">
      Convert PDF to Word
    </a>
  </div>
</div>
    </main>
  );
}
