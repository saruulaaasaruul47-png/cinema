const pool = require("../config/db");

const sortableColumns = {
  title: "m.title",
  start_time: "st.start_time",
  end_time: "st.end_time",
  duration: "m.duration",
  release_date: "m.release_date",
  hall_name: "h.hall_name",
};

function buildFilters(filters = {}) {
  const where = [
    "st.deleted_at IS NULL",
    "m.deleted_at IS NULL",
    "h.deleted_at IS NULL",
  ];
  const values = [];

  if (filters.search) {
    where.push("m.title LIKE ?");
    values.push(`%${filters.search}%`);
  }

  if (filters.genre) {
    where.push("g.name = ?");
    values.push(filters.genre);
  }

  if (filters.date) {
    where.push("DATE(st.start_time) = ?");
    values.push(filters.date);
  }

  if (filters.movie_id) {
    where.push("st.movie_id = ?");
    values.push(filters.movie_id);
  }

  if (filters.hall_id) {
    where.push("st.hall_id = ?");
    values.push(filters.hall_id);
  }

  return {
    clause: `WHERE ${where.join(" AND ")}`,
    values,
  };
}

function baseJoinSql(includeGenreFilter = false) {
  return `
    FROM show_times st
    JOIN movies m ON st.movie_id = m.id
    JOIN cinema_halls h ON st.hall_id = h.id
    LEFT JOIN (
      SELECT
        mg.movie_id,
        GROUP_CONCAT(DISTINCT g.name ORDER BY g.name SEPARATOR ', ') AS genres
      FROM movie_genres mg
      JOIN genres g ON mg.genre_id = g.id
      WHERE g.deleted_at IS NULL
      GROUP BY mg.movie_id
    ) genre_list ON genre_list.movie_id = m.id
    ${includeGenreFilter ? `
    JOIN movie_genres mg_filter ON m.id = mg_filter.movie_id
    JOIN genres g ON mg_filter.genre_id = g.id AND g.deleted_at IS NULL
    ` : ""}
  `;
}

const findAll = async (filters, pagination) => {
  const { clause, values } = buildFilters(filters);
  const sortColumn = sortableColumns[filters.sort] || "st.start_time";
  const sortOrder = String(filters.order || "asc").toLowerCase() === "desc" ? "DESC" : "ASC";

  const [rows] = await pool.query(
    `SELECT
        st.id,
        st.movie_id,
        m.title AS movie_title,
        m.description AS movie_description,
        m.duration,
        m.release_date,
        m.poster_url,
        st.hall_id,
        h.hall_name,
        h.seat_count,
        st.start_time,
        st.end_time,
        genre_list.genres
     ${baseJoinSql(Boolean(filters.genre))}
     ${clause}
     ORDER BY ${sortColumn} ${sortOrder}
     LIMIT ? OFFSET ?`,
    [...values, pagination.size, pagination.offset]
  );

  const [countRows] = await pool.query(
    `SELECT COUNT(DISTINCT st.id) AS total
     ${baseJoinSql(Boolean(filters.genre))}
     ${clause}`,
    values
  );

  return {
    rows,
    total: countRows[0]?.total || 0,
  };
};

const findById = async (id) => {
  const [rows] = await pool.query(
    `SELECT
        st.id,
        st.movie_id,
        m.title AS movie_title,
        m.description AS movie_description,
        m.duration,
        m.release_date,
        m.poster_url,
        st.hall_id,
        h.hall_name,
        h.seat_count,
        st.start_time,
        st.end_time,
        genre_list.genres
     ${baseJoinSql()}
     WHERE st.id = ?
       AND st.deleted_at IS NULL
       AND m.deleted_at IS NULL
       AND h.deleted_at IS NULL
     LIMIT 1`,
    [id]
  );

  return rows[0] || null;
};

const create = async (showTime) => {
  const [result] = await pool.query(
    `INSERT INTO show_times (movie_id, hall_id, start_time, end_time, created_at, updated_at)
     VALUES (?, ?, ?, ?, NOW(), NOW())`,
    [showTime.movie_id, showTime.hall_id, showTime.start_time, showTime.end_time]
  );

  return findById(result.insertId);
};

const update = async (id, showTime) => {
  await pool.query(
    `UPDATE show_times
     SET movie_id = ?, hall_id = ?, start_time = ?, end_time = ?, updated_at = NOW()
     WHERE id = ? AND deleted_at IS NULL`,
    [showTime.movie_id, showTime.hall_id, showTime.start_time, showTime.end_time, id]
  );

  return findById(id);
};

const softDelete = async (id) => {
  const [result] = await pool.query(
    `UPDATE show_times
     SET deleted_at = NOW(), updated_at = NOW()
     WHERE id = ? AND deleted_at IS NULL`,
    [id]
  );

  return result.affectedRows > 0;
};

const hasHallTimeConflict = async (hallId, startTime, endTime, ignoredShowTimeId = null) => {
  const values = [hallId, endTime, startTime];
  let ignoreClause = "";

  if (ignoredShowTimeId) {
    ignoreClause = "AND id != ?";
    values.push(ignoredShowTimeId);
  }

  const [rows] = await pool.query(
    `SELECT id
     FROM show_times
     WHERE hall_id = ?
       AND deleted_at IS NULL
       AND start_time < ?
       AND end_time > ?
       ${ignoreClause}
     LIMIT 1`,
    values
  );

  return Boolean(rows[0]);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  softDelete,
  hasHallTimeConflict,
};
