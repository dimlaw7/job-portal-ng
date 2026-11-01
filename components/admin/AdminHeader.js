"use client";

import { useState } from "react";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminHeader({ admin }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="relative flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="text-xl">☰</span>
          </button>

          <p className="text-sm font-semibold text-gray-900">Administration</p>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{admin.name}</p>

            <p className="hidden text-xs capitalize text-gray-500 sm:block">
              {admin.role.replace("_", " ")}
            </p>
          </div>

          <AdminLogoutButton />
        </div>
      </header>

      {menuOpen && (
        <div className="absolute inset-x-0 top-16 z-50 border-b border-gray-200 bg-white shadow-lg md:hidden">
          <AdminSidebar />
        </div>
      )}
    </>
  );
}
