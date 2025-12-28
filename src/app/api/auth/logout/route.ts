import { NextResponse } from "next/server";
import { clearSessionCookie } from "~/lib/auth";

// POST - Logout
export async function POST() {
  try {
    const cookie = clearSessionCookie();

    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    });

    response.cookies.set(cookie);

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, error: "Logout failed" },
      { status: 500 }
    );
  }
}
