import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.set("ev_admin", "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}

