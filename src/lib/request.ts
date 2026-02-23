import { headers } from "next/headers";

export function getRequestIp() {
  const headerList = headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return headerList.get("x-real-ip") || "unknown";
}

