"use client";

import { useState } from "react";
import OpportunityEditor from "./OpportunityEditor";

export default function OpportunityForm({ categories, sources }) {
  const [categoryId, setCategoryId] = useState("");
  const [applicationLinks, setApplicationLinks] = useState([
    { label: "", url: "" },
  ]);

  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("draft");
  const [isFeatured, setIsFeatured] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function addApplicationLink() {
    setApplicationLinks((previous) => [...previous, { label: "", url: "" }]);
  }

  function removeApplicationLink(index) {
    setApplicationLinks((previous) => previous.filter((_, i) => i !== index));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData(event.currentTarget);

      const opportunityData = Object.fromEntries(formData.entries());

      opportunityData.category_id = Number(categoryId);
      opportunityData.source_id = Number(opportunityData.source_id);
      opportunityData.description = description;
      opportunityData.application_links = applicationLinks;
      opportunityData.status = status;
      opportunityData.is_featured = isFeatured;

      const response = await fetch("/api/admin/opportunities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(opportunityData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to save opportunity.");
      }

      setSuccess(result.message);
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}
      {/* Basic Information */}
      <section className="space-y-5">
        <div className="border-b border-gray-200 pb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Provide the main details of this opportunity.
          </p>
        </div>

        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Opportunity Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            placeholder="Enter opportunity title"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Category
          </label>

          <select
            id="category"
            name="category_id"
            required
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="organization"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Organization
          </label>

          <input
            id="organization"
            name="organization"
            type="text"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            placeholder="Enter organization name"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Location
          </label>

          <input
            id="location"
            name="location"
            type="text"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            placeholder="e.g. Lagos, Nigeria or Remote"
          />
        </div>
      </section>

      {/* Opportunity Description */}
      <section className="space-y-5">
        <div className="border-b border-gray-200 pb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Opportunity Description
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Provide the full details of the opportunity.
          </p>
        </div>

        <OpportunityEditor value={description} onChange={setDescription} />
      </section>

      {/* Source Information */}
      <section className="space-y-5">
        <div className="border-b border-gray-200 pb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Source Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Record where this opportunity was originally published.
          </p>
        </div>

        <div>
          <label
            htmlFor="source"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Opportunity Source
          </label>

          <select
            id="source"
            name="source_id"
            required
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select a source</option>

            {sources.map((source) => (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="source_url"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Original Source URL
          </label>

          <input
            id="source_url"
            name="source_url"
            type="url"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            placeholder="https://example.com/opportunity"
          />

          <p className="mt-2 text-xs text-gray-500">
            Link to the original article or announcement containing this
            opportunity.
          </p>
        </div>
      </section>

      {/* Application Links */}
      <section className="space-y-5">
        <div className="border-b border-gray-200 pb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Application Links
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add all available application links and preserve their original
            labels.
          </p>
        </div>

        {applicationLinks.map((link, index) => (
          <div
            key={index}
            className="space-y-4 rounded-md border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">
                Application Link {index + 1}
              </h3>

              {applicationLinks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeApplicationLink(index)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Link Label
              </label>

              <input
                type="text"
                required
                value={link.label}
                onChange={(event) =>
                  setApplicationLinks((previous) =>
                    previous.map((item, i) =>
                      i === index
                        ? { ...item, label: event.target.value }
                        : item,
                    ),
                  )
                }
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm"
                placeholder="e.g. Apply for Graduate Trainee Programme"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Application URL
              </label>

              <input
                type="url"
                required
                value={link.url}
                onChange={(event) =>
                  setApplicationLinks((previous) =>
                    previous.map((item, i) =>
                      i === index ? { ...item, url: event.target.value } : item,
                    ),
                  )
                }
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm"
                placeholder="https://example.com/apply"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addApplicationLink}
          className="rounded-md border border-blue-700 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
        >
          + Add Another Application Link
        </button>
      </section>

      {/* Application Deadline */}
      <section className="space-y-5">
        <div className="border-b border-gray-200 pb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Application Deadline
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Specify when applications close.
          </p>
        </div>

        <div>
          <label
            htmlFor="application_deadline"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Deadline
          </label>

          <input
            id="application_deadline"
            name="application_deadline"
            type="datetime-local"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-2 text-xs text-gray-500">
            Leave blank if the opportunity has no specified deadline.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Publishing</h2>

        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Opportunity Status
          </label>

          <select
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm"
          >
            <option value="draft">Save as Draft</option>
            <option value="published">Publish Immediately</option>
          </select>
        </div>
      </section>

      <div className="flex items-start gap-3">
        <input
          id="is_featured"
          type="checkbox"
          checked={isFeatured}
          onChange={(event) => setIsFeatured(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-gray-300"
        />

        <div>
          <label
            htmlFor="is_featured"
            className="text-sm font-medium text-gray-700"
          >
            Feature this opportunity
          </label>

          <p className="mt-1 text-sm text-gray-500">
            Display this opportunity in the homepage featured section.
          </p>
        </div>
      </div>

      <div className="flex justify-end border-t border-gray-200 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Saving..."
            : status === "published"
              ? "Publish Opportunity"
              : "Save as Draft"}
        </button>
      </div>
    </form>
  );
}
