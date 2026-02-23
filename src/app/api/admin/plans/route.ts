import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

function parseFeatures(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const speedMbps = Number(formData.get("speedMbps") || 0);
  const pricePhp = Number(formData.get("pricePhp") || 0);
  const contractMonths = Number(formData.get("contractMonths") || 0);
  const installFeePhp = Number(formData.get("installFeePhp") || 0);
  const promoText = String(formData.get("promoText") || "").trim();
  const features = JSON.stringify(parseFeatures(String(formData.get("features") || "")));
  const isFeatured = formData.get("isFeatured") === "on";

  await prisma.plan.create({
    data: {
      name,
      slug,
      speedMbps,
      pricePhp,
      contractMonths,
      installFeePhp: installFeePhp || null,
      promoText: promoText || null,
      features,
      isFeatured,
    },
  });

  return NextResponse.redirect(new URL("/admin/plans", request.url));
}

