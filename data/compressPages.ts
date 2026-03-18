export const compressPages: Record<
  string,
  {
    title: string;
    description: string;
    maxSizeKB?: number;
    type: "image" | "pdf";
  }
> = {
  // 🔥 IMAGE (HIGH TRAFFIC)
  "image-20kb": {
    title: "Compress Image to 20KB Online Free | FixMyDocs",
    description:
      "Reduce image size to 20KB instantly without losing quality. Free online image compressor.",
    maxSizeKB: 20,
    type: "image",
  },

  "image-30kb": {
    title: "Compress Image to 30KB Online Free | FixMyDocs",
    description:
      "Resize image to 30KB online free. Fast and simple compression tool.",
    maxSizeKB: 30,
    type: "image",
  },

  "image-50kb": {
    title: "Compress Image to 50KB Online Free | FixMyDocs",
    description:
      "Compress image to 50KB online without losing quality.",
    maxSizeKB: 50,
    type: "image",
  },

  "image-100kb": {
    title: "Compress Image to 100KB Online Free | FixMyDocs",
    description:
      "Reduce image size to 100KB easily using free tool.",
    maxSizeKB: 100,
    type: "image",
  },

  // 🔥 GENERIC IMAGE
  "image-resize": {
    title: "Resize Image Online Free (KB, Pixels, Dimensions)",
    description:
      "Resize image online free. Adjust KB, pixels and dimensions instantly.",
    type: "image",
  },

  "reduce-image-size": {
    title: "Reduce Image Size Online Free (Fast Tool)",
    description:
      "Reduce image file size online without losing quality.",
    type: "image",
  },

  "image-compressor": {
    title: "Free Image Compressor Online (Fast & Secure)",
    description:
      "Compress images online free with best quality.",
    type: "image",
  },

  // 🔥 PDF (HIGH INTENT)
  "pdf-100kb": {
    title: "Compress PDF to 100KB Online Free | FixMyDocs",
    description:
      "Reduce PDF file size to 100KB online free. Perfect for job forms and exams.",
    maxSizeKB: 100,
    type: "pdf",
  },

  "pdf-200kb": {
    title: "Compress PDF to 200KB Online Free",
    description:
      "Resize PDF to 200KB online free instantly.",
    maxSizeKB: 200,
    type: "pdf",
  },

  "pdf-500kb": {
    title: "Compress PDF to 500KB Online Free",
    description:
      "Reduce PDF size to 500KB easily.",
    maxSizeKB: 500,
    type: "pdf",
  },

  // 🔥 GENERIC PDF
  "pdf-compressor": {
    title: "Compress PDF Online Free (Fast & Secure)",
    description:
      "Compress PDF file size online without losing quality.",
    type: "pdf",
  },

  "reduce-pdf-size": {
    title: "Reduce PDF Size Online Free",
    description:
      "Reduce PDF file size instantly with free online tool.",
    type: "pdf",
  },

  // 🔥 FORMAT BASED (BONUS SEO)
  "jpg-20kb": {
    title: "Compress JPG to 20KB Online Free",
    description:
      "Reduce JPG image size to 20KB online free.",
    maxSizeKB: 20,
    type: "image",
  },

  "png-50kb": {
    title: "Compress PNG to 50KB Online Free",
    description:
      "Resize PNG image to 50KB online free.",
    maxSizeKB: 50,
    type: "image",
  },
};