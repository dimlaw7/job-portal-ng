import { notFound } from "next/navigation";
import { Suspense } from "react";

import pool from "@/lib/db";
import { getOpportunitiesByCategory } from "@/lib/db/opportunities";
import OpportunityCard from "@/components/opportunities/OpportunityCard";

async function CategoryContent({ category }) {
  const [categories] = await pool.query(
    "SELECT name, description FROM categories WHERE slug = ?",
    [category],
  );

  if (categories.length === 0) {
    notFound();
  }

  const opportunities = await getOpportunitiesByCategory(category);

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

      {opportunities.length === 0 && (
        <p className="mt-8 text-gray-500">
          No opportunities available in this category yet.
        </p>
      )}
    </main>
  );
}

async function CategoryPageContent({ params }) {
  const { category } = await params;

  return <CategoryContent category={category} />;
}

export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<p className="p-10">Loading opportunities...</p>}>
      <CategoryPageContent params={params} />
    </Suspense>
  );
}
