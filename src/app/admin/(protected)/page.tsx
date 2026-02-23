import Link from "next/link";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboard() {
  const [leadCount, newLeads, plansCount, coverageCount] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.plan.count(),
    prisma.coverageArea.count(),
  ]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Overview</p>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-[color:var(--bg-2)] p-4">
            <p className="text-xs text-[color:var(--muted)]">Total leads</p>
            <p className="text-2xl font-semibold">{leadCount}</p>
          </div>
          <div className="rounded-2xl bg-[color:var(--bg-2)] p-4">
            <p className="text-xs text-[color:var(--muted)]">New leads</p>
            <p className="text-2xl font-semibold">{newLeads}</p>
          </div>
          <div className="rounded-2xl bg-[color:var(--bg-2)] p-4">
            <p className="text-xs text-[color:var(--muted)]">Plans</p>
            <p className="text-2xl font-semibold">{plansCount}</p>
          </div>
          <div className="rounded-2xl bg-[color:var(--bg-2)] p-4">
            <p className="text-xs text-[color:var(--muted)]">Coverage areas</p>
            <p className="text-2xl font-semibold">{coverageCount}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/admin/leads" className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold">Review new leads</p>
          <p className="mt-2 text-xs text-[color:var(--muted)]">Track applications, coverage requests, and callbacks.</p>
        </Link>
        <Link href="/admin/announcements" className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold">Publish advisories</p>
          <p className="mt-2 text-xs text-[color:var(--muted)]">Post maintenance updates and promos.</p>
        </Link>
      </div>
    </div>
  );
}

