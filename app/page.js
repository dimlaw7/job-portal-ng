import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import CategorySection from "@/components/opportunities/CategorySection";
import LatestOpportunities from "@/components/opportunities/LatestOpportunities";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <CategorySection />
        <LatestOpportunities />
      </main>
    </>
  );
}
