const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@evecs.local";
  const adminName = process.env.ADMIN_NAME || "EVECS Admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        name: adminName,
        passwordHash,
      },
    });
  }

  const plans = [
    {
      name: "Barangay Starter 35",
      slug: "barangay-starter-35",
      speedMbps: 35,
      pricePhp: 1199,
      contractMonths: 24,
      installFeePhp: 1500,
      promoText: "Free first month for early subscribers.",
      isFeatured: false,
      features: JSON.stringify([
        "Unlimited data",
        "Best for 2-4 devices",
        "Free Wi-Fi router",
        "Priority local support",
      ]),
    },
    {
      name: "Family Plus 75",
      slug: "family-plus-75",
      speedMbps: 75,
      pricePhp: 1699,
      contractMonths: 24,
      installFeePhp: 1500,
      promoText: "Most popular in Borongan City.",
      isFeatured: true,
      features: JSON.stringify([
        "Unlimited data",
        "Ideal for streaming + work",
        "Free Wi-Fi router",
        "Messenger support",
      ]),
    },
    {
      name: "Work-From-Home 120",
      slug: "work-from-home-120",
      speedMbps: 120,
      pricePhp: 2299,
      contractMonths: 24,
      installFeePhp: 1500,
      promoText: "Priority installation window.",
      isFeatured: false,
      features: JSON.stringify([
        "Unlimited data",
        "Stable video calls",
        "Wi-Fi 6 router option",
        "Priority ticket queue",
      ]),
    },
    {
      name: "SME Boost 200",
      slug: "sme-boost-200",
      speedMbps: 200,
      pricePhp: 3299,
      contractMonths: 24,
      installFeePhp: 2000,
      promoText: "Best for shops and offices.",
      isFeatured: false,
      features: JSON.stringify([
        "Unlimited data",
        "Multi-user Wi-Fi performance",
        "Static IP optional",
        "Onsite optimization",
      ]),
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan,
    });
  }

  const coverageAreas = [
    { municipality: "Borongan City", barangay: "Balud", status: "AVAILABLE" },
    { municipality: "Borongan City", barangay: "Campesao", status: "AVAILABLE" },
    { municipality: "Borongan City", barangay: "Baras", status: "LIMITED" },
    { municipality: "Maydolong", barangay: "Barangay 1", status: "LIMITED" },
    { municipality: "Guiuan", barangay: "Poblacion", status: "NOT_YET" },
  ];

  for (const area of coverageAreas) {
    await prisma.coverageArea.upsert({
      where: {
        municipality_barangay: {
          municipality: area.municipality,
          barangay: area.barangay,
        },
      },
      update: area,
      create: area,
    });
  }

  const announcements = [
    {
      title: "Planned Maintenance: Borongan Core Upgrade",
      slug: "maintenance-borongan-core-upgrade",
      category: "MAINTENANCE",
      content:
        "We will upgrade core equipment in Borongan. Expected impact: short intermittent downtime. We will notify affected subscribers via SMS.",
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      title: "Localized Outage Advisory",
      slug: "outage-advisory-borongan-north",
      category: "OUTAGE",
      content:
        "We are investigating a fiber cut affecting select areas in northern Borongan. Restoration crews are on-site.",
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      title: "New Year Promo: Free Installation",
      slug: "promo-free-installation",
      category: "PROMO",
      content:
        "Limited-time free installation for approved applications within Borongan City. Terms and conditions apply.",
      isPublished: false,
    },
  ];

  for (const announcement of announcements) {
    await prisma.announcement.upsert({
      where: { slug: announcement.slug },
      update: announcement,
      create: announcement,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
