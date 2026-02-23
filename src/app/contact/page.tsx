import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/config/site";

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: "Contact",
  description: "Contact INTCONVERGE COMMUNICATION or request a callback.",
};

export default function ContactPage({ searchParams }: PageProps) {
  const sent = searchParams?.sent === "1";

  return (
    <Container>
      <section className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Contact</p>
            <h1 className="mt-3 text-4xl font-semibold">Let's talk about your connection</h1>
            <p className="mt-3 text-[color:var(--muted)]">
              Reach us through the form, Facebook Messenger, or hotline for faster assistance.
            </p>
            <div className="mt-6 space-y-3 text-sm text-[color:var(--muted)]">
              <p>Hotline: {siteConfig.hotline}</p>
              <p>Email: {siteConfig.email}</p>
              <p>Support hours: {siteConfig.supportHours}</p>
            </div>
            <Link
              href={siteConfig.facebookMessenger}
              className="mt-6 inline-flex rounded-full bg-[color:var(--accent)] px-6 py-2 text-sm font-semibold text-white"
            >
              Message on Facebook
            </Link>
          </div>
          <div className="space-y-4">
            {sent ? (
              <div className="rounded-3xl border border-[color:var(--border)] bg-white p-4 text-sm text-[color:var(--accent)] shadow-soft">
                Message sent. We will reply shortly.
              </div>
            ) : null}
            <form
              className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft"
              action="/api/leads/contact"
              method="post"
            >
              <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-semibold">Full Name *</label>
                  <input name="fullName" required className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold">Mobile or Email *</label>
                  <input name="mobile" required className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold">Message *</label>
                  <textarea name="notes" required rows={4} className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm" />
                </div>
                <button
                  type="submit"
                  className="rounded-2xl bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Container>
  );
}

