import { Suspense } from "react";
import { getOpportunityFormOptions } from "@/lib/db/admin";
import OpportunityForm from "@/components/admin/opportunities/OpportunityForm";

async function NewOpportunityContent() {
  const { categories, sources } = await getOpportunityFormOptions();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Opportunity</h1>

        <p className="mt-1 text-sm text-gray-500">
          Add a new job, scholarship or internship opportunity.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <OpportunityForm categories={categories} sources={sources} />

        <p className="mb-2 text-sm text-gray-600">
          Categories: {categories.length}
        </p>

        <p className="text-sm text-gray-600">
          Active sources: {sources.length}
        </p>
      </div>
    </div>
  );
}

export default function NewOpportunityPage() {
  return (
    <Suspense fallback={<p>Loading form options...</p>}>
      <NewOpportunityContent />
    </Suspense>
  );
}
