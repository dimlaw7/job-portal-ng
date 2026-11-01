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
    <section className="mb-6 rounded-lg border border-gray-200 bg-white px-4 py-5 md:px-5">
      <div className="mb-4 flex items-end justify-between border-b-2 border-gray-100 pb-3">
        <div>
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-brand">
            Latest Opportunities
          </span>
          <h2 className="text-xl font-extrabold text-gray-900 md:text-2xl">
            {title}
          </h2>

          <p className="mt-1 text-xs text-gray-500 md:text-sm">{description}</p>
        </div>

        <Link
          href={`/${categorySlug}`}
          className="shrink-0 text-xs font-bold text-brand hover:underline md:text-sm"
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
