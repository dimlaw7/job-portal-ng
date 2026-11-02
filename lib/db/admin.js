import pool from "@/lib/db";

export async function getOpportunityFormOptions() {
  const [categories] = await pool.query(
    `
      SELECT id, name, slug
      FROM categories
      ORDER BY name ASC
    `,
  );

  const [sources] = await pool.query(
    `
      SELECT id, name, website_url
      FROM sources
      WHERE is_active = TRUE
      ORDER BY name ASC
    `,
  );

  return {
    categories,
    sources,
  };
}

export async function getAdminCategories() {
  const [categories] = await pool.query(
    `
      SELECT id, name, slug
      FROM categories
      ORDER BY name ASC
    `,
  );

  return categories;
}
