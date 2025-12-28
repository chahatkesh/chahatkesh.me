import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "~/lib/mongodb";
import Admin from "~/models/admin";
import { createSession, setSessionCookie } from "~/lib/auth";

// POST - Login
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Find admin user
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session token
    const token = await createSession(admin._id.toString());
    const cookie = setSessionCookie(token);

    // Set cookie and return success
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set(cookie);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
