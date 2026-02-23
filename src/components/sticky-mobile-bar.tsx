import Link from "next/link";
import { siteConfig } from "@/config/site";

export function StickyMobileBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex items-center gap-2 rounded-2xl border border-[color:var(--border)] bg-white/95 p-2 text-sm shadow-soft lg:hidden">
      <Link
        href="/apply"
        className="flex-1 rounded-xl bg-[color:var(--accent)] px-3 py-2 text-center font-semibold text-white"
      >
        Apply Now
      </Link>
      <Link
        href="/coverage"
        className="flex-1 rounded-xl border border-[color:var(--border)] px-3 py-2 text-center font-semibold"
      >
        Check Coverage
      </Link>
      <Link
        href={siteConfig.facebookMessenger}
        className="rounded-xl bg-[color:var(--accent-2)] px-3 py-2 text-center font-semibold text-[color:var(--ink)]"
      >
        FB
      </Link>
    </div>
  );
}

