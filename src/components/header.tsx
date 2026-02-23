import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { siteConfig } from "@/config/site";

const navItems = [
  { href: "/plans", label: "Plans" },
  { href: "/coverage", label: "Coverage" },
  { href: "/support", label: "Support" },
  { href: "/status", label: "Status" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-white/80 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white">
              <Image src="/images/intconverge-logo.svg" alt="INTCONVERGE COMMUNICATION" width={44} height={44} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-3)]">
                {siteConfig.name}
              </p>
              <p className="text-xs text-[color:var(--muted)]">{siteConfig.tagline}</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[color:var(--accent)]">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button href="/apply">Apply Now</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

