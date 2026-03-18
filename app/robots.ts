// /app/robots.ts
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://fixmydocs.in/sitemap.xml",
    host: "https://fixmydocs.in",
  };
}