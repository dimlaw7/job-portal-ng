import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 },
      );
    }

    const [admins] = await pool.query(
      `SELECT id, name, email, password_hash, role, is_active
       FROM admin_users
       WHERE email = ?
       LIMIT 1`,
      [email.trim().toLowerCase()],
    );

    const admin = admins[0];

    if (!admin || !admin.is_active) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }

    const passwordIsValid = await verifyPassword(password, admin.password_hash);

    if (!passwordIsValid) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }

    const token = await createSession(admin);

    const response = NextResponse.json({
      message: "Login successful.",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { message: "Unable to process login." },
      { status: 500 },
    );
  }
}
