import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

type PageProps = {
  params: { id: string };
};

export const metadata = {
  title: "Lead Detail",
};

const statuses = ["NEW", "CONTACTED", "SCHEDULED", "INSTALLED", "WON", "LOST"];

export default async function LeadDetailPage({ params }: PageProps) {
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: { attachments: true, planInterest: true },
  });

  if (!lead) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Lead Detail</p>
        <h1 className="mt-2 text-2xl font-semibold">{lead.fullName}</h1>
        <div className="mt-4 grid gap-2 text-sm text-[color:var(--muted)]">
          <p>Type: {lead.type}</p>
          <p>Mobile: {lead.mobile}</p>
          <p>Email: {lead.email || "-"}</p>
          <p>
            Address: {lead.addressLine}, {lead.barangay}, {lead.municipality}, {lead.province}
          </p>
          <p>Plan interest: {lead.planInterest?.name || "-"}</p>
          <p>Preferred schedule: {lead.preferredSchedule || "-"}</p>
          <p>Notes: {lead.notes || "-"}</p>
        </div>
      </div>

      <form
        className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft"
        action={`/api/admin/leads/${lead.id}`}
        method="post"
      >
        <p className="text-sm font-semibold">Update status</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold">Status</label>
            <select name="status" defaultValue={lead.status} className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm">
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold">Internal Notes</label>
            <textarea name="internalNotes" defaultValue={lead.internalNotes || ""} className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm" rows={3} />
          </div>
        </div>
        <button className="mt-4 rounded-2xl bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white">
          Save Updates
        </button>
      </form>

      <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold">Attachments</p>
        <div className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
          {lead.attachments.length === 0 ? <p>No uploads.</p> : null}
          {lead.attachments.map((file) => (
            <p key={file.id}>{file.fileName}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
