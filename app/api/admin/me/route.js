import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth/admin";

export async function GET() {
  const admin = await getAdmin();

  if (!admin) {
    return NextResponse.json(
      { message: "Not authenticated." },
      { status: 401 },
    );
  }

  return NextResponse.json({
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
}
