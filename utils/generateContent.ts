// /utils/generateContent.ts
type ContentBlock = {
  intro: string;
  steps: string[];
  extra: string;
};

export function generateContent(slug: string, category: string): ContentBlock {
  const readable = slug.replace(/-/g, " ");

  const kbMatch = slug.match(/(\d+kb)/);
  const kb = kbMatch ? kbMatch[1] : null;

  const prefixMap: Record<string, string> = {
    ssc: "SSC",
    passport: "passport",
    compress: "image",
  };

  const prefix = prefixMap[category] || "";

  return {
    // 🔥 INTRO PARAGRAPH
    intro: `Use this free online tool to ${readable}. This tool is specially designed for ${prefix} form requirements where file size and dimensions matter. You can quickly process your file without losing quality.`,

    // 🔥 HOW TO STEPS (HIGH SEO VALUE)
    steps: [
      `Upload your file using the upload button.`,
      `The tool will automatically ${readable}.`,
      `Wait a few seconds for processing.`,
      `Download your optimized file instantly.`,
    ],

    // 🔥 EXTRA PARAGRAPH (LONG-TAIL KEYWORDS)
    extra: `This ${prefix} ${readable} tool is useful for online applications, job forms, and exams where strict file size limits like ${kb || "required size"} are needed. It works on all devices and does not require signup.`,
  };
}