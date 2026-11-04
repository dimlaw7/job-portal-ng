import { Suspense } from "react";
import { getAdminOpportunities } from "@/lib/db/opportunities";
import DeleteOpportunityButton from "@/components/admin/opportunities/DeleteOpportunityButton";
import { getAdminCategories } from "@/lib/db/admin";
import OpportunityBulkActions from "@/components/admin/opportunities/OpportunityBulkActions";

async function OpportunitiesContent({ searchParams }) {
  const params = await searchParams;

  const search = params.search || "";
  const category = params.category || "";
  const status = params.status || "";
  const requestedPage = Number.parseInt(params?.page, 10) || 1;
  const page = Math.max(1, requestedPage);

  const [{ opportunities, total, currentPage, totalPages }, categories] =
    await Promise.all([
      getAdminOpportunities({
        search,
        category,
        status,
        page,
        limit: 10,
      }),
      getAdminCategories(),
    ]);

  return (
    <>
      <form
        method="GET"
        className="mb-5 flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center"
      >
        <input
          type="search"
          name="search"
          defaultValue={search}
          placeholder="Search opportunities..."
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        />

        <select
          name="category"
          defaultValue={category}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="">All categories</option>

          {categories.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          name="status"
          defaultValue={status}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="expired">Expired</option>
          <option value="rejected">Rejected</option>
        </select>

        <button
          type="submit"
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          Apply filters
        </button>

        <a
          href="/admin/opportunities"
          className="text-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Clear
        </a>
      </form>

      <p className="mt-1 text-sm text-gray-500">
        {total} {total === 1 ? "opportunity" : "opportunities"} found
      </p>

      {opportunities.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <p className="text-sm text-gray-500">
            {search || category || status
              ? "No opportunities match your filters."
              : "No opportunities have been added yet."}
          </p>
        </div>
      ) : (
        <OpportunityBulkActions opportunities={opportunities} />
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
          <a
            href={`?${new URLSearchParams({
              search,
              category,
              status,
              page: String(currentPage - 1),
            })}`}
            className={`rounded-md border px-4 py-2 text-sm ${
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-50"
            }`}
            aria-disabled={currentPage === 1}
          >
            Previous
          </a>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <a
            href={`?${new URLSearchParams({
              search,
              category,
              status,
              page: String(currentPage + 1),
            })}`}
            className={`rounded-md border px-4 py-2 text-sm ${
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-50"
            }`}
            aria-disabled={currentPage === totalPages}
          >
            Next
          </a>
        </div>
      )}
    </>
  );
}

export default function OpportunitiesPage({ searchParams }) {
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
        <OpportunitiesContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
