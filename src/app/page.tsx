import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/db";
import { formatPhp } from "@/lib/format";
import { idealForSpeed, normalizeFeatures } from "@/lib/plans";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredPlans = await prisma.plan.findMany({
    where: { isFeatured: true },
    orderBy: { pricePhp: "asc" },
    take: 3,
  });

  const announcements = await prisma.announcement.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const promos = await prisma.announcement.findMany({
    where: { isPublished: true, category: "PROMO" },
    orderBy: { publishedAt: "desc" },
    take: 2,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "InternetServiceProvider"],
    name: siteConfig.name,
    description: siteConfig.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: "Borongan City",
      addressRegion: "Eastern Visayas",
      postalCode: siteConfig.address.postalCode,
      addressCountry: "PH",
    },
    areaServed: siteConfig.serviceAreas,
    telephone: siteConfig.hotline,
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  };

  const barangayPartners = ["Balud", "Campesao", "Baras", "Llorente", "Maydolong", "Guiuan"];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-soft opacity-60" />
        <Container>
          <div className="relative grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
                Eastern Visayas Fiber ISP
              </span>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Fast, Reliable Internet for Borongan & Nearby Areas
              </h1>
              <p className="text-lg text-[color:var(--muted)]">
                {siteConfig.name} connects households and businesses across Eastern Samar with dependable fiber
                internet and local, responsive support.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/apply">Apply Now</Button>
                <Button href="/coverage" variant="secondary">
                  Check Availability
                </Button>
                <Button href={siteConfig.facebookMessenger} variant="dark">
                  Message on Facebook
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-[color:var(--muted)]">
                <div>
                  <p className="text-lg font-semibold text-[color:var(--accent)]">3-7 days</p>
                  <p>Typical installation window</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[color:var(--accent)]">24/7 network watch</p>
                  <p>Proactive monitoring</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[color:var(--accent)]">No hidden fees</p>
                  <p>{siteConfig.noHiddenFeesText}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
                  Steps to Get Connected
                </p>
                <ol className="mt-6 space-y-5 text-sm">
                  <li className="flex gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--accent)] text-white">
                      1
                    </span>
                    <div>
                      <p className="font-semibold">Check availability</p>
                      <p className="text-[color:var(--muted)]">Confirm your barangay coverage in minutes.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--accent-2)] text-[color:var(--ink)]">
                      2
                    </span>
                    <div>
                      <p className="font-semibold">Apply online</p>
                      <p className="text-[color:var(--muted)]">Share your details and choose a plan.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--accent-3)] text-white">
                      3
                    </span>
                    <div>
                      <p className="font-semibold">Installation visit</p>
                      <p className="text-[color:var(--muted)]">We install and activate in 3-7 days.</p>
                    </div>
                  </li>
                </ol>
                <div className="mt-8 rounded-2xl bg-[color:var(--bg-2)] p-4 text-xs text-[color:var(--muted)]">
                  {siteConfig.coverageNote}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div className="rounded-3xl border border-[color:var(--border)] bg-white/90 p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
              Trusted by Barangays
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-[color:var(--muted)]">
              {barangayPartners.map((barangay) => (
                <span
                  key={barangay}
                  className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg-2)] px-4 py-2"
                >
                  {barangay}
                </span>
              ))}
              <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg-2)] px-4 py-2">
                More barangays onboarding
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
                Featured Plans
              </p>
              <h2 className="text-3xl font-semibold">Choose a plan that fits your household</h2>
              <p className="text-[color:var(--muted)]">
                Every plan includes unlimited data, dependable uptime monitoring, and local support from our Borongan
                team.
              </p>
            </div>
            <div className="flex items-center gap-3 lg:justify-end">
              <Button href="/plans" variant="secondary">
                Compare All Plans
              </Button>
              <Button href="/apply">Apply Now</Button>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredPlans.map((plan) => (
              <div key={plan.id} className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
                  {plan.name}
                </p>
                <p className="mt-4 text-4xl font-semibold">{plan.speedMbps} Mbps</p>
                <p className="text-sm text-[color:var(--muted)]">{idealForSpeed(plan.speedMbps)}</p>
                <p className="mt-6 text-2xl font-semibold">{formatPhp(plan.pricePhp)}/mo</p>
                <p className="text-xs text-[color:var(--muted)]">{plan.contractMonths}-month contract</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent-3)]">
                  <span className="rounded-full border border-[color:var(--border)] px-3 py-1">Router Included</span>
                  <span className="rounded-full border border-[color:var(--border)] px-3 py-1">
                    {plan.installFeePhp ? `Install: ${formatPhp(plan.installFeePhp)}` : "Installation Included"}
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
                  {normalizeFeatures(plan.features).slice(0, 4).map((feature) => (
                    <li key={feature}>- {feature}</li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-2">
                  <Button href={`/plans/${plan.slug}`} variant="secondary">
                    View Details
                  </Button>
                  <Button href="/apply">Apply</Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
                Real Installations
              </p>
              <h2 className="mt-3 text-3xl font-semibold">Local crews, real upgrades</h2>
              <p className="mt-3 text-[color:var(--muted)]">
                From site survey to activation, our Borongan-based team handles your fiber installation with care.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  "Survey and line planning",
                  "Clean indoor router setup",
                  "Signal testing and handover",
                ].map((label) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-[color:var(--border)] bg-white p-4 shadow-soft"
                  >
                    <div className="h-28 rounded-2xl bg-[color:var(--bg-2)] tech-lines" />
                    <p className="mt-3 text-sm font-semibold">{label}</p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">Photo slot for actual install shots.</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
                Why Switch to INTCONVERGE COMMUNICATION
              </p>
              <div className="mt-4 overflow-auto">
                <table className="min-w-[420px] w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      <th className="py-2">What you get</th>
                      <th>INTCONVERGE COMMUNICATION</th>
                      <th>Legacy ISP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Local support in Borongan", "Yes", "Limited"],
                      ["Clear install timeline", "3-7 days", "Unclear"],
                      ["Network monitoring", "24/7", "Basic"],
                      ["Barangay updates", "SMS + FB", "Inconsistent"],
                    ].map((row) => (
                      <tr key={row[0]} className="border-t border-[color:var(--border)]">
                        <td className="py-3 font-semibold">{row[0]}</td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6">
                <Button href="/apply">Switch to INTCONVERGE COMMUNICATION</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {promos.length > 0 ? (
        <section className="py-16">
          <Container>
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--accent-3)] p-8 text-white shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">Promos</p>
              <h2 className="mt-3 text-3xl font-semibold">Limited-time offers</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {promos.map((promo) => (
                  <div key={promo.id} className="rounded-2xl bg-white/10 p-4">
                    <p className="text-sm font-semibold">{promo.title}</p>
                    <p className="mt-2 text-xs text-white/80">{promo.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-[color:var(--border)] bg-white p-8 shadow-soft">
              <h2 className="text-3xl font-semibold">Check Availability in Your Barangay</h2>
              <p className="mt-3 text-[color:var(--muted)]">
                Use our coverage checker to see if we can connect your home today. If coverage is limited, we will
                keep you on priority waitlist.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/coverage">Check Coverage</Button>
                <Button href="/apply" variant="secondary">
                  Apply Now
                </Button>
              </div>
              <div className="mt-6 grid gap-4 text-sm text-[color:var(--muted)] md:grid-cols-2">
                <div>
                  <p className="font-semibold text-[color:var(--ink)]">Local support</p>
                  <p>We handle installation, billing, and troubleshooting from Borongan.</p>
                </div>
                <div>
                  <p className="font-semibold text-[color:var(--ink)]">Flexible upgrades</p>
                  <p>Upgrade your plan anytime with no long wait.</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--accent-3)] p-8 text-white shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">Why INTCONVERGE COMMUNICATION</p>
              <h3 className="mt-4 text-3xl font-semibold">Bridging the digital divide in Eastern Samar</h3>
              <p className="mt-4 text-sm text-white/80">
                Our mission is to deliver reliable connectivity for education, work, and business growth across
                Borongan and nearby municipalities.
              </p>
              <div className="mt-6 space-y-3 text-sm">
                <p>- Dedicated fiber backbone in Borongan</p>
                <p>- Proactive monitoring and quick response</p>
                <p>- Transparent service process and updates</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
                Service Areas
              </p>
              <h2 className="mt-3 text-3xl font-semibold">Growing coverage across Eastern Visayas</h2>
              <p className="mt-3 text-[color:var(--muted)]">We prioritize barangays with the highest demand.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {siteConfig.serviceAreas.map((area) => (
                  <span key={area} className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm">
                    {area}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm text-[color:var(--muted)]">{siteConfig.mapNote}</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
                  Testimonials
                </p>
                <p className="mt-4 text-lg font-semibold">
                  "Stable speeds and fast support. We can finally run online classes smoothly."
                </p>
                <p className="mt-3 text-sm text-[color:var(--muted)]">- Maria L., Brgy. Balud</p>
              </div>
              <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
                  Customer Promise
                </p>
                <p className="mt-4 text-sm text-[color:var(--muted)]">
                  {siteConfig.socialProof.ratingText}. We keep communication open through SMS, phone, and Facebook
                  Messenger.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-[color:var(--border)] bg-white p-8 shadow-soft">
              <h2 className="text-3xl font-semibold">Latest Service Advisories</h2>
              <p className="mt-3 text-[color:var(--muted)]">
                Stay informed with live updates on planned maintenance, outages, and promos.
              </p>
              <div className="mt-6 space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="rounded-2xl border border-[color:var(--border)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
                      {announcement.category}
                    </p>
                    <p className="mt-2 font-semibold">{announcement.title}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button href="/status" variant="secondary">
                  View Status Page
                </Button>
              </div>
            </div>
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--accent)] p-8 text-white shadow-soft">
              <h2 className="text-3xl font-semibold">Ready to get connected?</h2>
              <p className="mt-3 text-white/80">
                Apply online and our team will reach out within one business day to schedule your installation.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/apply" variant="dark">
                  Apply Now
                </Button>
                <Button href="/contact" variant="secondary">
                  Request a Callback
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

