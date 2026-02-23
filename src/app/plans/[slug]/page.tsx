import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { formatPhp } from "@/lib/format";
import { idealForSpeed, normalizeFeatures } from "@/lib/plans";
import { getPlanBySlug } from "@/lib/public-data";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps) {
  const plan = await getPlanBySlug(params.slug);

  if (!plan) {
    return { title: "Plan Not Found" };
  }

  return {
    title: plan.name,
    description: `INTCONVERGE COMMUNICATION ${plan.name} with ${plan.speedMbps} Mbps at ${formatPhp(plan.pricePhp)} per month.`,
    alternates: {
      canonical: `/plans/${plan.slug}`,
    },
  };
}

export default async function PlanDetailPage({ params }: PageProps) {
  const plan = await getPlanBySlug(params.slug);

  if (!plan) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Plans",
        item: "/plans",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: plan.name,
        item: `/plans/${plan.slug}`,
      },
    ],
  };

  return (
    <Container>
      <section className="py-14">
        <nav className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
          <Link href="/" className="hover:text-[color:var(--accent)]">Home</Link> /{" "}
          <Link href="/plans" className="hover:text-[color:var(--accent)]">Plans</Link> /{" "}
          <span className="text-[color:var(--accent-3)]">{plan.name}</span>
        </nav>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Plan Details</p>
            <h1 className="mt-3 text-4xl font-semibold">{plan.name}</h1>
            <p className="mt-3 text-[color:var(--muted)]">
              Reliable fiber internet built for homes and businesses across Borongan and Eastern Samar.
            </p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">{idealForSpeed(plan.speedMbps)}</p>
            <div className="mt-6 grid gap-3 text-sm">
              <p>Speed: {plan.speedMbps} Mbps</p>
              <p>Monthly fee: {formatPhp(plan.pricePhp)}</p>
              <p>Contract: {plan.contractMonths} months</p>
              <p>Installation fee: {plan.installFeePhp ? formatPhp(plan.installFeePhp) : "Free"}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent-3)]">
              <span className="rounded-full border border-[color:var(--border)] px-3 py-1">Router Included</span>
              <span className="rounded-full border border-[color:var(--border)] px-3 py-1">
                {plan.installFeePhp ? `Install: ${formatPhp(plan.installFeePhp)}` : "Installation Included"}
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/apply">Apply Now</Button>
              <Button href="/coverage" variant="secondary">
                Check Coverage
              </Button>
            </div>
          </div>
          <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">What's included</p>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
              {normalizeFeatures(plan.features).map((feature) => (
                <li key={feature}>- {feature}</li>
              ))}
            </ul>
            {plan.promoText ? (
              <div className="mt-6 rounded-2xl bg-[color:var(--bg-2)] p-4 text-sm text-[color:var(--muted)]">
                {plan.promoText}
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Container>
  );
}
