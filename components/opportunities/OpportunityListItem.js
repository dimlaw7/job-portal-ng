import Link from "next/link";

export default function OpportunityListItem({ opportunity }) {
  return (
    <article className="border-b border-gray-200 py-5 last:border-b-0">
      <h3 className="text-base font-semibold text-blue-700 hover:text-blue-900">
        <Link href={`/${opportunity.category_slug}/${opportunity.slug}`}>
          {opportunity.title}
        </Link>
      </h3>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
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
