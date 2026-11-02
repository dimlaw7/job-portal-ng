import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth/admin";
import pool from "@/lib/db";
import { sanitizeDescription } from "@/lib/utils/sanitize-description";

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function PUT(request, { params }) {
  try {
    const admin = await getAdmin();

    if (!admin) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const opportunityId = Number(id);

    if (!Number.isSafeInteger(opportunityId) || opportunityId <= 0) {
      return NextResponse.json(
        { message: "Invalid opportunity ID." },
        { status: 400 },
      );
    }

    let data;

    try {
      data = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON request body." },
        { status: 400 },
      );
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json(
        { message: "Invalid request data." },
        { status: 400 },
      );
    }

    if (
      typeof data.title !== "string" ||
      !data.title.trim() ||
      typeof data.source_url !== "string" ||
      !data.source_url.trim()
    ) {
      return NextResponse.json(
        { message: "A valid title and source URL are required." },
        { status: 400 },
      );
    }

    if (!["draft", "published"].includes(data.status)) {
      return NextResponse.json(
        { message: "Invalid opportunity status." },
        { status: 400 },
      );
    }

    if (
      !Array.isArray(data.application_links) ||
      data.application_links.length === 0
    ) {
      return NextResponse.json(
        { message: "At least one application link is required." },
        { status: 400 },
      );
    }

    for (const link of data.application_links) {
      if (
        !link ||
        typeof link !== "object" ||
        typeof link.label !== "string" ||
        typeof link.url !== "string" ||
        !link.label.trim() ||
        !link.url.trim()
      ) {
        return NextResponse.json(
          {
            message: "Every application link must have a valid label and URL.",
          },
          { status: 400 },
        );
      }

      if (!isValidHttpUrl(link.url)) {
        return NextResponse.json(
          { message: "An application link contains an invalid URL." },
          { status: 400 },
        );
      }

      if (link.label.trim().length > 255 || link.url.trim().length > 1000) {
        return NextResponse.json(
          { message: "An application link exceeds the allowed length." },
          { status: 400 },
        );
      }
    }

    if (
      (data.organization != null && typeof data.organization !== "string") ||
      (data.location != null && typeof data.location !== "string")
    ) {
      return NextResponse.json(
        { message: "Organization and location must be text." },
        { status: 400 },
      );
    }

    if (
      data.title.trim().length > 255 ||
      (data.organization?.length ?? 0) > 255 ||
      (data.location?.length ?? 0) > 255 ||
      data.source_url.trim().length > 1000
    ) {
      return NextResponse.json(
        { message: "One or more fields exceed the allowed length." },
        { status: 400 },
      );
    }

    if (!isValidHttpUrl(data.source_url)) {
      return NextResponse.json(
        { message: "Invalid source URL." },
        { status: 400 },
      );
    }

    if (
      !Number.isInteger(data.category_id) ||
      data.category_id <= 0 ||
      !Number.isInteger(data.source_id) ||
      data.source_id <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid category or source." },
        { status: 400 },
      );
    }

    if (typeof data.is_featured !== "boolean") {
      return NextResponse.json(
        { message: "Invalid featured status." },
        { status: 400 },
      );
    }

    if (data.description != null && typeof data.description !== "string") {
      return NextResponse.json(
        { message: "Opportunity description must be text." },
        { status: 400 },
      );
    }

    const [opportunities] = await pool.query(
      `
    SELECT id, status, published_at, slug
    FROM opportunities
    WHERE id = ?
    LIMIT 1
  `,
      [opportunityId],
    );

    if (opportunities.length === 0) {
      return NextResponse.json(
        { message: "Opportunity not found." },
        { status: 404 },
      );
    }

    const existingOpportunity = opportunities[0];

    const [categories] = await pool.query(
      "SELECT id FROM categories WHERE id = ? LIMIT 1",
      [data.category_id],
    );

    if (categories.length === 0) {
      return NextResponse.json(
        { message: "Selected category does not exist." },
        { status: 400 },
      );
    }

    const [sources] = await pool.query(
      `
    SELECT id
    FROM sources
    WHERE id = ? AND is_active = TRUE
    LIMIT 1
  `,
      [data.source_id],
    );

    if (sources.length === 0) {
      return NextResponse.json(
        { message: "Selected source does not exist or is inactive." },
        { status: 400 },
      );
    }

    if (data.application_deadline) {
      const deadlinePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

      if (!deadlinePattern.test(data.application_deadline)) {
        return NextResponse.json(
          { message: "Invalid application deadline." },
          { status: 400 },
        );
      }

      const deadline = new Date(data.application_deadline);

      if (
        Number.isNaN(deadline.getTime()) ||
        deadline.getFullYear() !==
          Number(data.application_deadline.slice(0, 4)) ||
        deadline.getMonth() + 1 !==
          Number(data.application_deadline.slice(5, 7)) ||
        deadline.getDate() !== Number(data.application_deadline.slice(8, 10))
      ) {
        return NextResponse.json(
          { message: "Invalid application deadline." },
          { status: 400 },
        );
      }
    }

    const sanitizedDescription = sanitizeDescription(
      typeof data.description === "string" ? data.description : "",
    );

    const publishedAt =
      data.status === "published"
        ? existingOpportunity.status === "published"
          ? existingOpportunity.published_at
          : new Date()
        : null;

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      await connection.query(
        `
      UPDATE opportunities
      SET
        category_id = ?,
        source_id = ?,
        title = ?,
        organization = ?,
        description = ?,
        location = ?,
        application_url = ?,
        source_url = ?,
        application_deadline = ?,
        published_at = ?,
        status = ?,
        is_featured = ?
      WHERE id = ?
    `,
        [
          data.category_id,
          data.source_id,
          data.title.trim(),
          data.organization?.trim() || null,
          sanitizedDescription,
          data.location?.trim() || null,
          data.application_links[0].url.trim(),
          data.source_url.trim(),
          data.application_deadline || null,
          publishedAt,
          data.status,
          data.is_featured ? 1 : 0,
          opportunityId,
        ],
      );

      await connection.query(
        "DELETE FROM opportunity_application_links WHERE opportunity_id = ?",
        [opportunityId],
      );

      for (let index = 0; index < data.application_links.length; index++) {
        const link = data.application_links[index];

        await connection.query(
          `
        INSERT INTO opportunity_application_links (
          opportunity_id,
          label,
          url,
          display_order
        )
        VALUES (?, ?, ?, ?)
      `,
          [opportunityId, link.label.trim(), link.url.trim(), index],
        );
      }

      await connection.query(
        `
      INSERT IGNORE INTO opportunity_sources (
        opportunity_id,
        source_id,
        source_url
      )
      VALUES (?, ?, ?)
    `,
        [opportunityId, data.source_id, data.source_url.trim()],
      );

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

    return NextResponse.json(
      {
        message:
          data.status === "published"
            ? "Opportunity updated and published successfully."
            : "Opportunity updated and saved as draft successfully.",
        opportunity: {
          id: opportunityId,
          slug: existingOpportunity.slug,
          status: data.status,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Opportunity update API error:", error);

    return NextResponse.json(
      { message: "Unable to update opportunity." },
      { status: 500 },
    );
  }
}
