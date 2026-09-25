import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, getAuthCookieName } from "@/lib/auth";

export async function GET() {
  const token = (await cookies()).get(getAuthCookieName())?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = await verifyAdminToken(token);
  if (!payload) return NextResponse.json({ error: "Invalid" }, { status: 401 });
  return NextResponse.json({ username: payload.username });
}
