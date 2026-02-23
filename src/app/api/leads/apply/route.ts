import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";
import { saveUploads } from "@/lib/uploads";
import { sendLeadNotification } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getRequestIp();
  const limit = rateLimit(`apply:${ip}`, 5, 60_000);
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
  const email = String(formData.get("email") || "").trim();
  const municipality = String(formData.get("municipality") || "").trim();
  const barangay = String(formData.get("barangay") || "").trim();
  const addressLine = String(formData.get("addressLine") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  const preferredSchedule = String(formData.get("preferredSchedule") || "").trim();
  const planInterestId = String(formData.get("planInterestId") || "").trim();
  const consent = formData.get("consent") === "on";

  if (!consent) {
    return NextResponse.json({ error: "Consent required" }, { status: 400 });
  }

  const attachments = formData
    .getAll("attachments")
    .filter((item): item is File => item instanceof File);
  if (attachments.length > 2) {
    return NextResponse.json({ error: "Too many files" }, { status: 400 });
  }

  if (!fullName || !mobile || !municipality || !barangay || !addressLine) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: {
      type: "APPLY",
      fullName,
      mobile,
      email: email || null,
      municipality,
      barangay,
      addressLine,
      notes: notes || null,
      preferredSchedule: preferredSchedule || null,
      planInterestId: planInterestId || null,
    },
  });

  if (attachments.length > 0) {
    const saved = await saveUploads(attachments, lead.id);
    for (const file of saved) {
      await prisma.attachment.create({
        data: {
          leadId: lead.id,
          fileName: file.fileName,
          filePath: file.filePath,
          mimeType: file.mimeType,
          size: file.size,
        },
      });
    }
  }

  await sendLeadNotification(
    `New Application: ${fullName}`,
    `<p>New application from ${fullName}</p><p>Mobile: ${mobile}</p><p>Address: ${addressLine}, ${barangay}, ${municipality}</p>`
  );

  return NextResponse.redirect(new URL("/apply/success", request.url));
}

