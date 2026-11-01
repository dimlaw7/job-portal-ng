import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth/session";
import pool from "@/lib/db";

export async function getAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) {
    return null;
  }

  const session = await verifySession(token);

  if (!session?.adminId) {
    return null;
  }

  const [admins] = await pool.query(
    `SELECT id, name, email, role, is_active
     FROM admin_users
     WHERE id = ?
     LIMIT 1`,
    [session.adminId],
  );

  const admin = admins[0];

  if (!admin || !admin.is_active) {
    return null;
  }

  return admin;
}
