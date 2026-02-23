import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toCsv } from "@/lib/csv";
import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || undefined;
  const start = searchParams.get("start") || undefined;
  const end = searchParams.get("end") || undefined;

  const leads = await prisma.lead.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(start || end
        ? {
            createdAt: {
              ...(start ? { gte: new Date(start) } : {}),
              ...(end ? { lte: new Date(end) } : {}),
            },
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  const csv = toCsv(leads, [
    "id",
    "createdAt",
    "type",
    "fullName",
    "mobile",
    "email",
    "addressLine",
    "barangay",
    "municipality",
    "province",
    "status",
  ]);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=leads.csv",
    },
  });
}

