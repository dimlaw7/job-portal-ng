"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteOpportunityButton({ opportunityId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this opportunity? This action cannot be undone.",
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const response = await fetch(
        `/api/admin/opportunities/${opportunityId}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to delete opportunity.");
      }

      router.refresh();
    } catch (error) {
      window.alert(error.message || "Something went wrong.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-sm font-semibold text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
