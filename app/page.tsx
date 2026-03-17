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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        FixMyDocs - Compress Image
      </h1>

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
    </main>
  );
}