// /app/sitemap.ts

import { allPages } from "@/data/allPages";

export default function sitemap() {
  const baseUrl = "https://yourdomain.com";

  const urls = [];

  urls.push({
  url: baseUrl,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 1,
});

  Object.entries(allPages).forEach(([category, pages]) => {
    Object.keys(pages).forEach((slug) => {
      urls.push({
        url: `${baseUrl}/${category}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly", // ✅ helps SEO
        priority: 0.8, // ✅ helps Google understand importance
      });
    });
  });

  return urls;
}