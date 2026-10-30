export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="text-2xl font-bold text-gray-900">
          OpportunityHub
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="/" className="text-sm text-gray-600 hover:text-black">
            Home
          </a>

          <a href="/jobs" className="text-sm text-gray-600 hover:text-black">
            Jobs
          </a>

          <a
            href="/scholarships"
            className="text-sm text-gray-600 hover:text-black"
          >
            Scholarships
          </a>

          <a
            href="/internships"
            className="text-sm text-gray-600 hover:text-black"
          >
            Internships
          </a>
        </nav>
      </div>
    </header>
  );
}
