import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const municipality = searchParams.get("municipality")?.trim();
  const barangay = searchParams.get("barangay")?.trim();

  if (!municipality || !barangay) {
    return NextResponse.json({ status: "NOT_YET", notes: "Please provide municipality and barangay." });
  }

  const area = await prisma.coverageArea.findFirst({
    where: {
      municipality,
      barangay,
    },
  });

  if (!area) {
    return NextResponse.json({ status: "NOT_YET", notes: "We are expanding soon. Join the waitlist." });
  }

  return NextResponse.json({ status: area.status, notes: area.notes });
}

