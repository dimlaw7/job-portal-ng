import pool from "@/lib/db";
import { createHash, timingSafeEqual } from "crypto";

export async function POST(request) {
  try {
    // Authenticate the collector
    const authorization = request.headers.get("authorization");
    const expectedKey = process.env.COLLECTOR_API_KEY;

    if (!expectedKey || !authorization?.startsWith("Bearer ")) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const providedKey = authorization.slice(7);

    const providedBuffer = Buffer.from(providedKey);
    const expectedBuffer = Buffer.from(expectedKey);

    if (
      providedBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(providedBuffer, expectedBuffer)
    ) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // Read and validate submitted data
    const body = await request.json();

    const { source_id, title, source_url, content, published_at, external_id } =
      body;

    if (
      !Number.isInteger(source_id) ||
      source_id <= 0 ||
      typeof title !== "string" ||
      !title.trim() ||
      typeof source_url !== "string" ||
      !source_url.trim()
    ) {
      return Response.json(
        { success: false, message: "Invalid opportunity data" },
        { status: 400 },
      );
    }

    const contentHash = createHash("sha256")
      .update(content || "")
      .digest("hex");

    // Store the discovered item
    const [result] = await pool.query(
      `
        INSERT IGNORE INTO collected_items (
          source_id,
          external_id,
          title,
          source_url,
          content,
          published_at,
          content_hash
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        source_id,
        external_id || null,
        title.trim(),
        source_url.trim(),
        content || null,
        published_at || null,
        contentHash,
      ],
    );

    return Response.json({
      success: true,
      message: result.affectedRows
        ? "Opportunity collected successfully"
        : "Opportunity already collected",
      inserted: result.affectedRows === 1,
    });
  } catch (error) {
    console.error("Collection API error:", error);

    return Response.json(
      { success: false, message: "Failed to collect opportunity" },
      { status: 500 },
    );
  }
}
