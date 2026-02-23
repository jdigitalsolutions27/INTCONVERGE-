import { Container } from "@/components/container";

export const metadata = {
  title: "Troubleshooting",
  description: "Basic troubleshooting and speed tips for INTCONVERGE COMMUNICATION subscribers.",
};

export default function TroubleshootingPage() {
  return (
    <Container>
      <section className="py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-3)]">Troubleshooting</p>
        <h1 className="mt-3 text-4xl font-semibold">Quick fixes before contacting support</h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold">Basic steps</p>
            <ol className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
              <li>1. Restart your router and modem (power off for 30 seconds).</li>
              <li>2. Check if the fiber cable is firmly connected.</li>
              <li>3. Move closer to the router for better Wi-Fi signal.</li>
              <li>4. Disconnect unused devices to reduce congestion.</li>
            </ol>
          </div>
          <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold">Speed tips</p>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
              <li>- Place the router in a central, elevated spot.</li>
              <li>- Use 5GHz Wi-Fi for faster speeds near the router.</li>
              <li>- Update your device software regularly.</li>
              <li>- For wired stability, use a LAN cable for work devices.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold">Speed test checklist</p>
            <ol className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
              <li>1. Disconnect unused devices temporarily.</li>
              <li>2. Stand within 3-5 meters of the router.</li>
              <li>3. Run the test on a single device.</li>
              <li>4. Send the screenshot to support.</li>
            </ol>
          </div>
        </div>
      </section>
    </Container>
  );
}

