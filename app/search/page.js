import { Suspense } from "react";
import { searchOpportunities } from "@/lib/db/opportunities";
import OpportunityCard from "@/components/opportunities/OpportunityCard";

async function SearchResults({ searchParams }) {
  const { q, category } = await searchParams;
  const searchTerm = q?.trim() || "";

  if (!searchTerm) {
    return (
      <p className="mt-8 text-gray-500">
        Enter a search term to find opportunities.
      </p>
    );
  }

  const opportunities = await searchOpportunities(searchTerm, category || "");

  return (
    <>
      <p className="mt-3 text-gray-600">
        {opportunities.length} results for "{searchTerm}"
      </p>

      <form
        action="/search"
        method="GET"
        className="mt-6 flex items-center gap-3"
      >
        <input type="hidden" name="q" value={searchTerm} />

        <select
          name="category"
          defaultValue={category || ""}
          className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
        >
          <option value="">All opportunities</option>
          <option value="jobs">Jobs</option>
          <option value="scholarships">Scholarships</option>
          <option value="internships">Internships</option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Filter
        </button>
      </form>

      {opportunities.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-gray-500">
          No opportunities found. Try a different search term.
        </p>
      )}
    </>
  );
}

export default function SearchPage({ searchParams }) {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900">Search Opportunities</h1>

      <Suspense fallback={<p className="mt-8 text-gray-500">Searching...</p>}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
