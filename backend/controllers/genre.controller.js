const asyncHandler = require("express-async-handler");
const {
  getGenres,
  addGenre,
  updateGenreService,
  deleteGenreService,
} = require("../services/genre.service");
const { apiResponse } = require("../utils/pagination");

const listGenres = asyncHandler(async (req, res) => {
  const genres = await getGenres();
  return apiResponse(res, 200, "Genres fetched successfully", genres);
});

const createGenre = asyncHandler(async (req, res) => {
  const genre = await addGenre(req.body);
  return apiResponse(res, 201, "Genre created successfully", genre);
});

const updateGenre = asyncHandler(async (req, res) => {
  const genre = await updateGenreService(req.params.id, req.body);
  return apiResponse(res, 200, "Genre updated successfully", genre);
});

const deleteGenre = asyncHandler(async (req, res) => {
  await deleteGenreService(req.params.id);
  return apiResponse(res, 200, "Genre deleted successfully", { id: Number(req.params.id) });
});

module.exports = {
  listGenres,
  createGenre,
  updateGenre,
  deleteGenre,
};
