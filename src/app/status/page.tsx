import { Container } from "@/components/container";
import { getAnnouncements } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Service Status",
  description: "Latest advisories, maintenance, and outage updates from INTCONVERGE COMMUNICATION.",
};

export default async function StatusPage() {
  const announcements = await getAnnouncements();

  return (
    <Container>
      <section className="py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Status</p>
        <h1 className="mt-3 text-4xl font-semibold">Service advisories</h1>
        <p className="mt-3 text-[color:var(--muted)]">Stay updated on maintenance, outages, and promos.</p>
        <div className="mt-8 space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
                <span>{announcement.category}</span>
                {announcement.publishedAt ? (
                  <span>{new Date(announcement.publishedAt).toLocaleDateString("en-PH")}</span>
                ) : null}
              </div>
              <h2 className="mt-3 text-xl font-semibold">{announcement.title}</h2>
              <p className="mt-3 text-sm text-[color:var(--muted)]">{announcement.content}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}

