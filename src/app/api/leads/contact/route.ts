import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";
import { sendLeadNotification } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getRequestIp();
  const limit = rateLimit(`contact:${ip}`, 8, 60_000);
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
  const notes = String(formData.get("notes") || "").trim();

  if (!fullName || !mobile || !notes) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await prisma.lead.create({
      data: {
        type: "CONTACT",
        fullName,
        mobile,
        email: null,
        municipality: "-",
        barangay: "-",
        addressLine: "-",
        notes,
      },
    });
  } catch (error) {
    console.error("[lead-contact] Failed to save lead", error);
  }

  try {
    await sendLeadNotification(
      `New Contact: ${fullName}`,
      `<p>New contact from ${fullName}</p><p>Mobile: ${mobile}</p><p>Message: ${notes}</p>`
    );
  } catch (error) {
    console.error("[lead-contact] Failed to send notification", error);
  }

  return NextResponse.redirect(new URL("/contact?sent=1", request.url));
}

