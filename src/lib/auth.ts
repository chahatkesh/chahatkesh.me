import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Auth constants
// ---------------------------------------------------------------------------

const COOKIE_NAME = "admin_session" as const;
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours
const SESSION_EXPIRY = "24h" as const;

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_SECRET environment variable is required. " +
        "Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_EXPIRY)
    .sign(getJwtSecret());

  return token;
}

export async function verifySession(token: string) {
  try {
    const verified = await jwtVerify(token, getJwtSecret());
    return verified.payload as { userId: string };
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  return await verifySession(token);
}

export function setSessionCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  };
}

// ---------------------------------------------------------------------------
// Auth guard — use in protected API routes
// ---------------------------------------------------------------------------

/**
 * Verifies the admin session from cookies.
 * Returns the session payload or a 401 NextResponse.
 */
export async function requireAuth(): Promise<
  | { authenticated: true; session: { userId: string } }
  | { authenticated: false; response: NextResponse }
> {
  const session = await getSession();
  if (!session) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      ),
    };
  }
  return { authenticated: true, session };
}

export function clearSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 0,
    path: "/",
  };
}
