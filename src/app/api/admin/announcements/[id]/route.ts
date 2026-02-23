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
    await prisma.announcement.delete({ where: { id: params.id } });
    return NextResponse.redirect(new URL("/admin/announcements", request.url));
  }

  const formData = await request.formData();
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const category = String(formData.get("category") || "NOTICE");
  const content = String(formData.get("content") || "").trim();
  const isPublished = formData.get("isPublished") === "on";

  await prisma.announcement.update({
    where: { id: params.id },
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
