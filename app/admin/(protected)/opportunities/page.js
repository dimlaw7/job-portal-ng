import { Suspense } from "react";
import { getAdminOpportunities } from "@/lib/db/opportunities";

async function OpportunitiesContent() {
  const opportunities = await getAdminOpportunities();

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      {opportunities.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-sm text-gray-500">
            No opportunities have been added yet.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="font-semibold text-gray-900">
                  {opportunity.title}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {opportunity.category}
                  {opportunity.organization && ` · ${opportunity.organization}`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                  {opportunity.status}
                </span>

                <a
                  href={`/admin/opportunities/${opportunity.id}/edit`}
                  className="text-sm font-semibold text-blue-700 hover:text-blue-900"
                >
                  Edit
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OpportunitiesPage() {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Opportunities</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all published and unpublished opportunities.
          </p>
        </div>

        <a
          href="/admin/opportunities/new"
          className="inline-flex w-fit items-center justify-center rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          + Create Opportunity
        </a>
      </div>

      <Suspense
        fallback={
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-sm text-gray-500">Loading opportunities...</p>
          </div>
        }
      >
        <OpportunitiesContent />
      </Suspense>
    </div>
  );
}
