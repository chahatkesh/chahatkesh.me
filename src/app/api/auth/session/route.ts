import { NextResponse } from "next/server";
import { getSession } from "~/lib/auth";

// GET - Check session status
export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 500 }
    );
  }
}
