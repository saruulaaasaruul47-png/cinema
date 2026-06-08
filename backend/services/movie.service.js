const {
  createMovie,
  findMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../repositories/movie.repository");

function createError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

const newMovie = async (data) => {
  const { title, description, duration, release_date, director } = data;
  const existing = await findMovie(title, director);
  if (existing) throw createError("Movie already exist", 409);

  return createMovie(title, description, duration, release_date, director);
};

const getMovies = async () => getAllMovies();

const getMovieByIdService = async (id) => {
  const movie = await getMovieById(id);
  if (!movie) throw createError("Movie not found", 404);
  return movie;
};

const updateMovieService = async (id, data) => {
  const movie = await getMovieById(id);
  if (!movie) throw createError("Movie not found", 404);

  return updateMovie(
    id,
    data.title,
    data.description,
    data.duration,
    data.release_date,
    data.director
  );
};

const deleteMovieService = async (id) => deleteMovie(id);

module.exports = {
  newMovie,
  getMovies,
  getMovieByIdService,
  updateMovieService,
  deleteMovieService,
};
