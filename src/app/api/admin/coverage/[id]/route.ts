import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

type RouteProps = {
  params: { id: string };
};

export async function POST(request: Request, { params }: RouteProps) {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const shouldDelete = searchParams.get("delete") === "1";

  if (shouldDelete) {
    await prisma.coverageArea.delete({ where: { id: params.id } });
    return NextResponse.redirect(new URL("/admin/coverage", request.url));
  }

  const formData = await request.formData();
  const municipality = String(formData.get("municipality") || "").trim();
  const barangay = String(formData.get("barangay") || "").trim();
  const status = String(formData.get("status") || "AVAILABLE");
  const notes = String(formData.get("notes") || "").trim();

  await prisma.coverageArea.update({
    where: { id: params.id },
    data: {
      municipality,
      barangay,
      status,
      notes: notes || null,
    },
  });

  return NextResponse.redirect(new URL("/admin/coverage", request.url));
}
