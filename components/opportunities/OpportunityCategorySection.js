import Link from "next/link";
import { getLatestOpportunitiesByCategory } from "@/lib/db/opportunities";
import OpportunityListItem from "./OpportunityListItem";

export default async function OpportunityCategorySection({
  title,
  categorySlug,
  description,
}) {
  const opportunities = await getLatestOpportunitiesByCategory(categorySlug, 5);

  return (
    <section className="border-b border-gray-200 py-8">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>

        <Link
          href={`/${categorySlug}`}
          className="text-sm font-semibold text-blue-700 hover:text-blue-900"
        >
          View all →
        </Link>
      </div>

      {opportunities.length > 0 ? (
        <div>
          {opportunities.map((opportunity) => (
            <OpportunityListItem
              key={opportunity.id}
              opportunity={opportunity}
            />
          ))}
        </div>
      ) : (
        <p className="py-6 text-sm text-gray-500">
          No {title.toLowerCase()} available at the moment.
        </p>
      )}
    </section>
  );
}
