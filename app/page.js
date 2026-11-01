import { Suspense } from "react";
import Link from "next/link";

import SiteLayout from "@/components/layout/SiteLayout";
import Hero from "@/components/layout/Hero";
import OpportunityCategorySection from "@/components/opportunities/OpportunityCategorySection";
import FeaturedOpportunities from "@/components/opportunities/FeaturedOpportunities";

function LoadingSection() {
  return (
    <section className="py-8">
      <p className="text-gray-500">Loading opportunities...</p>
    </section>
  );
}

function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Browse Categories */}
      <section className="rounded-lg border border-gray-200 bg-white">
        <h2 className="border-b border-gray-200 px-4 py-3 text-lg font-bold">
          Browse Categories
        </h2>

        <div className="divide-y divide-gray-100">
          <Link
            href="/jobs"
            className="block px-4 py-3 text-sm text-gray-700 hover:text-brand"
          >
            Jobs and Recruitment
          </Link>

          <Link
            href="/scholarships"
            className="block px-4 py-3 text-sm text-gray-700 hover:text-brand"
          >
            Scholarships
          </Link>

          <Link
            href="/internships"
            className="block px-4 py-3 text-sm text-gray-700 hover:text-brand"
          >
            Internships
          </Link>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="rounded-lg bg-gray-100 p-5">
        <h2 className="text-lg font-bold text-gray-900">
          Your Next Opportunity Awaits
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Explore opportunities that can help you advance your education and
          career.
        </p>

        <Link
          href="/jobs"
          className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
        >
          Explore opportunities →
        </Link>
      </section>
    </aside>
  );
}

export default function Home() {
  return (
    <SiteLayout>
      <main>
        <Hero />

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          {/* Main Content */}
          <div>
            <Suspense fallback={<LoadingSection />}>
              <FeaturedOpportunities />
            </Suspense>

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

          {/* Sidebar */}
          <Sidebar />
        </div>
      </main>
    </SiteLayout>
  );
}
