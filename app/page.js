import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import CategorySection from "@/components/opportunities/CategorySection";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <CategorySection />
      </main>
    </>
  );
}
