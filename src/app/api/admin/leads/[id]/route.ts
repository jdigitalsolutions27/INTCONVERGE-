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

  const formData = await request.formData();
  const status = String(formData.get("status") || "NEW");
  const internalNotes = String(formData.get("internalNotes") || "");

  await prisma.lead.update({
    where: { id: params.id },
    data: {
      status,
      internalNotes: internalNotes || null,
    },
  });

  return NextResponse.redirect(new URL(`/admin/leads/${params.id}`, request.url));
}
