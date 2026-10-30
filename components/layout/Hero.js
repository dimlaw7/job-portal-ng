export default function Hero() {
  return (
    <section className="bg-gray-50 px-6 py-24 text-center">
      <div className="mx-auto max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Your next opportunity starts here
        </span>

        <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
          Discover Opportunities
          <span className="block text-blue-600">That Move You Forward</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
          Explore jobs, scholarships and internships from Nigeria and around the
          world.
        </p>

        <div className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search opportunities..."
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-5 py-4 outline-none focus:border-blue-500"
          />

          <button className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
