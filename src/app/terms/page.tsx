import { Container } from "@/components/container";

export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <Container>
      <section className="py-14">
        <h1 className="text-4xl font-semibold">Terms of Service</h1>
        <div className="mt-6 space-y-4 text-sm text-[color:var(--muted)]">
          <p>
            Service availability depends on network capacity, line-of-sight, and site readiness. INTCONVERGE COMMUNICATION will confirm
            installation details before activation.
          </p>
          <p>
            Subscribers agree to pay monthly fees on time and keep equipment in good condition. Delinquent accounts may
            be temporarily suspended.
          </p>
          <p>
            Network performance may vary due to factors outside INTCONVERGE COMMUNICATION control, including weather and upstream outages.
          </p>
        </div>
      </section>
    </Container>
  );
}

