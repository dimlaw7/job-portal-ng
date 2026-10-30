import pool from "@/lib/db";

export async function GET() {
  try {
    const [categories] = await pool.query(
      "SELECT id, name, slug, description FROM categories ORDER BY name ASC",
    );

    return Response.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch categories",
      },
      { status: 500 },
    );
  }
}
