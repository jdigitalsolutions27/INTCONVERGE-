"use client";

import { useMemo, useState } from "react";

const steps = ["Coverage + Plan", "Your Details"] as const;

type PlanOption = {
  id: string;
  name: string;
  speedMbps: number;
};

type Props = {
  plans: PlanOption[];
};

export function ApplyForm({ plans }: Props) {
  const [step, setStep] = useState(0);
  const [municipality, setMunicipality] = useState("");
  const [barangay, setBarangay] = useState("");
  const [planInterestId, setPlanInterestId] = useState("");

  const planLabel = useMemo(() => {
    const plan = plans.find((item) => item.id === planInterestId);
    return plan ? `${plan.name} - ${plan.speedMbps} Mbps` : "No plan selected";
  }, [plans, planInterestId]);

  const canContinue = municipality.trim().length > 1 && barangay.trim().length > 1;

  return (
    <form
      className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft"
      action="/api/leads/apply"
      method="post"
      encType="multipart/form-data"
    >
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
        {steps.map((label, index) => (
          <span key={label} className={index === step ? "font-semibold text-[color:var(--accent-3)]" : ""}>
            {index + 1}. {label}
          </span>
        ))}
      </div>

      {step === 0 ? (
        <div className="mt-6 grid gap-4">
          <div>
            <label className="text-sm font-semibold">Municipality / City *</label>
            <input
              name="municipality"
              value={municipality}
              onChange={(event) => setMunicipality(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm"
              placeholder="Borongan City"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Barangay *</label>
            <input
              name="barangay"
              value={barangay}
              onChange={(event) => setBarangay(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm"
              placeholder="Balud"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Plan Interest</label>
            <select
              name="planInterestId"
              value={planInterestId}
              onChange={(event) => setPlanInterestId(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm"
            >
              <option value="">Select a plan</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - {plan.speedMbps} Mbps
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            disabled={!canContinue}
            className="rounded-2xl bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          <input type="hidden" name="municipality" value={municipality} />
          <input type="hidden" name="barangay" value={barangay} />
          <input type="hidden" name="planInterestId" value={planInterestId} />

          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-2)] p-4 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Summary</p>
            <p className="mt-2">Location: {barangay}, {municipality}</p>
            <p className="mt-1">Plan: {planLabel}</p>
          </div>

          <div>
            <label className="text-sm font-semibold">Full Name *</label>
            <input name="fullName" required className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-semibold">Mobile Number *</label>
            <input name="mobile" required className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-semibold">Email (optional)</label>
            <input name="email" type="email" className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-semibold">Complete Address *</label>
            <textarea name="addressLine" required className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm" rows={3} />
          </div>
          <div>
            <label className="text-sm font-semibold">Landmark (optional)</label>
            <input name="notes" className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-semibold">Preferred schedule (optional)</label>
            <input name="preferredSchedule" className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm" placeholder="e.g. Weekdays, 1-5 PM" />
          </div>
          <div>
            <label className="text-sm font-semibold">Upload proof of address (optional)</label>
            <input name="attachments" type="file" accept="image/png,image/jpeg,image/webp" multiple className="mt-2 w-full rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm" />
            <p className="mt-2 text-xs text-[color:var(--muted)]">Max 2 images, 3MB each.</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="consent" required />
            <span className="text-xs text-[color:var(--muted)]">
              I agree to INTCONVERGE COMMUNICATION collecting my information to process this request.
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm font-semibold"
            >
              Back
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white"
            >
              Submit Application
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
