import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth/admin";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

async function AdminDashboard() {
  const admin = await getAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

          <p className="mt-2 text-gray-600">Welcome, {admin.name}.</p>

          <p className="mt-1 text-sm text-gray-500">Role: {admin.role}</p>
        </div>

        <AdminLogoutButton />
      </div>
    </main>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading dashboard...</p>}>
      <AdminDashboard />
    </Suspense>
  );
}
