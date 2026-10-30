export default function CategoryCard({ title, description, href }) {
  return (
    <a
      href={href}
      className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:border-blue-500 hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-gray-500">
        {description}
      </p>

      <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
        Explore opportunities →
      </span>
    </a>
  );
}
