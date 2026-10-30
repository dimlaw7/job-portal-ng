import { Suspense } from "react";
import { searchOpportunities } from "@/lib/db/opportunities";
import OpportunityCard from "@/components/opportunities/OpportunityCard";

async function SearchResults({ searchParams }) {
  const { q } = await searchParams;
  const searchTerm = q?.trim() || "";

  if (!searchTerm) {
    return (
      <p className="mt-8 text-gray-500">
        Enter a search term to find opportunities.
      </p>
    );
  }

  const opportunities = await searchOpportunities(searchTerm);

  return (
    <>
      <p className="mt-3 text-gray-600">
        {opportunities.length} results for "{searchTerm}"
      </p>

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
