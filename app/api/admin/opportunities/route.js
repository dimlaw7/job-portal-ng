import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth/admin";
import pool from "@/lib/db";
import { generateSlug } from "@/lib/utils/slug";

export async function POST(request) {
  try {
    const admin = await getAdmin();

    if (!admin) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const data = await request.json();

    const requiredFields = ["title", "category_id", "source_id", "source_url"];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { message: `${field} is required.` },
          { status: 400 },
        );
      }
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
      if (!link.label?.trim() || !link.url?.trim()) {
        return NextResponse.json(
          { message: "Every application link must have a label and URL." },
          { status: 400 },
        );
      }

      if (!isValidHttpUrl(link.url)) {
        return NextResponse.json(
          { message: "An application link contains an invalid URL." },
          { status: 400 },
        );
      }
    }

    function isValidHttpUrl(value) {
      try {
        const url = new URL(value);

        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
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

    if (!isValidHttpUrl(data.source_url)) {
      return NextResponse.json(
        { message: "Invalid source URL." },
        { status: 400 },
      );
    }

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
      `SELECT id FROM sources
   WHERE id = ? AND is_active = TRUE
   LIMIT 1`,
      [data.source_id],
    );

    if (sources.length === 0) {
      return NextResponse.json(
        { message: "Selected source does not exist or is inactive." },
        { status: 400 },
      );
    }

    const baseSlug = generateSlug(data.title);

    if (!baseSlug) {
      return NextResponse.json(
        { message: "Unable to generate a slug from this title." },
        { status: 400 },
      );
    }

    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const [existing] = await pool.query(
        "SELECT id FROM opportunities WHERE slug = ? LIMIT 1",
        [slug],
      );

      if (existing.length === 0) {
        break;
      }

      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    console.log("Received opportunity:", data);

    return NextResponse.json({
      message: "Opportunity received.",
    });
  } catch (error) {
    console.error("Opportunity API error:", error);

    return NextResponse.json(
      { message: "Unable to process opportunity." },
      { status: 500 },
    );
  }
}
