import { seoConfig } from "@/config/site";
import { getSitemapPlanEntries } from "@/lib/public-data";

export default async function sitemap() {
  const baseUrl = seoConfig.baseUrl;
  const plans = await getSitemapPlanEntries();

  const staticRoutes = [
    "",
    "/plans",
    "/coverage",
    "/apply",
    "/support",
    "/support/payments",
    "/support/troubleshooting",
    "/support/faq",
    "/status",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...plans.map((plan) => ({
      url: `${baseUrl}/plans/${plan.slug}`,
      lastModified: plan.updatedAt,
    })),
  ];
}

