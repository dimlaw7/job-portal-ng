import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Jobs",
    description:
      "Discover employment opportunities from organizations in Nigeria and around the world.",
    href: "/jobs",
  },
  {
    title: "Scholarships",
    description:
      "Find scholarships and funding opportunities for your academic journey.",
    href: "/scholarships",
  },
  {
    title: "Internships",
    description:
      "Explore internship opportunities to gain experience and develop your career.",
    href: "/internships",
  },
];

export default function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">
          Explore Opportunities
        </h2>

        <p className="mt-2 text-gray-500">
          Find opportunities that match your ambitions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}
      </div>
    </section>
  );
}
