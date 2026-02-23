import { prisma } from "@/lib/db";

export const metadata = {
  title: "Announcements Admin",
};

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">New Announcement</p>
        <form className="mt-4 grid gap-3" action="/api/admin/announcements" method="post">
          <div className="grid gap-3 md:grid-cols-2">
            <input name="title" placeholder="Title" required className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
            <input name="slug" placeholder="Slug" required className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
          </div>
          <select name="category" className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm">
            <option value="MAINTENANCE">Maintenance</option>
            <option value="OUTAGE">Outage</option>
            <option value="PROMO">Promo</option>
            <option value="NOTICE">Notice</option>
          </select>
          <textarea name="content" placeholder="Content (markdown)" rows={4} className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
          <label className="text-xs font-semibold">
            <input type="checkbox" name="isPublished" /> Publish now
          </label>
          <button className="rounded-2xl bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white">
            Save Announcement
          </button>
        </form>
      </div>

      <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Announcement List</p>
        <div className="mt-4 space-y-4">
          {announcements.map((announcement) => (
            <form
              key={announcement.id}
              action={`/api/admin/announcements/${announcement.id}`}
              method="post"
              className="rounded-2xl border border-[color:var(--border)] p-4"
            >
              <div className="grid gap-3 md:grid-cols-2">
                <input name="title" defaultValue={announcement.title} className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
                <input name="slug" defaultValue={announcement.slug} className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
              </div>
              <select name="category" defaultValue={announcement.category} className="mt-2 rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm">
                <option value="MAINTENANCE">Maintenance</option>
                <option value="OUTAGE">Outage</option>
                <option value="PROMO">Promo</option>
                <option value="NOTICE">Notice</option>
              </select>
              <textarea name="content" defaultValue={announcement.content} rows={4} className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
              <label className="mt-2 inline-flex items-center gap-2 text-xs font-semibold">
                <input type="checkbox" name="isPublished" defaultChecked={announcement.isPublished} /> Published
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold text-white">Update</button>
                <button
                  formAction={`/api/admin/announcements/${announcement.id}?delete=1`}
                  className="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs font-semibold"
                >
                  Delete
                </button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}

