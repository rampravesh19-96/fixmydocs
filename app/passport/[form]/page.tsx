import ToolPage from "@/components/ToolPage";
import { passportPages } from "@/data/passportPages";
import { generateContent } from "@/utils/generateContent";
import { generateFaqs } from "@/utils/generateFaqs";

// ✅ SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ form: string }>;
}) {
  const { form } = await params;
  const data = passportPages[form];

  return {
    title: data?.title || "Passport Tool | FixMyDocs",
    description: data?.description || "",
  };
}

// ✅ PAGE
export default async function Page({
  params,
}: {
  params: Promise<{ form: string }>;
}) {
  const { form } = await params;
  const data = passportPages[form];
  const faqs = generateFaqs(form, "passport");
  const content = generateContent(form, "passport");

  if (!data) return <p>Page not found</p>;

  return (
<ToolPage
  title={data.title}
  description={data.description}
  sizes={{
    photo: "20KB–50KB",
    signature: "N/A",
  }}
  maxSizeKB={data.maxSizeKB}
  category="passport"   // ✅
    faqs={faqs}
    content={content}
/>
  );
}