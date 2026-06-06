const express = require('express');
const { 
    addMovie,
    seeAllMovies,
    seeMovieById,
    updateMovieController,
    deleteMovieController
} = require("../controllers/movie.controller");
const movieRouter = express.Router();

movieRouter.post("/newmovie", addMovie);
movieRouter.get("/movielist", seeAllMovies);
movieRouter.get("/:id", seeMovieById);
movieRouter.put("/:id", updateMovieController);
movieRouter.delete("/:id", deleteMovieController);




module.exports = movieRouter;