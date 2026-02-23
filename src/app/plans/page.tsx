import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { prisma } from "@/lib/db";
import { formatPhp } from "@/lib/format";
import { idealForSpeed, normalizeFeatures } from "@/lib/plans";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Plans & Pricing",
  description: "Compare INTCONVERGE COMMUNICATION fiber plans in Borongan and nearby areas.",
};

export default async function PlansPage() {
  const plans = await prisma.plan.findMany({
    orderBy: [{ pricePhp: "asc" }],
  });

  return (
    <Container>
      <section className="py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
              Plans & Pricing
            </p>
            <h1 className="mt-3 text-4xl font-semibold">Choose the plan that matches your household</h1>
            <p className="mt-3 text-[color:var(--muted)]">
              All plans include unlimited data, free router, and local Borongan-based support. Upgrade anytime.
            </p>
          </div>
          <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold">Included with every plan</p>
            <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
              <li>- Unlimited data, no throttling</li>
              <li>- Free installation assessment</li>
              <li>- 24/7 network monitoring</li>
              <li>- Local tech support via phone & Messenger</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.id} className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
                  {plan.name}
                </p>
                {plan.isFeatured ? (
                  <span className="rounded-full bg-[color:var(--accent-2)] px-3 py-1 text-xs font-semibold text-[color:var(--ink)]">
                    Popular
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-4xl font-semibold">{plan.speedMbps} Mbps</p>
              <p className="mt-3 text-2xl font-semibold">{formatPhp(plan.pricePhp)}/mo</p>
              <p className="text-xs text-[color:var(--muted)]">{plan.contractMonths}-month contract</p>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{idealForSpeed(plan.speedMbps)}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent-3)]">
                <span className="rounded-full border border-[color:var(--border)] px-3 py-1">Router Included</span>
                <span className="rounded-full border border-[color:var(--border)] px-3 py-1">
                  {plan.installFeePhp ? `Install: ${formatPhp(plan.installFeePhp)}` : "Installation Included"}
                </span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
                {normalizeFeatures(plan.features).map((feature) => (
                  <p key={feature}>- {feature}</p>
                ))}
              </div>
              {plan.promoText ? (
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  {plan.promoText}
                </p>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-2">
                <Button href={`/plans/${plan.slug}`} variant="secondary">
                  View Details
                </Button>
                <Button href="/apply">Apply Now</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-semibold">Plan comparison at a glance</h2>
          <div className="mt-4 overflow-auto">
            <table className="min-w-[640px] w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  <th className="py-2">Plan</th>
                  <th>Speed</th>
                  <th>Monthly</th>
                  <th>Contract</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id} className="border-t border-[color:var(--border)]">
                    <td className="py-3 font-semibold">{plan.name}</td>
                    <td>{plan.speedMbps} Mbps</td>
                    <td>{formatPhp(plan.pricePhp)}</td>
                    <td>{plan.contractMonths} months</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Container>
  );
}

