import { prisma } from "@/lib/db";
import { seoConfig } from "@/config/site";

export default async function sitemap() {
  const baseUrl = seoConfig.baseUrl;
  const plans = await prisma.plan.findMany({ select: { slug: true, updatedAt: true } });

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

