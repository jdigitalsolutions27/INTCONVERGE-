import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/config/site";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support/faq", label: "FAQ" },
  { href: "/status", label: "Service Status" },
];

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-white/90">
      <Container>
        <div className="grid gap-6 py-10 md:grid-cols-[2fr_1fr]">
          <div>
            <p className="text-lg font-semibold">{siteConfig.name}</p>
            <p className="text-sm text-[color:var(--muted)]">{siteConfig.tagline}</p>
            <div className="mt-4 space-y-2 text-sm">
              <p>{siteConfig.address.line1}</p>
              <p>{siteConfig.address.line2}</p>
              <p>{siteConfig.hotline}</p>
              <p>{siteConfig.email}</p>
              <p className="text-[color:var(--muted)]">Support hours: {siteConfig.supportHours}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">
              Quick Links
            </p>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-[color:var(--accent)]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[color:var(--border)] py-4 text-xs text-[color:var(--muted)]">
          (c) {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

