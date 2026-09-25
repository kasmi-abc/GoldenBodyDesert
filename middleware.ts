import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "golden_admin_token";
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "change-me-32chars"
);

async function isValidAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      const res = NextResponse.next();
      res.headers.set("X-Robots-Tag", "noindex, nofollow");
      res.headers.set("Cache-Control", "no-store");
      return res;
    }

    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await isValidAdminToken(token))) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      const redirect = NextResponse.redirect(url);
      redirect.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
      redirect.headers.set("Cache-Control", "no-store");
      return redirect;
    }

    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
