const asyncHandler = require("express-async-handler");
const genreRepository = require("../repositories/genre.repository");

const getGenres = asyncHandler(async () => genreRepository.getAllGenres());

const addGenre = asyncHandler(async (data) => {
  const name = String(data.name || "").trim();
  if (!name) {
    const err = new Error("Genre name is required");
    err.statusCode = 400;
    throw err;
  }
  const id = await genreRepository.createGenre(name);
  return genreRepository.findById(id);
});

const updateGenreService = asyncHandler(async (id, data) => {
  const existing = await genreRepository.findById(id);
  if (!existing) {
    const err = new Error("Genre not found");
    err.statusCode = 404;
    throw err;
  }
  const name = String(data.name || "").trim();
  if (!name) {
    const err = new Error("Genre name is required");
    err.statusCode = 400;
    throw err;
  }
  await genreRepository.updateGenre(id, name);
  return genreRepository.findById(id);
});

const deleteGenreService = asyncHandler(async (id) => {
  const existing = await genreRepository.findById(id);
  if (!existing) {
    const err = new Error("Genre not found");
    err.statusCode = 404;
    throw err;
  }
  await genreRepository.softDeleteGenre(id);
  return existing;
});

module.exports = {
  getGenres,
  addGenre,
  updateGenreService,
  deleteGenreService,
};
