import { type Announcement, type CoverageArea, type Plan } from "@prisma/client";
import { prisma } from "@/lib/db";

const seedDate = new Date("2026-01-26T00:00:00.000Z");

const fallbackPlans: Plan[] = [
  {
    id: "fallback-plan-1",
    createdAt: seedDate,
    updatedAt: seedDate,
    name: "Barangay Starter 35",
    slug: "barangay-starter-35",
    speedMbps: 35,
    pricePhp: 1199,
    contractMonths: 24,
    installFeePhp: 1500,
    promoText: "Free first month for early subscribers.",
    isFeatured: false,
    features: JSON.stringify(["Unlimited data", "Best for 2-4 devices", "Free Wi-Fi router", "Priority local support"]),
  },
  {
    id: "fallback-plan-2",
    createdAt: seedDate,
    updatedAt: seedDate,
    name: "Family Plus 75",
    slug: "family-plus-75",
    speedMbps: 75,
    pricePhp: 1699,
    contractMonths: 24,
    installFeePhp: 1500,
    promoText: "Most popular in Borongan City.",
    isFeatured: true,
    features: JSON.stringify(["Unlimited data", "Ideal for streaming + work", "Free Wi-Fi router", "Messenger support"]),
  },
  {
    id: "fallback-plan-3",
    createdAt: seedDate,
    updatedAt: seedDate,
    name: "Work-From-Home 120",
    slug: "work-from-home-120",
    speedMbps: 120,
    pricePhp: 2299,
    contractMonths: 24,
    installFeePhp: 1500,
    promoText: "Priority installation window.",
    isFeatured: true,
    features: JSON.stringify(["Unlimited data", "Stable video calls", "Wi-Fi 6 router option", "Priority ticket queue"]),
  },
  {
    id: "fallback-plan-4",
    createdAt: seedDate,
    updatedAt: seedDate,
    name: "SME Boost 200",
    slug: "sme-boost-200",
    speedMbps: 200,
    pricePhp: 3299,
    contractMonths: 24,
    installFeePhp: 2000,
    promoText: "Best for shops and offices.",
    isFeatured: true,
    features: JSON.stringify(["Unlimited data", "Multi-user Wi-Fi performance", "Static IP optional", "Onsite optimization"]),
  },
];

const fallbackCoverageAreas: Pick<CoverageArea, "municipality" | "barangay" | "status" | "notes">[] = [
  { municipality: "Borongan City", barangay: "Balud", status: "AVAILABLE", notes: "Ready for installation schedule." },
  { municipality: "Borongan City", barangay: "Campesao", status: "AVAILABLE", notes: "Slots currently open." },
  { municipality: "Borongan City", barangay: "Baras", status: "LIMITED", notes: "Subject to port availability." },
  { municipality: "Maydolong", barangay: "Barangay 1", status: "LIMITED", notes: "Area expansion in progress." },
  { municipality: "Guiuan", barangay: "Poblacion", status: "NOT_YET", notes: "Join waitlist for rollout updates." },
];

const fallbackAnnouncements: Announcement[] = [
  {
    id: "fallback-announcement-1",
    createdAt: seedDate,
    updatedAt: seedDate,
    title: "Planned Maintenance: Borongan Core Upgrade",
    slug: "maintenance-borongan-core-upgrade",
    category: "MAINTENANCE",
    content:
      "We will upgrade core equipment in Borongan. Expected impact: short intermittent downtime. We will notify affected subscribers via SMS.",
    isPublished: true,
    publishedAt: seedDate,
  },
  {
    id: "fallback-announcement-2",
    createdAt: seedDate,
    updatedAt: seedDate,
    title: "Localized Outage Advisory",
    slug: "outage-advisory-borongan-north",
    category: "OUTAGE",
    content: "We are investigating a fiber cut affecting select areas in northern Borongan. Restoration crews are on-site.",
    isPublished: true,
    publishedAt: new Date(seedDate.getTime() - 86400000),
  },
  {
    id: "fallback-announcement-3",
    createdAt: seedDate,
    updatedAt: seedDate,
    title: "New Subscriber Promo: Free Installation",
    slug: "promo-free-installation",
    category: "PROMO",
    content: "Limited-time free installation for approved applications within Borongan City. Terms and conditions apply.",
    isPublished: true,
    publishedAt: new Date(seedDate.getTime() - 2 * 86400000),
  },
];

async function runWithFallback<T>(label: string, query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch (error) {
    console.error(`[db-fallback] ${label}`, error);
    return fallback;
  }
}

export async function getPlans() {
  const plans = await runWithFallback(
    "getPlans",
    () => prisma.plan.findMany({ orderBy: [{ pricePhp: "asc" }] }),
    fallbackPlans
  );
  return plans.length > 0 ? plans : fallbackPlans;
}

export async function getFeaturedPlans(limit = 3) {
  const plans = await runWithFallback(
    "getFeaturedPlans",
    () => prisma.plan.findMany({ where: { isFeatured: true }, orderBy: { pricePhp: "asc" }, take: limit }),
    fallbackPlans.filter((plan) => plan.isFeatured).slice(0, limit)
  );
  return plans.length > 0 ? plans : fallbackPlans.filter((plan) => plan.isFeatured).slice(0, limit);
}

export async function getAnnouncements(limit?: number) {
  const fallback = fallbackAnnouncements
    .filter((item) => item.isPublished)
    .sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0));
  const announcements = await runWithFallback(
    "getAnnouncements",
    () =>
      prisma.announcement.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
        ...(typeof limit === "number" ? { take: limit } : {}),
      }),
    typeof limit === "number" ? fallback.slice(0, limit) : fallback
  );
  if (announcements.length > 0) {
    return announcements;
  }
  return typeof limit === "number" ? fallback.slice(0, limit) : fallback;
}

export async function getPromos(limit = 2) {
  const fallback = fallbackAnnouncements
    .filter((item) => item.isPublished && item.category === "PROMO")
    .sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0))
    .slice(0, limit);
  const promos = await runWithFallback(
    "getPromos",
    () =>
      prisma.announcement.findMany({
        where: { isPublished: true, category: "PROMO" },
        orderBy: { publishedAt: "desc" },
        take: limit,
      }),
    fallback
  );
  return promos.length > 0 ? promos : fallback;
}

export async function getCoverageAreas() {
  const areas = await runWithFallback(
    "getCoverageAreas",
    () => prisma.coverageArea.findMany({ select: { municipality: true, barangay: true, status: true, notes: true }, orderBy: [{ municipality: "asc" }, { barangay: "asc" }] }),
    fallbackCoverageAreas
  );
  return areas.length > 0 ? areas : fallbackCoverageAreas;
}

export async function findCoverageArea(municipality: string, barangay: string) {
  const area = await runWithFallback(
    "findCoverageArea",
    () =>
      prisma.coverageArea.findFirst({
        where: {
          municipality,
          barangay,
        },
        select: { status: true, notes: true, municipality: true, barangay: true },
      }),
    null as { status: string; notes: string | null; municipality: string; barangay: string } | null
  );
  if (area) {
    return area;
  }
  const m = municipality.trim().toLowerCase();
  const b = barangay.trim().toLowerCase();
  return fallbackCoverageAreas.find((item) => item.municipality.toLowerCase() === m && item.barangay.toLowerCase() === b) || null;
}

export async function getPlanBySlug(slug: string) {
  const plan = await runWithFallback(
    "getPlanBySlug",
    () => prisma.plan.findUnique({ where: { slug } }),
    null as Plan | null
  );
  if (plan) {
    return plan;
  }
  return fallbackPlans.find((item) => item.slug === slug) || null;
}

export async function getSitemapPlanEntries() {
  const entries = await runWithFallback(
    "getSitemapPlanEntries",
    () => prisma.plan.findMany({ select: { slug: true, updatedAt: true } }),
    fallbackPlans.map((plan) => ({ slug: plan.slug, updatedAt: plan.updatedAt }))
  );
  return entries.length > 0 ? entries : fallbackPlans.map((plan) => ({ slug: plan.slug, updatedAt: plan.updatedAt }));
}
