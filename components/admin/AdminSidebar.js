"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
  },
  {
    name: "Opportunities",
    href: "/admin/opportunities",
  },
  {
    name: "Categories",
    href: "/admin/categories",
  },
  {
    name: "Sources",
    href: "/admin/sources",
  },
  {
    name: "Featured",
    href: "/admin/featured",
  },
  {
    name: "Settings",
    href: "/admin/settings",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-5">
        <Link href="/admin">
          <h1 className="text-xl font-bold text-gray-900">OpportunityHub</h1>
        </Link>

        <p className="mt-1 text-xs text-gray-500">Administration</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block rounded-md px-3 py-2.5 text-sm font-medium transition ${
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(`${item.href}/`))
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-200 px-6 py-4">
        <p className="text-xs text-gray-500">OpportunityHub Admin</p>
      </div>
    </aside>
  );
}
