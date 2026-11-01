import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminHeader({ admin }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <p className="text-sm font-semibold text-gray-900">Administration</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{admin.name}</p>

          <p className="text-xs capitalize text-gray-500">
            {admin.role.replace("_", " ")}
          </p>
        </div>

        <AdminLogoutButton />
      </div>
    </header>
  );
}
