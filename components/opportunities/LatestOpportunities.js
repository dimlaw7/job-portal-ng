import OpportunityCard from "./OpportunityCard";

const opportunities = [
  {
    id: 1,
    category: "Jobs",
    title: "Graduate Trainee Programme",
    organization: "Example Technologies",
    description:
      "An opportunity for recent graduates to develop professional skills and gain practical industry experience.",
    location: "Lagos, Nigeria",
    deadline: "November 30, 2026",
    href: "/jobs/graduate-trainee",
  },
  {
    id: 2,
    category: "Scholarships",
    title: "International Masters Scholarship",
    organization: "Example University",
    description:
      "A postgraduate scholarship opportunity for eligible international students pursuing a master's degree.",
    location: "United Kingdom",
    deadline: "December 15, 2026",
    href: "/scholarships/international-masters",
  },
  {
    id: 3,
    category: "Internships",
    title: "Software Engineering Internship",
    organization: "Example Innovations",
    description:
      "An internship opportunity for aspiring software engineers looking to gain practical development experience.",
    location: "Remote",
    deadline: "December 10, 2026",
    href: "/internships/software-engineering",
  },
];

export default function LatestOpportunities() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Latest Opportunities
          </h2>

          <p className="mt-2 text-gray-500">
            Explore recently discovered opportunities.
          </p>
        </div>

        <a
          href="/opportunities"
          className="hidden text-sm font-semibold text-blue-600 hover:text-blue-800 sm:block"
        >
          View all →
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>
    </section>
  );
}
