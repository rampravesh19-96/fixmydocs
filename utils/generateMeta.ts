export function generateMeta(slug: string, category: string) {
  const readable = slug.replace(/-/g, " ");

  const prefixMap: Record<string, string> = {
    ssc: "SSC",
    passport: "Passport",
    compress: "Compress",
  };

  const prefix = prefixMap[category] || "";

  return {
    title: `${readable} Online Free | ${prefix} Tool - FixMyDocs`,
    description: `Use this free tool to ${readable}. Fast, secure and no signup required. Works for all devices.`,
  };
}