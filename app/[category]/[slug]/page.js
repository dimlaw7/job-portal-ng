import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getOpportunityBySlug } from "@/lib/db/opportunities";
import SiteLayout from "@/components/layout/SiteLayout";

async function OpportunityContent({ category, slug }) {
  const opportunity = await getOpportunityBySlug(category, slug);

  if (!opportunity) {
    notFound();
  }

  const expired =
    opportunity.status === "expired" ||
    (opportunity.application_deadline &&
      new Date(opportunity.application_deadline) < new Date());

  const closingSoon =
    !expired &&
    opportunity.application_deadline &&
    new Date(opportunity.application_deadline).getTime() - Date.now() <=
      7 * 24 * 60 * 60 * 1000;

  return (
    <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block rounded bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
            {opportunity.category}
          </span>

          <span
            className={`inline-block rounded px-3 py-1 text-xs font-bold uppercase tracking-wide ${
              expired
                ? "bg-gray-100 text-gray-600"
                : closingSoon
                  ? "bg-orange-50 text-orange-700"
                  : "bg-green-50 text-green-700"
            }`}
          >
            {expired ? "Expired" : closingSoon ? "Closing Soon" : "Open"}
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-extrabold leading-tight text-gray-900 md:text-4xl">
          {opportunity.title}
        </h1>

        {opportunity.featured_image && (
          <img
            src={opportunity.featured_image}
            alt={opportunity.title}
            className="mt-6 max-h-105 w-full rounded-lg object-cover"
          />
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
          {opportunity.organization && <span>{opportunity.organization}</span>}

          {opportunity.location && <span>{opportunity.location}</span>}

          {opportunity.published_at && (
            <span>
              Published:{" "}
              {new Date(opportunity.published_at).toLocaleDateString("en-GB")}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
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

        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h2 className="text-lg font-bold text-gray-900">How to Apply</h2>

          {expired ? (
            <p className="mt-3 rounded-md bg-red-50 p-4 text-sm font-medium text-red-700">
              This opportunity has expired. Applications are no longer
              available.
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm text-gray-600">
                Interested applicants can select the appropriate application
                link below.
              </p>

              <div className="mt-4 flex flex-col items-start gap-3">
                {opportunity.application_links.length > 0 ? (
                  opportunity.application_links.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-md bg-brand px-5 py-3 text-sm font-bold text-white! hover:bg-brand-hover"
                    >
                      {link.label} →
                    </a>
                  ))
                ) : (
                  <a
                    href={opportunity.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-md bg-brand px-5 py-3 text-sm font-bold text-white! hover:bg-brand-hover"
                  >
                    Apply Now →
                  </a>
                )}
              </div>
            </>
          )}
        </div>

        <div className="mt-8 border-t border-gray-200 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Original Source
          </p>

          <a
            href={opportunity.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-semibold text-brand hover:underline"
          >
            {opportunity.source_name || "View original source"} →
          </a>
        </div>
      </div>
      <aside className="space-y-6">
        <section className="rounded-lg border border-gray-200 bg-white">
          <h2 className="border-b border-gray-200 px-4 py-3 font-bold text-gray-900">
            Opportunity Information
          </h2>

          <div className="space-y-4 p-4 text-sm">
            <div>
              <p className="text-gray-500">Category</p>
              <p className="mt-1 font-semibold text-gray-900">
                {opportunity.category}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Organization</p>
              <p className="mt-1 font-semibold text-gray-900">
                {opportunity.organization || "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Location</p>
              <p className="mt-1 font-semibold text-gray-900">
                {opportunity.location || "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Application Deadline</p>
              <p className="mt-1 font-semibold text-gray-900">
                {opportunity.application_deadline
                  ? new Date(
                      opportunity.application_deadline,
                    ).toLocaleDateString("en-GB")
                  : "Not specified"}
              </p>
            </div>
          </div>
        </section>
      </aside>
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
