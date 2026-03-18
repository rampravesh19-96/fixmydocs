import ToolPage from "@/components/ToolPage";
import { allPages } from "@/data/allPages";
import { generateContent } from "@/utils/generateContent";
import { generateFaqs } from "@/utils/generateFaqs";

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];

  Object.entries(allPages).forEach(([category, pages]) => {
    Object.keys(pages).forEach((slug) => {
      params.push({ category, slug });
    });
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const data = allPages[category]?.[slug];

  return {
    title: data?.title || "FixMyDocs Tool",
    description: data?.description || "Free online tools",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const data = allPages[category]?.[slug];

  if (!data) return <p>Page not found</p>;

  return (
    <ToolPage
      title={data.title}
      description={data.description}
      sizes={{
        photo: "20KB–50KB",
        signature: "10KB–20KB",
      }}
      maxSizeKB={data.maxSizeKB}
      category={category}
      faqs={generateFaqs(slug, category)}
      content={generateContent(slug, category)}
    />
  );
}