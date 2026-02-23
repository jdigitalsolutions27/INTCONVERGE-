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
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const category = String(formData.get("category") || "NOTICE");
  const content = String(formData.get("content") || "").trim();
  const isPublished = formData.get("isPublished") === "on";

  await prisma.announcement.create({
    data: {
      title,
      slug,
      category,
      content,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    },
  });

  return NextResponse.redirect(new URL("/admin/announcements", request.url));
}

