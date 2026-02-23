import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Settings",
};

export default function AdminSettingsPage() {
  return (
    <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Business Info</p>
      <div className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
        <p>Name: {siteConfig.name}</p>
        <p>Tagline: {siteConfig.tagline}</p>
        <p>Hotline: {siteConfig.hotline}</p>
        <p>Email: {siteConfig.email}</p>
        <p>Address: {siteConfig.address.line1}, {siteConfig.address.line2}</p>
        <p>Support hours: {siteConfig.supportHours}</p>
      </div>
      <p className="mt-4 text-xs text-[color:var(--muted)]">
        Update these values in src/config/site.ts. This page is read-only.
      </p>
    </div>
  );
}

