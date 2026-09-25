import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const schema = z.object({ phone: z.string().regex(/^(0)(5|6|7)\d{8}$/, "رقم غير صالح") });

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`otp:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { phone } = parsed.data;
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  if (process.env.NODE_ENV !== "production") {
    console.log(`[OTP] ${phone} -> ${code}`);
    return NextResponse.json({ ok: true, expiresIn: 300, debugCode: code });
  }

  return NextResponse.json({ ok: true, expiresIn: 300 });
}
