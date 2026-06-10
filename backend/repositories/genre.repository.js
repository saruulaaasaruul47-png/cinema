const pool = require("../config/db");

const getAllGenres = async () => {
  const [rows] = await pool.execute(
    `SELECT g.id, g.name, COUNT(DISTINCT mg.movie_id) AS movie_count
     FROM genres g
     LEFT JOIN movie_genres mg ON mg.genre_id = g.id
     LEFT JOIN movies m ON m.id = mg.movie_id AND m.deleted_at IS NULL
     WHERE g.deleted_at IS NULL
     GROUP BY g.id, g.name
     ORDER BY g.name ASC`
  );
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM genres WHERE id = ? AND deleted_at IS NULL",
    [id]
  );
  return rows[0];
};

const createGenre = async (name) => {
  const [result] = await pool.execute(
    "INSERT INTO genres (name) VALUES (?)",
    [name]
  );
  return result.insertId;
};

const updateGenre = async (id, name) => {
  await pool.execute(
    "UPDATE genres SET name = ? WHERE id = ? AND deleted_at IS NULL",
    [name, id]
  );
};

const softDeleteGenre = async (id) => {
  await pool.execute(
    "UPDATE genres SET deleted_at = NOW() WHERE id = ?",
    [id]
  );
};

module.exports = {
  getAllGenres,
  findById,
  createGenre,
  updateGenre,
  softDeleteGenre,
};
