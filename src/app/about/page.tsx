import { Container } from "@/components/container";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "About INTCONVERGE COMMUNICATION",
  description: "Learn about INTCONVERGE COMMUNICATION and our mission in Eastern Visayas.",
};

export default function AboutPage() {
  return (
    <Container>
      <section className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">About</p>
            <h1 className="mt-3 text-4xl font-semibold">Connecting Borongan to better opportunities</h1>
            <p className="mt-3 text-[color:var(--muted)]">
              {siteConfig.name} is a regional ISP focused on delivering reliable fiber connectivity to households and
              SMEs in Eastern Samar. Our local team works closely with barangay leaders to expand access in underserved
              communities.
            </p>
            <div className="mt-6 grid gap-4 text-sm text-[color:var(--muted)]">
              <p>- Mission: bridge the digital divide with dependable, fairly priced internet.</p>
              <p>- Promise: transparent service, proactive updates, and local support.</p>
              <p>- Coverage: Borongan City and nearby municipalities across Region VIII.</p>
            </div>
          </div>
          <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold">Legitimacy & compliance</p>
            <div className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
              <p>Legal name: {siteConfig.legalName}</p>
              <p>Registration: {siteConfig.registration}</p>
              <p>Address: {siteConfig.address.line1}, {siteConfig.address.line2}</p>
              <p>Support hours: {siteConfig.supportHours}</p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

