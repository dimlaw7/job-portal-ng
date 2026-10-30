import { notFound } from "next/navigation";
import { Suspense } from "react";

import pool from "@/lib/db";
import { getOpportunitiesByCategory } from "@/lib/db/opportunities";
import OpportunityCard from "@/components/opportunities/OpportunityCard";

async function CategoryContent({ category, page }) {
  const [categories] = await pool.query(
    "SELECT name, description FROM categories WHERE slug = ?",
    [category],
  );

  if (categories.length === 0) {
    notFound();
  }

  const { opportunities, totalPages, currentPage } =
    await getOpportunitiesByCategory(category, page);

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900">{categories[0].name}</h1>

      <p className="mt-2 text-gray-600">
        {categories[0].description ||
          `Explore the latest ${categories[0].name.toLowerCase()} opportunities.`}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          {currentPage > 1 && (
            <a
              href={`/${category}?page=${currentPage - 1}`}
              className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Previous
            </a>
          )}

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages && (
            <a
              href={`/${category}?page=${currentPage + 1}`}
              className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Next
            </a>
          )}
        </div>
      )}

      {opportunities.length === 0 && (
        <p className="mt-8 text-gray-500">
          No opportunities available in this category yet.
        </p>
      )}
    </main>
  );
}

async function CategoryPageContent({ params, searchParams }) {
  const { category } = await params;
  const { page } = await searchParams;

  const parsedPage = Number(page);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return <CategoryContent category={category} page={currentPage} />;
}

export default function CategoryPage({ params, searchParams }) {
  return (
    <Suspense fallback={<p className="p-10">Loading opportunities...</p>}>
      <CategoryPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
