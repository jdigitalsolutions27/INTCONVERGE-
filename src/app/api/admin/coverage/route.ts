import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const municipality = String(formData.get("municipality") || "").trim();
  const barangay = String(formData.get("barangay") || "").trim();
  const status = String(formData.get("status") || "AVAILABLE");
  const notes = String(formData.get("notes") || "").trim();

  await prisma.coverageArea.create({
    data: {
      municipality,
      barangay,
      status,
      notes: notes || null,
    },
  });

  return NextResponse.redirect(new URL("/admin/coverage", request.url));
}

