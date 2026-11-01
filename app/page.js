import { Suspense } from "react";
import SiteLayout from "@/components/layout/SiteLayout";
import Hero from "@/components/layout/Hero";
import OpportunityCategorySection from "@/components/opportunities/OpportunityCategorySection";

function LoadingSection() {
  return (
    <section className="py-8">
      <p className="text-gray-500">Loading opportunities...</p>
    </section>
  );
}

export default function Home() {
  return (
    <SiteLayout>
      <main>
        <Hero />

        <div className="mx-auto max-w-7xl px-6 py-8">
          <Suspense fallback={<LoadingSection />}>
            <OpportunityCategorySection
              title="Latest Jobs"
              categorySlug="jobs"
              description="Explore recently published job opportunities."
            />
          </Suspense>

          <Suspense fallback={<LoadingSection />}>
            <OpportunityCategorySection
              title="Latest Scholarships"
              categorySlug="scholarships"
              description="Discover scholarships and funding opportunities."
            />
          </Suspense>

          <Suspense fallback={<LoadingSection />}>
            <OpportunityCategorySection
              title="Latest Internships"
              categorySlug="internships"
              description="Find internship opportunities to develop your career."
            />
          </Suspense>
        </div>
      </main>
    </SiteLayout>
  );
}
