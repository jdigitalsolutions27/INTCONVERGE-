import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getAdminSession } from "@/lib/auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const session = getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/leads", label: "Leads" },
    { href: "/admin/plans", label: "Plans" },
    { href: "/admin/coverage", label: "Coverage" },
    { href: "/admin/announcements", label: "Announcements" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-[color:var(--bg)]">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-3xl border border-[color:var(--border)] bg-white p-4 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Admin</p>
          <p className="mt-2 text-lg font-semibold">INTCONVERGE COMMUNICATION Console</p>
          <div className="mt-6 flex flex-col gap-2 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl px-3 py-2 hover:bg-[color:var(--bg-2)]">
                {item.label}
              </Link>
            ))}
          </div>
          <form action="/api/admin/logout" method="post" className="mt-6">
            <button className="w-full rounded-2xl border border-[color:var(--border)] px-3 py-2 text-xs font-semibold">
              Sign out
            </button>
          </form>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}

