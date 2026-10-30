import pool from "@/lib/db";

export async function GET() {
  try {
    const [opportunities] = await pool.query(`
      SELECT
        o.id,
        o.title,
        o.slug,
        o.organization,
        o.description,
        o.location,
        o.application_url,
        o.application_deadline,
        o.published_at,
        c.name AS category,
        c.slug AS category_slug,
        s.name AS source
      FROM opportunities o
      JOIN categories c ON o.category_id = c.id
      JOIN sources s ON o.source_id = s.id
      WHERE o.status = 'published'
      ORDER BY o.published_at DESC
      LIMIT 20
    `);

    return Response.json({
      success: true,
      data: opportunities,
    });
  } catch (error) {
    console.error("Error fetching opportunities:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch opportunities",
      },
      { status: 500 },
    );
  }
}
