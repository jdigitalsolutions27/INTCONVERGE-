import Link from "next/link";
import { prisma } from "@/lib/db";

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: "Leads",
};

const statuses = ["NEW", "CONTACTED", "SCHEDULED", "INSTALLED", "WON", "LOST"];

export default async function AdminLeadsPage({ searchParams }: PageProps) {
  const status = searchParams?.status as string | undefined;
  const start = typeof searchParams?.start === "string" ? searchParams.start : undefined;
  const end = typeof searchParams?.end === "string" ? searchParams.end : undefined;
  const dateFilter =
    start || end
      ? {
          createdAt: {
            ...(start ? { gte: new Date(start) } : {}),
            ...(end ? { lte: new Date(end) } : {}),
          },
        }
      : {};
  const where = {
    ...(status ? { status } : {}),
    ...dateFilter,
  };

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Leads</p>
            <p className="text-sm text-[color:var(--muted)]">Filter by status or export CSV.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={`/api/admin/leads/export?${new URLSearchParams({
                ...(status ? { status } : {}),
                ...(start ? { start } : {}),
                ...(end ? { end } : {}),
              }).toString()}`}
              className="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs font-semibold"
            >
              Export CSV
            </a>
          </div>
        </div>
        <form className="mt-4 grid gap-2 text-xs md:grid-cols-3">
          <input
            type="date"
            name="start"
            defaultValue={start}
            className="rounded-2xl border border-[color:var(--border)] px-3 py-2"
          />
          <input
            type="date"
            name="end"
            defaultValue={end}
            className="rounded-2xl border border-[color:var(--border)] px-3 py-2"
          />
          <button className="rounded-2xl bg-[color:var(--accent)] px-3 py-2 font-semibold text-white">
            Apply date filter
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <Link href="/admin/leads" className="rounded-full border border-[color:var(--border)] px-3 py-1">
            All
          </Link>
          {statuses.map((item) => (
            <Link
              key={item}
              href={`/admin/leads?status=${item}`}
              className="rounded-full border border-[color:var(--border)] px-3 py-1"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
        <div className="overflow-auto">
          <table className="min-w-[800px] w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                <th className="py-2">Name</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Date</th>
                <th>Quick actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-[color:var(--border)]">
                  <td className="py-3 font-semibold">
                    <Link href={`/admin/leads/${lead.id}`} className="hover:text-[color:var(--accent)]">
                      {lead.fullName}
                    </Link>
                  </td>
                  <td>{lead.type}</td>
                  <td>
                    {lead.barangay}, {lead.municipality}
                  </td>
                  <td>{lead.status}</td>
                  <td>{new Date(lead.createdAt).toLocaleDateString("en-PH")}</td>
                  <td className="py-3">
                    <form action={`/api/admin/leads/${lead.id}`} method="post" className="flex flex-wrap gap-2">
                      <input type="hidden" name="internalNotes" value={lead.internalNotes ?? ""} />
                      {["CONTACTED", "SCHEDULED", "WON", "LOST"].map((value) => (
                        <button
                          key={value}
                          name="status"
                          value={value}
                          className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[10px] font-semibold uppercase"
                        >
                          {value}
                        </button>
                      ))}
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

