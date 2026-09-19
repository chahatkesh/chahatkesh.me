import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Auth constants
// ---------------------------------------------------------------------------

const COOKIE_NAME = "admin_session" as const;
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days
const SESSION_EXPIRY = "30d" as const;
const SLIDE_AFTER_SECONDS = 60 * 60 * 24; // re-issue after 1 day of use

export type SessionPayload = {
  userId: string;
  iat?: number;
  exp?: number;
};

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

export async function verifySession(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const verified = await jwtVerify(token, getJwtSecret());
    const { userId, iat, exp } = verified.payload;
    if (typeof userId !== "string") return null;
    return { userId, iat, exp };
  } catch {
    return null;
  }
}

/**
 * Re-issues the session cookie when the current JWT is older than one day.
 * Restarts the 30-day idle clock. Route Handlers only — Server Components
 * cannot set cookies here.
 */
async function maybeRefreshSession(session: SessionPayload) {
  const now = Math.floor(Date.now() / 1000);
  if (
    typeof session.iat === "number" &&
    now - session.iat < SLIDE_AFTER_SECONDS
  ) {
    return;
  }

  const token = await createSession(session.userId);
  const cookieStore = await cookies();
  cookieStore.set(setSessionCookie(token));
}

export async function getSession(options: { refresh?: boolean } = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  const session = await verifySession(token);
  if (!session) return null;

  if (options.refresh) {
    await maybeRefreshSession(session);
  }

  return session;
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
  | { authenticated: true; session: SessionPayload }
  | { authenticated: false; response: NextResponse }
> {
  const session = await getSession({ refresh: true });
  if (!session) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { success: false, error: "Unauthorized", code: "UNAUTHENTICATED" },
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
