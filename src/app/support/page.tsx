import Link from "next/link";
import { Container } from "@/components/container";

export const metadata = {
  title: "Support Hub",
  description: "Get help with payments, troubleshooting, and FAQs for INTCONVERGE COMMUNICATION subscribers.",
};

export default function SupportPage() {
  return (
    <Container>
      <section className="py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Support</p>
            <h1 className="mt-3 text-4xl font-semibold">Support hub for subscribers</h1>
            <p className="mt-3 text-[color:var(--muted)]">
              Find answers fast, pay your bill, and learn how to optimize your Wi-Fi performance.
            </p>
          </div>
          <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold">Quick actions</p>
            <div className="mt-4 grid gap-3 text-sm">
              <Link href="/support/payments" className="rounded-2xl border border-[color:var(--border)] p-4">
                Payment options and reminders
              </Link>
              <Link href="/support/troubleshooting" className="rounded-2xl border border-[color:var(--border)] p-4">
                Troubleshooting & speed tips
              </Link>
              <Link href="/support/faq" className="rounded-2xl border border-[color:var(--border)] p-4">
                FAQs about installation & billing
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold">Speed test guide</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Run a speed test while connected to Wi-Fi near the router, then share the result with support.
            </p>
            <Link
              href="/support/troubleshooting"
              className="mt-4 inline-flex rounded-full border border-[color:var(--border)] px-4 py-2 text-xs font-semibold"
            >
              View speed test steps
            </Link>
          </div>
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--accent-3)] p-6 text-white shadow-soft">
            <p className="text-sm font-semibold">Report an outage</p>
            <p className="mt-2 text-sm text-white/80">
              Let us know your barangay so we can prioritize restoration updates.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-[color:var(--accent-3)]"
            >
              Report via contact form
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}

