import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getRequestIp();
  const limit = rateLimit(`login:${ip}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.redirect(new URL("/admin/login?error=Too%20many%20attempts", request.url));
  }

  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    return NextResponse.redirect(new URL("/admin/login?error=Missing%20credentials", request.url));
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login?error=Invalid%20credentials", request.url));
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return NextResponse.redirect(new URL("/admin/login?error=Invalid%20credentials", request.url));
  }

  const tokenPayload = JSON.stringify({
    id: admin.id,
    email: admin.email,
    name: admin.name,
    exp: Date.now() + 1000 * 60 * 60 * 12,
  });

  const crypto = await import("crypto");
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    return NextResponse.redirect(new URL("/admin/login?error=Missing%20secret", request.url));
  }

  const signature = crypto.createHmac("sha256", secret).update(tokenPayload).digest("hex");
  const token = Buffer.from(tokenPayload).toString("base64") + "." + signature;

  const response = NextResponse.redirect(new URL("/admin", request.url));
  response.cookies.set("ev_admin", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return response;
}

