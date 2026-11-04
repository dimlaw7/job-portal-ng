"use client";

import { useState } from "react";
import DeleteOpportunityButton from "./DeleteOpportunityButton";

export default function OpportunityBulkActions({ opportunities }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const allSelected =
    opportunities.length > 0 && selectedIds.length === opportunities.length;

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(opportunities.map((opportunity) => opportunity.id));
    }
  }

  function toggleSelection(id, checked) {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center gap-3 border-b border-gray-200 p-4">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={toggleSelectAll}
        />

        <span className="text-sm font-semibold text-gray-700">Select all</span>

        <span className="ml-auto text-sm text-gray-500">
          {selectedIds.length} of {opportunities.length} selected
        </span>
      </div>

      <div className="divide-y divide-gray-200">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="flex items-center gap-4 p-5">
            <input
              type="checkbox"
              checked={selectedIds.includes(opportunity.id)}
              onChange={(e) =>
                toggleSelection(opportunity.id, e.target.checked)
              }
            />

            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-gray-900">
                {opportunity.title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {opportunity.category}
                {opportunity.organization && ` · ${opportunity.organization}`}
              </p>

              {opportunity.application_deadline && (
                <p className="mt-1 text-xs text-gray-500">
                  Deadline:{" "}
                  {new Date(
                    opportunity.application_deadline,
                  ).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${
                opportunity.status === "published"
                  ? "bg-green-100 text-green-700"
                  : opportunity.status === "draft"
                    ? "bg-yellow-100 text-yellow-700"
                    : opportunity.status === "expired"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
              }`}
            >
              {opportunity.status}
            </span>

            <a
              href={`/admin/opportunities/${opportunity.id}/edit`}
              className="text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              Edit
            </a>

            <DeleteOpportunityButton opportunityId={opportunity.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
