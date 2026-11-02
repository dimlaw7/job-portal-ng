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

export async function getOpportunitiesByCategory(categorySlug, page = 1) {
  const limit = 12;
  const offset = (page - 1) * limit;

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
      LIMIT ? OFFSET ?
    `,
    [categorySlug, limit, offset],
  );

  const [[result]] = await pool.query(
    `
      SELECT COUNT(*) AS total
      FROM opportunities o
      JOIN categories c ON o.category_id = c.id
      WHERE c.slug = ?
      AND o.status = 'published'
    `,
    [categorySlug],
  );

  return {
    opportunities,
    totalPages: Math.ceil(result.total / limit),
    currentPage: page,
  };
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
        o.featured_image,
        o.application_deadline,
        o.status,
        o.published_at,
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

  const [applicationLinks] = await pool.query(
    `
    SELECT
      id,
      label,
      url,
      display_order
    FROM opportunity_application_links
    WHERE opportunity_id = ?
    ORDER BY display_order ASC, id ASC
  `,
    [opportunities[0]?.id],
  );

  if (!opportunities[0]) {
    return null;
  }

  return {
    ...opportunities[0],
    application_links: applicationLinks,
  };
}

export async function searchOpportunities(searchTerm, categorySlug = "") {
  const searchPattern = `%${searchTerm}%`;

  let query = `
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
  AND (
    o.title LIKE ?
    OR o.organization LIKE ?
    OR o.description LIKE ?
    OR o.location LIKE ?
  )
`;

  const params = [searchPattern, searchPattern, searchPattern, searchPattern];

  if (categorySlug) {
    query += " AND c.slug = ?";
    params.push(categorySlug);
  }

  query += " ORDER BY o.published_at DESC LIMIT 20";

  const [opportunities] = await pool.query(query, params);

  return opportunities;
}

export async function getLatestOpportunitiesByCategory(
  categorySlug,
  limit = 5,
) {
  const [opportunities] = await pool.query(
    `SELECT
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
    WHERE c.slug = ? AND o.status = 'published'
    ORDER BY o.published_at DESC
    LIMIT ?`,
    [categorySlug, limit],
  );

  return opportunities;
}

export async function getFeaturedOpportunities(limit = 6) {
  const [opportunities] = await pool.query(
    `SELECT
      o.id,
      o.title,
      o.slug,
      o.organization,
      o.location,
      o.featured_image,
      o.application_deadline AS deadline,
      c.name AS category,
      c.slug AS category_slug
    FROM opportunities o
    JOIN categories c ON o.category_id = c.id
    WHERE o.status = 'published'
      AND o.is_featured = TRUE
    ORDER BY o.published_at DESC
    LIMIT ?`,
    [limit],
  );

  return opportunities;
}

export async function getAdminOpportunities({
  search = "",
  category = "",
  status = "",
  page = 1,
  limit = 10,
} = {}) {
  let query = `
    FROM opportunities o
    JOIN categories c ON o.category_id = c.id
    WHERE 1 = 1
  `;

  const values = [];

  if (search.trim()) {
    query += `
      AND (
        o.title LIKE ?
        OR o.organization LIKE ?
      )
    `;

    const searchTerm = `%${search.trim()}%`;

    values.push(searchTerm, searchTerm);
  }

  if (category) {
    query += " AND c.slug = ?";
    values.push(category);
  }

  if (status) {
    query += " AND o.status = ?";
    values.push(status);
  }

  const [countResult] = await pool.query(
    `SELECT COUNT(*) AS total ${query}`,
    values,
  );

  const total = Number(countResult[0].total);

  const safePage =
    Number.isSafeInteger(Number(page)) && Number(page) > 0 ? Number(page) : 1;

  const safeLimit =
    Number.isSafeInteger(Number(limit)) && Number(limit) > 0
      ? Number(limit)
      : 10;

  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const currentPage = Math.min(safePage, totalPages);
  const offset = (currentPage - 1) * safeLimit;

  const [opportunities] = await pool.query(
    `
      SELECT
        o.id,
        o.title,
        o.slug,
        o.organization,
        o.status,
        o.application_deadline,
        o.published_at,
        o.created_at,
        c.name AS category,
        c.slug AS category_slug
      ${query}
      ORDER BY o.created_at DESC
      LIMIT ? OFFSET ?
    `,
    [...values, safeLimit, offset],
  );

  return {
    opportunities,
    total,
    currentPage,
    totalPages,
  };
}

export async function getAdminOpportunityById(id) {
  const [opportunities] = await pool.query(
    `
      SELECT
        id,
        category_id,
        source_id,
        title,
        slug,
        organization,
        description,
        location,
        application_url,
        source_url,
        application_deadline,
        status,
        is_featured,
        featured_image
      FROM opportunities
      WHERE id = ?
      LIMIT 1
    `,
    [id],
  );

  if (opportunities.length === 0) {
    return null;
  }

  const opportunity = opportunities[0];

  const [applicationLinks] = await pool.query(
    `
      SELECT
        id,
        label,
        url,
        display_order
      FROM opportunity_application_links
      WHERE opportunity_id = ?
      ORDER BY display_order ASC, id ASC
    `,
    [id],
  );

  return {
    ...opportunity,
    application_links: applicationLinks,
  };
}
