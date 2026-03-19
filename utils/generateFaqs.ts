// /utils/generateFaqs.ts
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
    // 🔥 MAIN SEARCH INTENT
    {
      question: `What is ${prefix} ${readable}?`,
      answer: `${prefix} ${readable} is a required format or size used in online forms. You can easily create it using this free online tool.`,
    },

    // 🔥 HIGH TRAFFIC QUERY
    {
      question: `How to ${readable} online free?`,
      answer: `Simply upload your file on FixMyDocs, and the tool will automatically resize or compress it to meet the required format instantly.`,
    },

    // 🔥 SIZE BASED QUERY
    {
      question: `What is the size limit for ${prefix} photo and signature?`,
      answer: `Most forms require ${prefix} photo between 20KB–50KB and signature between 10KB–20KB.`,
    },

    // 🔥 KB TARGETED (VERY IMPORTANT FOR SEO)
    kb
      ? {
          question: `How to compress ${prefix} image to ${kb}?`,
          answer: `Upload your image here and it will be automatically compressed to ${kb} without losing much quality.`,
        }
      : null,

    // 🔥 QUALITY QUESTION
    {
      question: `Does compressing ${prefix} image reduce quality?`,
      answer: `No, this tool uses smart compression to maintain the best possible quality while reducing file size.`,
    },

    // 🔥 TRUST QUESTION
    {
      question: `Is this ${prefix} ${readable} tool free?`,
      answer: `Yes, FixMyDocs is completely free to use with no signup or login required.`,
    },

    // 🔥 PIXEL + KB (IMPORTANT FOR GOOGLE)
    {
      question: `${prefix} photo size in KB and pixels?`,
      answer: `${prefix} photos are typically 20KB–50KB in size and around 300x300 pixels, depending on official requirements.`,
    },

    // 🔥 ERROR FIX QUERY
    {
      question: `Why is my ${prefix} image not uploading?`,
      answer: `Your file may be too large or in the wrong format. Try compressing or resizing it using this tool.`,
    },

    // 🔥 EXTRA SEO BOOST (NEW)
    {
      question: `Can I use this tool on mobile?`,
      answer: `Yes, this tool works perfectly on mobile, tablet, and desktop browsers.`,
    },

    {
      question: `Which format is best for ${prefix} images?`,
      answer: `JPEG/JPG is the most commonly accepted format for ${prefix} images in online forms.`,
    },
  ];

  // ✅ STRICT TYPE SAFE FILTER
  return faqs.filter((f): f is FAQ => f !== null);
}