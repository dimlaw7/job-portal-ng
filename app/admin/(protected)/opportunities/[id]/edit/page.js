import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getAdminOpportunityById } from "@/lib/db/opportunities";

import { getOpportunityFormOptions } from "@/lib/db/admin";

import OpportunityForm from "@/components/admin/opportunities/OpportunityForm";

async function EditOpportunityContent({ id }) {
  const [opportunity, formOptions] = await Promise.all([
    getAdminOpportunityById(id),
    getOpportunityFormOptions(),
  ]);

  if (!opportunity) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Opportunity</h1>

        <p className="mt-1 text-sm text-gray-500">
          Update the details of this opportunity.
        </p>
      </div>

      <OpportunityForm
        categories={formOptions.categories}
        sources={formOptions.sources}
        initialData={opportunity}
      />
    </div>
  );
}

async function EditOpportunityPageContent({ params }) {
  const { id } = await params;
  const opportunityId = Number(id);

  if (!Number.isSafeInteger(opportunityId) || opportunityId <= 0) {
    notFound();
  }

  return <EditOpportunityContent id={opportunityId} />;
}

export default function EditOpportunityPage({ params }) {
  return (
    <Suspense fallback={<p className="p-6">Loading opportunity...</p>}>
      <EditOpportunityPageContent params={params} />
    </Suspense>
  );
}
