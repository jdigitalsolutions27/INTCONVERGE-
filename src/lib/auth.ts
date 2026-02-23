import crypto from "crypto";
import { cookies } from "next/headers";

const cookieName = "ev_admin";

function getSecret() {
  return process.env.AUTH_SECRET || "";
}

function sign(value: string) {
  const secret = getSecret();
  if (!secret) {
    return "";
  }
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(value);
  return hmac.digest("hex");
}

export function createAdminSession(payload: { id: string; email: string; name: string }) {
  const secret = getSecret();
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  const exp = Date.now() + 1000 * 60 * 60 * 12;
  const tokenPayload = JSON.stringify({ ...payload, exp });
  const signature = sign(tokenPayload);
  const token = Buffer.from(tokenPayload).toString("base64") + "." + signature;
  return token;
}

export function setAdminCookie(token: string) {
  cookies().set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function clearAdminCookie() {
  cookies().set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function getAdminSession() {
  const secret = getSecret();
  if (!secret) return null;
  const token = cookies().get(cookieName)?.value;
  if (!token) return null;

  const [payloadEncoded, signature] = token.split(".");
  if (!payloadEncoded || !signature) return null;
  const payload = Buffer.from(payloadEncoded, "base64").toString("utf8");
  if (sign(payload) !== signature) return null;

  const parsed = JSON.parse(payload) as { exp?: number };
  if (!parsed.exp || Date.now() > parsed.exp) return null;
  return parsed;
}

export function requireAdmin() {
  const session = getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

