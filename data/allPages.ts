type Page = {
  title: string;
  description: string;
  maxSizeKB?: number;
  category: "ssc" | "passport" | "compress" | "resize";
};

const sizes = [
  5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 200
];

function generatePages(prefix: string, category: Page["category"]) {
  const pages: Record<string, Page> = {};

  pages["photo"] = {
    title: `${prefix.toUpperCase()} Photo Size Tool Online Free`,
    description: `Resize and compress ${prefix} photo online free.`,
    maxSizeKB: 50,
    category,
  };

  pages["signature"] = {
    title: `${prefix.toUpperCase()} Signature Size Tool Online Free`,
    description: `Resize and compress ${prefix} signature online free.`,
    maxSizeKB: 20,
    category,
  };

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

// ✅ FIX: FORCE TYPE
const compressPages: Record<string, Page> = {
  "image-10kb": {
    title: "Compress Image to 10KB Online",
    description: "Reduce image size to 10KB.",
    maxSizeKB: 10,
    category: "compress",
  },
  "image-20kb": {
    title: "Compress Image to 20KB Online",
    description: "Reduce image size to 20KB.",
    maxSizeKB: 20,
    category: "compress",
  },
  "image-30kb": {
    title: "Compress Image to 30KB Online",
    description: "Reduce image size to 30KB.",
    maxSizeKB: 30,
    category: "compress",
  },
  "image-50kb": {
    title: "Compress Image to 50KB Online",
    description: "Reduce image size to 50KB.",
    maxSizeKB: 50,
    category: "compress",
  },
  "image-100kb": {
    title: "Compress Image to 100KB Online",
    description: "Reduce image size to 100KB.",
    maxSizeKB: 100,
    category: "compress",
  },
  "pdf-50kb": {
    title: "Compress PDF to 50KB Online",
    description: "Reduce PDF size to 50KB.",
    category: "compress",
  },
  "pdf-100kb": {
    title: "Compress PDF to 100KB Online",
    description: "Reduce PDF size to 100KB.",
    category: "compress",
  },
};
const resizePages: Record<string, Page> = {
  "resize-image-100x100": {
    title: "Resize Image to 100x100 Pixels Online",
    description: "Free tool to resize image to 100x100 pixels.",
    category: "resize", // ✅ FIXED
  },
  "resize-image-200x200": {
    title: "Resize Image to 200x200 Pixels Online",
    description: "Resize image to 200x200 pixels instantly.",
    category: "resize", // ✅ FIXED
  },
  "resize-image-300x300": {
    title: "Resize Image to 300x300 Pixels Online",
    description: "Resize image to 300x300 pixels online.",
    category: "resize", // ✅ FIXED
  },
  "resize-image-passport": {
    title: "Resize Image for Passport Size",
    description: "Resize photo for passport size requirements.",
    category: "resize", // ✅ FIXED
  },
  "resize-image-50kb": {
  title: "Resize Image to 50KB Online",
  description: "Resize and compress image to 50KB.",
  maxSizeKB: 50,
  category: "resize",
},
};

export const allPages: Record<string, Record<string, Page>> = {
  ssc: generatePages("ssc", "ssc"),
  passport: generatePages("passport", "passport"),
  compress: compressPages,
  resize: resizePages, 
};