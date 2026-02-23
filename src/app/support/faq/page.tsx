import { Container } from "@/components/container";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about INTCONVERGE COMMUNICATION internet service.",
};

const faqs = [
  {
    q: "How fast are the plans in real-world use?",
    a: "Speeds vary based on device, Wi-Fi setup, and network conditions. We aim to deliver the subscribed speed with proper router placement and modern devices.",
  },
  {
    q: "Is the router included?",
    a: "Yes. Each plan includes a Wi-Fi router. You may upgrade to a higher-performance router upon request.",
  },
  {
    q: "How long does installation take?",
    a: "We typically install within 3-7 days after approval, depending on line availability and site readiness.",
  },
  {
    q: "What are the requirements for installation?",
    a: "A valid ID or proof of address, a reachable contact number, and access to the installation location.",
  },
  {
    q: "What is the billing cycle?",
    a: "Billing is monthly, every 30 days from activation. You will receive SMS reminders before the due date.",
  },
  {
    q: "What happens during outages or maintenance?",
    a: "We post advisories on the Status page and notify affected subscribers via SMS or Messenger when possible.",
  },
  {
    q: "How do I report an outage?",
    a: "Message us on Facebook Messenger or call the hotline. We post advisories on the Status page.",
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <Container>
      <section className="py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">FAQ</p>
        <h1 className="mt-3 text-4xl font-semibold">Frequently asked questions</h1>
        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
              <p className="font-semibold">{faq.q}</p>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </Container>
  );
}

