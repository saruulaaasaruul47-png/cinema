const db = require("../config/db");

async function findActiveMovies() {
  const [rows] = await db.query(
    `SELECT id, title, duration, release_date, poster_url
     FROM movies
     WHERE deleted_at IS NULL
     ORDER BY title ASC`
  );

  return rows;
}

async function findById(id) {
  const [rows] = await db.query(
    `SELECT id, title, duration, release_date, poster_url
     FROM movies
     WHERE id = ? AND deleted_at IS NULL
     LIMIT 1`,
    [id]
  );

  return rows[0] || null;
}

module.exports = {
  findActiveMovies,
  findById,
};
