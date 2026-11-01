import Link from "next/link";

export default function OpportunityListItem({ opportunity }) {
  return (
    <article className="border-b border-gray-200 py-5 last:border-b-0">
      {/* Category */}
      <span className="text-xs font-semibold uppercase tracking-wide text-brand">
        {opportunity.category}
      </span>

      {/* Title */}
      <h3 className="mt-2 text-base font-bold leading-snug text-gray-900 hover:text-brand md:text-lg">
        <Link href={`/${opportunity.category_slug}/${opportunity.slug}`}>
          {opportunity.title}
        </Link>
      </h3>

      {/* Details */}
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
        {opportunity.organization && <span>{opportunity.organization}</span>}

        {opportunity.location && <span>{opportunity.location}</span>}

        <span>
          Deadline:{" "}
          {opportunity.deadline
            ? new Date(opportunity.deadline).toLocaleDateString("en-GB")
            : "Not specified"}
        </span>
      </div>
    </article>
  );
}
