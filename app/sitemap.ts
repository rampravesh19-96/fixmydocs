// /app/sitemap.ts
import { allPages } from "@/data/allPages";

export default function sitemap() {
  const baseUrl = "https://fixmydocs.in";

  const urls: any[] = [{ url: baseUrl }];

  Object.entries(allPages).forEach(([category, pages]) => {
    Object.keys(pages).forEach((slug) => {
      urls.push({
        url: `${baseUrl}/${category}/${slug}`,
      });
    });
  });

  return urls;
}