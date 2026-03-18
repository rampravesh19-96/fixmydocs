type FAQ = {
  question: string;
  answer: string;
};

export function generateFaqs(slug: string, category: string): FAQ[] {
  const readable = slug.replace(/-/g, " ");

  const kbMatch = slug.match(/(\d+kb)/);
  const kb = kbMatch ? kbMatch[1] : null;

  const prefixMap: Record<string, string> = {
    ssc: "SSC",
    passport: "passport",
    compress: "image",
  };

  const prefix = prefixMap[category] || "";

  const faqs: (FAQ | null)[] = [
    {
      question: `What is ${prefix} ${readable}?`,
      answer: `${prefix} ${readable} refers to the required format or size used in online forms and applications.`,
    },

    {
      question: `How to ${readable} online free?`,
      answer: `Upload your file and the tool will process it automatically.`,
    },

    {
      question: `What is the size limit for ${prefix} photo and signature?`,
      answer: `${prefix} photo is usually 20KB–50KB and signature 10KB–20KB.`,
    },

    kb
      ? {
          question: `How to compress ${prefix} image to ${kb}?`,
          answer: `Upload your image and it will be compressed to ${kb} automatically.`,
        }
      : null,

    {
      question: `Can I resize ${prefix} image without losing quality?`,
      answer: `Yes, smart compression maintains the best possible quality.`,
    },

    {
      question: `Is this ${prefix} ${readable} tool free?`,
      answer: `Yes, it is completely free with no signup required.`,
    },

    {
      question: `${prefix} photo size in KB and pixels?`,
      answer: `Usually 20KB–50KB and around 300x300 pixels depending on requirements.`,
    },

    {
      question: `Why is my ${prefix} image not uploading?`,
      answer: `Your file may exceed size limits. Compress it using this tool.`,
    },
  ];

  // ✅ FIX: strict type guard
  return faqs.filter((f): f is FAQ => f !== null);
}