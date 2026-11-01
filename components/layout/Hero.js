import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gray-100 px-4 py-5 md:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Promotional Banner */}
        <div className="relative flex min-h-45 items-center overflow-hidden rounded-xl bg-brand px-6 py-8 text-white md:min-h-65 md:px-12">
          <div className="relative z-10 max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              OpportunityHub
            </span>

            <h1 className="mt-3 text-2xl font-bold leading-tight md:text-4xl">
              Find Opportunities
              <br />
              That Move You Forward
            </h1>

            <p className="mt-3 text-sm text-white/90 md:text-base">
              Discover jobs, scholarships and internships in Nigeria and around
              the world.
            </p>

            <Link
              href="/jobs"
              className="mt-5 inline-block rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-brand! hover:bg-gray-100"
            >
              Explore Opportunities
            </Link>
          </div>
        </div>

        {/* Search */}
        <form action="/search" method="GET" className="mt-5 flex gap-2">
          <input
            type="search"
            name="q"
            placeholder="Search jobs, scholarships, internships..."
            required
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
          />

          <button
            type="submit"
            className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-hover"
          >
            Search
          </button>
        </form>

        {/* Category Shortcuts */}
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          <Link
            href="/jobs"
            className="shrink-0 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:border-brand hover:text-brand"
          >
            Jobs
          </Link>

          <Link
            href="/scholarships"
            className="shrink-0 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:border-brand hover:text-brand"
          >
            Scholarships
          </Link>

          <Link
            href="/internships"
            className="shrink-0 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:border-brand hover:text-brand"
          >
            Internships
          </Link>
        </div>
      </div>
    </section>
  );
}
