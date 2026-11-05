import Link from "next/link";
import { getFeaturedOpportunities } from "@/lib/db/opportunities";
import { connection } from "next/server";

export default async function FeaturedOpportunities() {
  // Wait for an incoming request before accessing the database.
  await connection();

  const opportunities = await getFeaturedOpportunities(6);

  if (opportunities.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-gray-900">
          Featured Opportunities
        </h2>

        <span className="text-xs font-semibold uppercase tracking-wide text-brand">
          Featured
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {opportunities.map((opportunity) => (
          <Link
            key={opportunity.id}
            href={`/${opportunity.category_slug}/${opportunity.slug}`}
            className="w-70 shrink-0 rounded-lg border border-gray-200 bg-white p-4 transition hover:border-brand"
          >
            {opportunity.featured_image && (
              <img
                src={opportunity.featured_image}
                alt={opportunity.title}
                className="mb-3 h-40 w-full object-cover rounded-md"
              />
            )}

            <span className="text-xs font-bold uppercase tracking-wide text-brand">
              {opportunity.category}
            </span>

            <h3 className="mt-3 line-clamp-2 text-base font-bold leading-snug text-gray-900">
              {opportunity.title}
            </h3>

            {opportunity.organization && (
              <p className="mt-2 text-sm text-gray-600">
                {opportunity.organization}
              </p>
            )}

            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>{opportunity.location || "Location not specified"}</span>
              <span>View details →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
