const pool = require("../config/db");

const createMovie = async (title, description, duration, poster_url, release_date, director) => {
  const [result] = await pool.execute(
    "INSERT INTO movies (title, description, duration, poster_url, release_date, director) VALUES (?, ?, ?, ?, ?, ?)",
    [title, description, duration, poster_url, release_date, director]
  );
  return result;
};

const findMovie = async (title, director) => {
  const [rows] = await pool.execute(
    "SELECT title, director FROM movies WHERE title = ? AND director = ?",
    [title, director]
  );
  return rows[0];
};

const getAllMovies = async () => {
  const [rows] = await pool.execute("SELECT * FROM movies WHERE deleted_at IS NULL");
  return rows;
};

const getMovieById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM movies WHERE id = ? AND deleted_at IS NULL",
    [id]
  );
  return rows[0];
};

const findActiveMovies = async () => {
  const [rows] = await pool.execute(
    `SELECT id, title, duration, release_date, poster_url
     FROM movies
     WHERE deleted_at IS NULL
     ORDER BY title ASC`
  );
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT id, title, duration, release_date, poster_url
     FROM movies
     WHERE id = ? AND deleted_at IS NULL
     LIMIT 1`,
    [id]
  );
  return rows[0] || null;
};

const updateMovie = async (id, title, description, duration, poster_url, release_date, director) => {
  const [result] = await pool.execute(
    "UPDATE movies SET title = ?, description = ?, duration = ?, poster_url = ?, release_date = ?, director = ? WHERE id = ?",
    [title, description, duration, poster_url, release_date, director, id]
  );
  return result;
};

const deleteMovie = async (id) => {
  const [result] = await pool.execute("DELETE FROM movies WHERE id = ?", [id]);
  return result;
};

module.exports = {
  createMovie,
  findMovie,
  getAllMovies,
  getMovieById,
  findActiveMovies,
  findById,
  updateMovie,
  deleteMovie,
};
