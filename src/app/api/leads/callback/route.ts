import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";
import { sendLeadNotification } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getRequestIp();
  const limit = rateLimit(`callback:${ip}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const formData = await request.formData();
  const honeypot = formData.get("company");
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const fullName = String(formData.get("fullName") || "").trim();
  const mobile = String(formData.get("mobile") || "").trim();
  const municipality = String(formData.get("municipality") || "").trim();
  const barangay = String(formData.get("barangay") || "").trim();

  if (!fullName || !mobile) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await prisma.lead.create({
    data: {
      type: "CALLBACK",
      fullName,
      mobile,
      email: null,
      municipality: municipality || "-",
      barangay: barangay || "-",
      addressLine: "-",
      notes: "Request callback from coverage checker.",
    },
  });

  await sendLeadNotification(
    `Callback Request: ${fullName}`,
    `<p>Callback request from ${fullName}</p><p>Mobile: ${mobile}</p><p>Location: ${barangay}, ${municipality}</p>`
  );

  return NextResponse.redirect(new URL("/coverage?callback=1", request.url));
}

