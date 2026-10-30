import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getOpportunityBySlug } from "@/lib/db/opportunities";
import SiteLayout from "@/components/layout/SiteLayout";

async function OpportunityContent({ category, slug }) {
  const opportunity = await getOpportunityBySlug(category, slug);

  if (!opportunity) {
    notFound();
  }

  const expired = opportunity.status === "expired";

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <span className="text-sm font-semibold text-blue-600">
        {opportunity.category}
      </span>

      <h1 className="mt-3 text-3xl font-bold text-gray-900">
        {opportunity.title}
      </h1>

      <p className="mt-3 text-gray-600">{opportunity.organization}</p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
        <span>{opportunity.location || "Location not specified"}</span>

        <span>
          Deadline:{" "}
          {opportunity.application_deadline
            ? new Date(opportunity.application_deadline).toLocaleDateString(
                "en-GB",
              )
            : "Not specified"}
        </span>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900">
          About this opportunity
        </h2>

        <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-700">
          {opportunity.description}
        </p>
      </div>

      <div className="mt-10">
        {expired ? (
          <p className="rounded-lg bg-red-50 p-4 text-red-700">
            This opportunity has expired. Applications are no longer available.
          </p>
        ) : (
          <a
            href={opportunity.application_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Apply Now
          </a>
        )}
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Source:{" "}
        <a
          href={opportunity.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {opportunity.source_name}
        </a>
      </p>
    </main>
  );
}

async function OpportunityPageContent({ params }) {
  const { category, slug } = await params;

  return <OpportunityContent category={category} slug={slug} />;
}

export default function OpportunityPage({ params }) {
  return (
    <SiteLayout>
      <Suspense fallback={<p className="p-10">Loading opportunity...</p>}>
        <OpportunityPageContent params={params} />
      </Suspense>
    </SiteLayout>
  );
}
