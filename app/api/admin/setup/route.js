import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";

export async function POST(request) {
  try {
    const [admins] = await pool.query("SELECT id FROM admin_users LIMIT 1");

    if (admins.length > 0) {
      return NextResponse.json(
        { message: "Admin setup has already been completed." },
        { status: 403 },
      );
    }

    const { name, email, password, setupKey } = await request.json();

    if (setupKey !== process.env.ADMIN_SETUP_KEY) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    const passwordHash = await hashPassword(password);

    await pool.query(
      `INSERT INTO admin_users (name, email, password_hash, role)
       VALUES (?, ?, ?, 'super_admin')`,
      [name.trim(), email.trim().toLowerCase(), passwordHash],
    );

    return NextResponse.json(
      { message: "Super administrator created successfully." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Admin setup error:", error);

    return NextResponse.json(
      { message: "Unable to create administrator." },
      { status: 500 },
    );
  }
}
