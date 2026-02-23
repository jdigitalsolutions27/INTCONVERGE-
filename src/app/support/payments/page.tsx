import { Container } from "@/components/container";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Payments",
  description: "Payment options and reminders for INTCONVERGE COMMUNICATION subscribers.",
};

export default function PaymentsPage() {
  return (
    <Container>
      <section className="py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Payments</p>
            <h1 className="mt-3 text-4xl font-semibold">Payment options & reminders</h1>
            <p className="mt-3 text-[color:var(--muted)]">Keep your connection active with on-time payments.</p>
            <div className="mt-6 space-y-3 text-sm text-[color:var(--muted)]">
              <p>- Billing cycle: monthly, every 30 days from activation.</p>
              <p>- Due date reminder: SMS sent 3 days before due date.</p>
              <p>- Disconnection: after 7 days past due.</p>
            </div>
          </div>
          <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold">How to pay</p>
            <p className="mt-3 text-sm text-[color:var(--muted)]">{siteConfig.paymentInstructions}</p>
            <div className="mt-4 rounded-2xl bg-[color:var(--bg-2)] p-4 text-sm text-[color:var(--muted)]">
              For payment confirmation, send your receipt via Facebook Messenger or email.
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

