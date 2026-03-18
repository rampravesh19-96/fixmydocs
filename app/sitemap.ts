import { sscPages } from "@/data/sscPages";

export default function sitemap() {
  const baseUrl = "https://fixmydocs.in";

  // ✅ Static pages
  const staticPages = [
    { url: `${baseUrl}`, priority: 1 },
  ];

  // ✅ SSC dynamic pages
  const ssc = Object.keys(sscPages).map((slug) => ({
    url: `${baseUrl}/ssc/${slug}`,
    priority: 0.8,
  }));

  // ✅ Compress pages (manual for now)
  const compress = [
    { url: `${baseUrl}/compress/image-20kb`, priority: 0.7 },
    { url: `${baseUrl}/compress/image-50kb`, priority: 0.7 },
    { url: `${baseUrl}/compress/pdf-100kb`, priority: 0.7 },
  ];

  return [...staticPages, ...ssc, ...compress];
}