import { seoConfig } from "@/config/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: `${seoConfig.baseUrl}/sitemap.xml`,
  };
}

