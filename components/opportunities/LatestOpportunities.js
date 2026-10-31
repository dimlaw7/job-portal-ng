import { getLatestOpportunities } from "@/lib/db/opportunities";
import OpportunityCard from "./OpportunityCard";

export default async function LatestOpportunities() {
  const opportunities = await getLatestOpportunities();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Latest Opportunities
        </h2>
        <p className="mt-2 text-gray-600">
          Explore the latest jobs, scholarships and internships.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>

      {opportunities.length === 0 && (
        <p className="text-gray-500">
          No opportunities available at the moment.
        </p>
      )}
    </section>
  );
}
