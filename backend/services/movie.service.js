const { createMovie, findMovie } = require("../repository/movie.repository");
const Movie = require("../models/movieModels");
const asyncHandler = require("express-async-handler");

const newMovie = asyncHandler(async (data) => {
    console.log(data);
    const movie = new Movie(data.title, data.description, data.duration, data.release_date, data.director);
    const check = await findMovie(movie.title, movie.director);
    if(check){
        throw new TypeError("Movie already exist");
    }
    const addMovie = await createMovie(movie.title, movie.description, movie.duration, movie.release_date, movie.director)
    return addMovie;

})

module.exports = { newMovie };