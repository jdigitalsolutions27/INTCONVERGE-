export function normalizeFeatures(features: string | null | undefined): string[] {
  if (!features) return [];
  try {
    const parsed = JSON.parse(features);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }
    return [];
  } catch {
    return features
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }
}

export function idealForSpeed(speedMbps: number) {
  if (speedMbps <= 50) return "Ideal for 2-4 devices";
  if (speedMbps <= 100) return "Ideal for families + streaming";
  if (speedMbps <= 150) return "Ideal for WFH + heavy streaming";
  return "Ideal for SMEs + multi-user Wi-Fi";
}

