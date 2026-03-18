import ToolPage from "@/components/ToolPage";
import { compressPages } from "@/data/compressPages";
import { generateContent } from "@/utils/generateContent";
import { generateFaqs } from "@/utils/generateFaqs";

// ✅ SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const data = compressPages[type];

  return {
    title: data?.title || "Compress Tool | FixMyDocs",
    description: data?.description || "",
  };
}

// ✅ PAGE
export default async function Page({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const data = compressPages[type];
  const faqs = generateFaqs(type, "compress");
  const content = generateContent(type, "compress");

  if (!data) return <p>Page not found</p>;

  return (
<ToolPage
  title={data.title}
  description={data.description}
  sizes={{
    photo: "Custom",
    signature: "Custom",
  }}
  maxSizeKB={data.maxSizeKB}
  category="compress"   // ✅
    faqs={faqs}
  content={content}
/>
  );
}