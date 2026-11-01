import SiteLayout from "@/components/layout/SiteLayout";
import Hero from "@/components/layout/Hero";
import OpportunityCategorySection from "@/components/opportunities/OpportunityCategorySection";

export default function Home() {
  return (
    <SiteLayout>
      <main>
        <Hero />

        <div className="mx-auto max-w-7xl px-6 py-8">
          <OpportunityCategorySection
            title="Latest Jobs"
            categorySlug="jobs"
            description="Explore recently published job opportunities."
          />

          <OpportunityCategorySection
            title="Latest Scholarships"
            categorySlug="scholarships"
            description="Discover scholarships and funding opportunities."
          />

          <OpportunityCategorySection
            title="Latest Internships"
            categorySlug="internships"
            description="Find internship opportunities to develop your career."
          />
        </div>
      </main>
    </SiteLayout>
  );
}
