import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const SECRET = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "change-me-32chars";
const secretKey = new TextEncoder().encode(SECRET);
const COOKIE_NAME = "golden_admin_token";
const MAX_AGE = 12 * 60 * 60;

export type AdminPayload = { username: string };

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  if (hash.startsWith("$2a$") || hash.startsWith("$2b$")) return bcrypt.compare(plain, hash);
  return plain === hash;
}

export async function signAdminToken(payload: AdminPayload): Promise<string> {
  return new SignJWT({ username: payload.username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secretKey);
}

export async function verifyAdminToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    if (payload.role !== "admin" || typeof payload.username !== "string") return null;
    return { username: payload.username };
  } catch {
    return null;
  }
}

export function getAuthCookieName() {
  return COOKIE_NAME;
}

export function getAuthCookieMaxAge() {
  return MAX_AGE;
}
