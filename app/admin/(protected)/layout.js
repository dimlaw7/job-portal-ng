import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth/admin";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

async function AdminLayoutContent({ children }) {
  const admin = await getAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader admin={admin} />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <Suspense fallback={<p className="p-6">Loading administration...</p>}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}
