import { Container } from "@/components/container";
import { ApplyForm } from "@/components/apply-form";
import { siteConfig } from "@/config/site";
import { getPlans } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Apply Now",
  description: "Apply for an INTCONVERGE COMMUNICATION fiber plan. Share your details and schedule installation.",
};

export default async function ApplyPage() {
  const plans = await getPlans();

  return (
    <Container>
      <section className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Apply Now</p>
            <h1 className="mt-3 text-4xl font-semibold">Get connected with INTCONVERGE COMMUNICATION</h1>
            <p className="mt-3 text-[color:var(--muted)]">
              Submit your application and we will reach out within one business day to confirm coverage and schedule
              installation.
            </p>
            <div className="mt-6 rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
              <p className="text-sm font-semibold">Requirements</p>
              <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
                <li>- Valid ID or proof of address</li>
                <li>- Contactable mobile number</li>
                <li>- Installation access at the location</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <ApplyForm plans={plans} />
            <p className="text-xs text-[color:var(--muted)]">
              {siteConfig.installationTimeline}. We will confirm requirements via SMS or call.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}

