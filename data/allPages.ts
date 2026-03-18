type Page = {
  title: string;
  description: string;
  maxSizeKB?: number;
  category: "ssc" | "passport" | "compress";
};

const sizes = [10, 20, 30, 50, 100];

function generatePages(prefix: string, category: Page["category"]) {
  const pages: Record<string, Page> = {};

  // Photo base
  pages["photo"] = {
    title: `${prefix.toUpperCase()} Photo Size Tool Online Free`,
    description: `Resize and compress ${prefix} photo online free.`,
    maxSizeKB: 50,
    category,
  };

  // Signature base
  pages["signature"] = {
    title: `${prefix.toUpperCase()} Signature Size Tool Online Free`,
    description: `Resize and compress ${prefix} signature online free.`,
    maxSizeKB: 20,
    category,
  };

  // KB pages
  sizes.forEach((kb) => {
    pages[`photo-${kb}kb`] = {
      title: `Compress ${prefix} Photo to ${kb}KB Online`,
      description: `Reduce ${prefix} photo to ${kb}KB instantly.`,
      maxSizeKB: kb,
      category,
    };

    pages[`signature-${kb}kb`] = {
      title: `Compress ${prefix} Signature to ${kb}KB Online`,
      description: `Resize ${prefix} signature to ${kb}KB.`,
      maxSizeKB: kb,
      category,
    };
  });

  return pages;
}

export const allPages = {
  ssc: generatePages("ssc", "ssc"),
  passport: generatePages("passport", "passport"),
  compress: {
    "image-50kb": {
      title: "Compress Image to 50KB Online Free",
      description: "Reduce image size to 50KB instantly.",
      maxSizeKB: 50,
      category: "compress",
    },
    "pdf-100kb": {
      title: "Compress PDF to 100KB Online Free",
      description: "Reduce PDF file size to 100KB.",
      category: "compress",
    },
  },
};