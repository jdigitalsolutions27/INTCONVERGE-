import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<string, string> = {
  primary:
    "bg-[color:var(--accent)] text-white shadow-soft hover:bg-[#0b5e54] focus-visible:outline-[color:var(--accent)]",
  secondary:
    "bg-white text-[color:var(--ink)] border border-[color:var(--border)] hover:border-[color:var(--accent)]",
  dark:
    "bg-[color:var(--accent-3)] text-white hover:bg-[#14263e] focus-visible:outline-[color:var(--accent-3)]",
};

export function Button({
  children,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "dark";
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}

