import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-gray-900"
        >
          Opportunity<span className="text-brand">Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-brand"
          >
            Home
          </Link>

          <Link
            href="/jobs"
            className="text-sm font-medium text-gray-700 hover:text-brand"
          >
            Jobs
          </Link>

          <Link
            href="/scholarships"
            className="text-sm font-medium text-gray-700 hover:text-brand"
          >
            Scholarships
          </Link>

          <Link
            href="/internships"
            className="text-sm font-medium text-gray-700 hover:text-brand"
          >
            Internships
          </Link>
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Search Button */}
          <button
            type="button"
            aria-label="Search opportunities"
            className="text-gray-700 hover:text-brand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.34-4.34m0 0a7.5 7.5 0 1 0-10.61 0 7.5 7.5 0 0 0 10.61 0Z"
              />
            </svg>
          </button>

          {/* Menu Button */}
          <button
            type="button"
            aria-label="Open navigation menu"
            className="text-gray-700 hover:text-brand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
