export default function OpportunityCard({ opportunity }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            {opportunity.category}
          </span>

          <h3 className="mt-2 text-lg font-semibold text-gray-900">
            {opportunity.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {opportunity.organization}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          Open
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-gray-600">
        {opportunity.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
        <span>{opportunity.location}</span>

        <span>
          Deadline:{" "}
          {opportunity.deadline
            ? new Date(opportunity.deadline).toLocaleDateString("en-GB")
            : "Not specified"}
        </span>
      </div>

      <div className="mt-6 border-t border-gray-100 pt-4">
        <a
          href={opportunity.href}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          View opportunity →
        </a>
      </div>
    </article>
  );
}
