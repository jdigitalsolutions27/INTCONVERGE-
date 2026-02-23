import { Container } from "@/components/container";
import { CoverageChecker } from "@/components/coverage-checker";
import { Button } from "@/components/button";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: "Coverage Checker",
  description: "Check coverage availability in your barangay with INTCONVERGE COMMUNICATION",
};

export default async function CoveragePage({ searchParams }: PageProps) {
  const callbackSent = searchParams?.callback === "1";
  const areas = await prisma.coverageArea.findMany({
    select: { municipality: true, barangay: true, status: true },
    orderBy: [{ municipality: "asc" }, { barangay: "asc" }],
  });

  return (
    <Container>
      <section className="py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Coverage</p>
            <h1 className="mt-3 text-4xl font-semibold">Check Availability in Your Barangay</h1>
            <p className="mt-3 text-[color:var(--muted)]">
              Enter your municipality and barangay to see if we can install fiber right away.
            </p>
            <div className="mt-6 rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
              <p className="text-sm font-semibold">What happens next</p>
              <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
                <li>- Available: Apply online and we schedule installation.</li>
                <li>- Limited: We'll confirm capacity and follow up.</li>
                <li>- Not yet: Join the priority waitlist.</li>
              </ul>
              <div className="mt-4">
                <Button href="/apply">Apply Now</Button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {callbackSent ? (
              <div className="rounded-3xl border border-[color:var(--border)] bg-white p-4 text-sm text-[color:var(--accent)] shadow-soft">
                Callback request received. We will contact you within one business day.
              </div>
            ) : null}
            <CoverageChecker areas={areas} />
          </div>
        </div>
        <div className="mt-8 text-sm text-[color:var(--muted)]">{siteConfig.mapNote}</div>
      </section>
    </Container>
  );
}

