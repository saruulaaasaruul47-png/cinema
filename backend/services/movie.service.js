const { 
    createMovie, 
    findMovie, 
    getAllMovies, 
    getMovieById, 
    updateMovie, 
    deleteMovie 
} = require("../repository/movie.repository");


const Movie = require("../models/movieModels");
const asyncHandler = require("express-async-handler");

const newMovie = asyncHandler(async (data) => {
    const movie = new Movie(data.title, data.description, data.duration, data.release_date, data.director);
    const check = await findMovie(movie.title, movie.director);
    if(check){
        throw new TypeError("Movie already exist");
    }
    const addMovie = await createMovie(movie.title, movie.description, movie.duration, movie.release_date, movie.director)
    return addMovie;

})

const getMovies = asyncHandler(async () => {
    const movies = await getAllMovies();
    return movies;
})

const getMovieByIdService = asyncHandler(
    async (id) => {
        const movie = await getMovieById(id);
        return movie;
    }
)

const updateMovieService = asyncHandler(
    async (id, data) => {
        const movie = await getMovieById(id);
        const update = await updateMovie(id, data.title, data.description, data.duration, data.release_date, data.director);
        return update;
    }
)

const deleteMovieService = asyncHandler(
    async (id) => {
        const deleteMovieById = await deleteMovie(id);
        return deleteMovieById;
    }
)

module.exports = { 
    newMovie, 
    getMovies, 
    getMovieByIdService, 
    updateMovieService, 
    deleteMovieService 
};