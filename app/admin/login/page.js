import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">OpportunityHub</h1>

          <p className="mt-2 text-sm text-gray-500">Administrator Login</p>
        </div>

        <AdminLoginForm />
      </div>
    </main>
  );
}
