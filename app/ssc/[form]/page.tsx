import ToolPage from "@/components/ToolPage";
import { sscPages } from "@/data/sscPages";
import { generateContent } from "@/utils/generateContent";
import { generateFaqs } from "@/utils/generateFaqs";

// ✅ Dynamic SEO (IMPORTANT)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ form: string }>;
}) {
  const { form } = await params;
  const data = sscPages[form];

  return {
    title: data?.title || "SSC Tool | FixMyDocs",
    description:
      data?.description ||
      "Resize and compress SSC images online free.",
  };
}

// ✅ Page
export default async function Page({
  params,
}: {
  params: Promise<{ form: string }>;
}) {
  const { form } = await params;
  const data = sscPages[form];
  const faqs = generateFaqs(form, "ssc");
  const content = generateContent(form, "ssc");

  if (!data) return <p>Page not found</p>;

  return <ToolPage
  title={data.title}
  description={data.description}
  sizes={{
    photo: "20KB–50KB",
    signature: "10KB–20KB",
  }}
  maxSizeKB={data.maxSizeKB}
  category="ssc"   // ✅ ADD THIS
    faqs={faqs}
    content={content}
/>
}