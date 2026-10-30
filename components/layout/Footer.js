async function getCachedYear() {
  "use cache"; // 2. Tell Next.js to bake this specific return value into the build cache
  return new Date().getFullYear();
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-gray-900">OpportunityHub</h2>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
              Discover jobs, scholarships and internships from Nigeria and
              around the world.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-gray-900">Explore</h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li>
                <a href="/jobs">Jobs</a>
              </li>
              <li>
                <a href="/scholarships">Scholarships</a>
              </li>
              <li>
                <a href="/internships">Internships</a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold text-gray-900">Information</h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          © {getCachedYear()} OpportunityHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
