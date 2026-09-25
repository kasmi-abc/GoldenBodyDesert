import { NextResponse } from "next/server";
import { signAdminToken, verifyPassword, getAuthCookieName, getAuthCookieMaxAge } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { z } from "zod";

const schema = z.object({ username: z.string().min(3).max(32), password: z.string().min(3).max(128) });

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = rateLimit(`login:${ip}`, 5, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "Too many attempts" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  const { username, password } = parsed.data;

  let hash: string | null = null;
  let dbUser: string | null = null;

  const admin = await prisma.adminUser.findUnique({ where: { username } });
  if (admin) {
    hash = admin.passwordHash;
    dbUser = admin.username;
  } else if (username === process.env.ADMIN_USER && process.env.ADMIN_PASS_HASH) {
    hash = process.env.ADMIN_PASS_HASH;
    dbUser = process.env.ADMIN_USER;
  }

  if (!hash || !dbUser) return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });

  const ok = await verifyPassword(password, hash);
  if (!ok) return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });

  const token = await signAdminToken({ username: dbUser });
  const res = NextResponse.json({ success: true, username: dbUser });
  const forwardedProto = req.headers.get("x-forwarded-proto");
  res.cookies.set(getAuthCookieName(), token, {
    httpOnly: true,
    secure: forwardedProto ? forwardedProto === "https" : new URL(req.url).protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: getAuthCookieMaxAge(),
  });
  return res;
}
