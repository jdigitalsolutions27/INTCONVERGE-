import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage({ searchParams }: PageProps) {
  const session = getAdminSession();
  if (session) {
    redirect("/admin");
  }

  const error = searchParams?.error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--bg)] px-4">
      <form
        className="w-full max-w-md rounded-3xl border border-[color:var(--border)] bg-white p-8 shadow-soft"
        action="/api/admin/login"
        method="post"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Admin Login</p>
        <h1 className="mt-3 text-2xl font-semibold">Welcome back</h1>
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input name="email" type="email" required className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input name="password" type="password" required className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm" />
          </div>
          <button className="w-full rounded-2xl bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

