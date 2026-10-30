import SiteLayout from "@/components/layout/SiteLayout";
import Hero from "@/components/layout/Hero";
import CategorySection from "@/components/opportunities/CategorySection";
import LatestOpportunities from "@/components/opportunities/LatestOpportunities";
import { Suspense } from "react";

export default function Home() {
  return (
    <SiteLayout>
      <main>
        <Hero />
        <CategorySection />

        <Suspense
          fallback={
            <section className="mx-auto max-w-7xl px-6 py-16">
              <p className="text-gray-500">Loading latest opportunities...</p>
            </section>
          }
        >
          <LatestOpportunities />
        </Suspense>
      </main>
    </SiteLayout>
  );
}
