import { prisma } from "@/lib/db";

export const metadata = {
  title: "Coverage Admin",
};

export default async function AdminCoveragePage() {
  const areas = await prisma.coverageArea.findMany({
    orderBy: [{ municipality: "asc" }, { barangay: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Add Coverage Area</p>
        <form className="mt-4 grid gap-3 md:grid-cols-4" action="/api/admin/coverage" method="post">
          <input name="municipality" placeholder="Municipality" required className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
          <input name="barangay" placeholder="Barangay" required className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
          <select name="status" className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm">
            <option value="AVAILABLE">Available</option>
            <option value="LIMITED">Limited</option>
            <option value="NOT_YET">Not yet</option>
          </select>
          <input name="notes" placeholder="Notes" className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
          <button className="rounded-2xl bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white md:col-span-4">
            Save Area
          </button>
        </form>
      </div>

      <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Coverage List</p>
        <div className="mt-4 space-y-3">
          {areas.map((area) => (
            <form
              key={area.id}
              action={`/api/admin/coverage/${area.id}`}
              method="post"
              className="grid gap-2 rounded-2xl border border-[color:var(--border)] p-3 md:grid-cols-4"
            >
              <input name="municipality" defaultValue={area.municipality} className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
              <input name="barangay" defaultValue={area.barangay} className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
              <select name="status" defaultValue={area.status} className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm">
                <option value="AVAILABLE">Available</option>
                <option value="LIMITED">Limited</option>
                <option value="NOT_YET">Not yet</option>
              </select>
              <input name="notes" defaultValue={area.notes ?? ""} className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
              <div className="md:col-span-4 flex gap-2">
                <button className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold text-white">Update</button>
                <button
                  formAction={`/api/admin/coverage/${area.id}?delete=1`}
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

