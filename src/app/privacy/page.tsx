import { Container } from "@/components/container";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <Container>
      <section className="py-14">
        <h1 className="text-4xl font-semibold">Privacy Policy</h1>
        <div className="mt-6 space-y-4 text-sm text-[color:var(--muted)]">
          <p>
            INTCONVERGE COMMUNICATION collects personal information solely for processing service requests, support,
            and billing. We do not sell customer data to third parties.
          </p>
          <p>
            We retain application data for operational needs, regulatory compliance, and service improvements. Customers
            may request data updates or deletion through our support channels.
          </p>
          <p>
            By using this website, you consent to the collection and use of your data as described in this policy.
          </p>
        </div>
      </section>
    </Container>
  );
}

