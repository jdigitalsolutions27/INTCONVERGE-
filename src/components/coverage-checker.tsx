"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type CoverageResult = {
  status: "AVAILABLE" | "LIMITED" | "NOT_YET";
  notes?: string | null;
};

type Area = {
  municipality: string;
  barangay: string;
  status: string;
};

const statusLabels: Record<CoverageResult["status"], string> = {
  AVAILABLE: "Available",
  LIMITED: "Limited",
  NOT_YET: "Not Yet",
};

export function CoverageChecker({ areas }: { areas: Area[] }) {
  const [municipality, setMunicipality] = useState("");
  const [barangay, setBarangay] = useState("");
  const [result, setResult] = useState<CoverageResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);

  const municipalities = useMemo(() => {
    return Array.from(new Set(areas.map((area) => area.municipality))).sort();
  }, [areas]);

  const barangays = useMemo(() => {
    if (!municipality) return [];
    return areas
      .filter((area) => area.municipality === municipality)
      .map((area) => area.barangay)
      .sort();
  }, [areas, municipality]);

  const suggestedAreas = useMemo(() => {
    if (!municipality) return [];
    const inMunicipality = areas.filter(
      (area) => area.municipality === municipality && area.status === "AVAILABLE"
    );
    if (inMunicipality.length > 0) {
      return inMunicipality.slice(0, 4);
    }
    return areas.filter((area) => area.status === "AVAILABLE").slice(0, 4);
  }, [areas, municipality]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    setCallbackSent(false);

    const response = await fetch(
      `/api/coverage?municipality=${encodeURIComponent(municipality)}&barangay=${encodeURIComponent(barangay)}`
    );
    const data = (await response.json()) as CoverageResult;
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-semibold">Municipality / City</label>
          <input
            list="municipalities"
            required
            value={municipality}
            onChange={(event) => {
              setMunicipality(event.target.value);
              setBarangay("");
            }}
            className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm"
            placeholder="Start typing municipality"
          />
          <datalist id="municipalities">
            {municipalities.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="text-sm font-semibold">Barangay</label>
          <input
            list="barangays"
            required
            value={barangay}
            onChange={(event) => setBarangay(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm"
            placeholder="Start typing barangay"
          />
          <datalist id="barangays">
            {barangays.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
        </div>
        <button
          type="submit"
          className="rounded-2xl bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Availability"}
        </button>
      </form>

      {result ? (
        <div className="mt-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-2)] p-4 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Result</p>
          <p className="mt-2 text-lg font-semibold">
            {statusLabels[result.status] || "Not Yet"}
          </p>
          <p className="mt-2 text-[color:var(--muted)]">{result.notes || "We will confirm during site survey."}</p>
          {result.status === "NOT_YET" ? (
            <p className="mt-2 text-xs text-[color:var(--muted)]">
              Next expansion ETA: we will notify priority waitlist within 30-60 days.
            </p>
          ) : null}
          {result.status === "AVAILABLE" ? (
            <Link
              href="/apply"
              className="mt-4 inline-flex rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold text-white"
            >
              Apply Now
            </Link>
          ) : (
            <div className="mt-4">
              {suggestedAreas.length > 0 ? (
                <div className="mb-3 text-xs text-[color:var(--muted)]">
                  Nearby available areas:{" "}
                  {suggestedAreas.map((area) => `${area.barangay}, ${area.municipality}`).join(" | ")}
                </div>
              ) : null}
              {callbackSent ? (
                <p className="text-xs font-semibold text-[color:var(--accent)]">Callback request sent.</p>
              ) : (
                <form
                  className="grid gap-2"
                  action="/api/leads/callback"
                  method="post"
                  onSubmit={() => setCallbackSent(true)}
                >
                  <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
                  <input type="hidden" name="municipality" value={municipality} />
                  <input type="hidden" name="barangay" value={barangay} />
                  <input
                    name="fullName"
                    placeholder="Your name"
                    required
                    className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-xs"
                  />
                  <input
                    name="mobile"
                    placeholder="Mobile number"
                    required
                    className="rounded-2xl border border-[color:var(--border)] px-3 py-2 text-xs"
                  />
                  <button className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold text-white">
                    Request Callback
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

