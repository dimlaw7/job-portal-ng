import pool from "@/lib/db";

export async function getLatestOpportunities() {
  const [opportunities] = await pool.query(`
    SELECT
      o.id,
      o.title,
      o.slug,
      o.organization,
      o.description,
      o.location,
      o.application_deadline AS deadline,
      c.name AS category,
      c.slug AS category_slug
    FROM opportunities o
    JOIN categories c ON o.category_id = c.id
    WHERE o.status = 'published'
    ORDER BY o.published_at DESC
    LIMIT 6
  `);

  return opportunities;
}

export async function getOpportunitiesByCategory(categorySlug) {
  const [opportunities] = await pool.query(
    `
      SELECT
        o.id,
        o.title,
        o.slug,
        o.organization,
        o.description,
        o.location,
        o.application_url,
        o.application_deadline AS deadline,
        c.name AS category,
        c.slug AS category_slug
      FROM opportunities o
      JOIN categories c ON o.category_id = c.id
      WHERE c.slug = ?
      AND o.status = 'published'
      ORDER BY o.published_at DESC
    `,
    [categorySlug],
  );

  return opportunities;
}

export async function getOpportunityBySlug(categorySlug, opportunitySlug) {
  const [opportunities] = await pool.query(
    `
      SELECT
        o.id,
        o.title,
        o.slug,
        o.organization,
        o.description,
        o.location,
        o.application_url,
        o.source_url,
        o.application_deadline,
        o.status,
        c.name AS category,
        c.slug AS category_slug,
        s.name AS source_name
      FROM opportunities o
      JOIN categories c ON o.category_id = c.id
      JOIN sources s ON o.source_id = s.id
      WHERE c.slug = ?
      AND o.slug = ?
      AND o.status IN ('published', 'expired')
      LIMIT 1
    `,
    [categorySlug, opportunitySlug],
  );

  return opportunities[0] || null;
}
