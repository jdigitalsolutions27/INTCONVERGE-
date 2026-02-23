import Link from "next/link";
import { Container } from "@/components/container";

export const metadata = {
  title: "Application Submitted",
};

export default function ApplySuccessPage() {
  return (
    <Container>
      <section className="py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[color:var(--border)] bg-white p-8 text-center shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Success</p>
          <h1 className="mt-3 text-3xl font-semibold">Thanks for applying!</h1>
          <p className="mt-3 text-[color:var(--muted)]">
            Our team will contact you within one business day to confirm availability and schedule your installation.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-[color:var(--muted)]">
            <p>1. We verify barangay coverage and requirements.</p>
            <p>2. We call or text to confirm your preferred schedule.</p>
            <p>3. Installation visit within 3-7 days.</p>
          </div>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-[color:var(--accent)] px-6 py-2 text-sm font-semibold text-white"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </Container>
  );
}

