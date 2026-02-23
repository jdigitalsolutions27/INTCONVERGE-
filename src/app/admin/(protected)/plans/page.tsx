import { prisma } from "@/lib/db";
import { normalizeFeatures } from "@/lib/plans";

export const metadata = {
  title: "Plans Admin",
};

export default async function AdminPlansPage() {
  const plans = await prisma.plan.findMany({ orderBy: { pricePhp: "asc" } });

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Create Plan</p>
        <form className="mt-4 grid gap-3" action="/api/admin/plans" method="post">
          <div className="grid gap-3 md:grid-cols-2">
            <input name="name" placeholder="Plan name" required className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
            <input name="slug" placeholder="Slug" required className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            <input name="speedMbps" placeholder="Speed Mbps" required className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
            <input name="pricePhp" placeholder="Price PHP" required className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
            <input name="contractMonths" placeholder="Contract months" required className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
            <input name="installFeePhp" placeholder="Install fee" className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
          </div>
          <input name="promoText" placeholder="Promo text (optional)" className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
          <textarea name="features" placeholder="Features, one per line" className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" rows={3} />
          <label className="text-xs font-semibold">
            <input type="checkbox" name="isFeatured" /> Feature this plan
          </label>
          <button className="rounded-2xl bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white">
            Save Plan
          </button>
        </form>
      </div>

      <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Existing Plans</p>
        <div className="mt-4 space-y-4">
          {plans.map((plan) => (
            <form
              key={plan.id}
              className="rounded-2xl border border-[color:var(--border)] p-4"
              action={`/api/admin/plans/${plan.id}`}
              method="post"
            >
              <div className="grid gap-3 md:grid-cols-2">
                <input name="name" defaultValue={plan.name} required className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
                <input name="slug" defaultValue={plan.slug} required className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
              </div>
              <div className="mt-2 grid gap-3 md:grid-cols-4">
                <input name="speedMbps" defaultValue={plan.speedMbps} className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
                <input name="pricePhp" defaultValue={plan.pricePhp} className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
                <input name="contractMonths" defaultValue={plan.contractMonths} className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
                <input name="installFeePhp" defaultValue={plan.installFeePhp ?? ""} className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
              </div>
              <input name="promoText" defaultValue={plan.promoText ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm" />
              <textarea
                name="features"
                defaultValue={normalizeFeatures(plan.features).join("\n")}
                className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-3 py-2 text-sm"
                rows={3}
              />
              <label className="mt-2 inline-flex items-center gap-2 text-xs font-semibold">
                <input type="checkbox" name="isFeatured" defaultChecked={plan.isFeatured} /> Featured
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold text-white">
                  Update
                </button>
                <button
                  formAction={`/api/admin/plans/${plan.id}?delete=1`}
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

