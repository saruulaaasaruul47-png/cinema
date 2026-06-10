const express = require("express");
const {
  listGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genre.controller");

const genreRouter = express.Router();

genreRouter.get("/", listGenres);
genreRouter.post("/", createGenre);
genreRouter.put("/:id", updateGenre);
genreRouter.delete("/:id", deleteGenre);

module.exports = genreRouter;
