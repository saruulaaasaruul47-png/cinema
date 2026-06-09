const asyncHandler = require("express-async-handler");
const { 
    newMovie, 
    getMovies, 
    getMovieByIdService, 
    updateMovieService, 
    deleteMovieService 
} = require("../services/movie.service");

const addMovie = asyncHandler(async (req, res, next) => {
    const movie = await newMovie(req.body);
    return res.json({
        status: 200,
        message: "Movie added successfully",
        movie
    })
})

const seeAllMovies = asyncHandler(async (req, res, next) => {
    const movies = await getMovies();
    return res.json({
        status: 200,
        message: "Movies fetched successfully",
        movies: movies
    })
})

const seeMovieById = asyncHandler(async (req, res, next) => {
    const movie = await getMovieByIdService(req.params.id);
    return res.json({
        status: 200,
        message: "Movie fetched successfully",
        movie
    })
})

const updateMovieController = asyncHandler(async (req, res, next) => {
    const movie = await updateMovieService(req.params.id, req.body);
    return res.json({
        status: 200,
        message: "Movie updated successfully",
        movie
    })
})

const deleteMovieController = asyncHandler(async (req, res, next) => {
    const movie = await deleteMovieService(req.params.id);
    return res.json({
        status: 200,
        message: "Movie deleted successfully",
        movie
    })
})

module.exports = {
    addMovie,
    seeAllMovies,
    seeMovieById,
    updateMovieController,
    deleteMovieController
};
