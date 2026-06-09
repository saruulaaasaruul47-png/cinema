const { 
    createMovie, 
    findMovie, 
    getAllMovies, 
    getMovieById, 
    updateMovie, 
    deleteMovie 
} = require("../repositories/movie.repository");


const Movie = require("../models/movieModels");
const asyncHandler = require("express-async-handler");

const toNullable = (value) => value === undefined || value === "" ? null : value;

const buildMovie = (data) => {
    const releaseDate = data.release_date || data.releaseDate || (data.year ? `${data.year}-01-01` : null);

    return new Movie(
        data.title,
        toNullable(data.description),
        toNullable(data.duration),
        toNullable(data.poster_url || data.posterUrl || data.poster),
        toNullable(releaseDate),
        data.director
    );
};

const newMovie = asyncHandler(async (data) => {
    const movie = buildMovie(data);
    if (!movie.title || !movie.director) {
        const error = new Error("Title and director are required");
        error.statusCode = 400;
        throw error;
    }
    const check = await findMovie(movie.title, movie.director);
    if(check){
        const error = new Error("Movie already exist");
        error.statusCode = 409;
        throw error;
    }
    const addMovie = await createMovie(
        movie.title,
        movie.description,
        movie.duration,
        movie.poster_url,
        movie.release_date,
        movie.director
    )
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
        if (!movie) {
            const error = new Error("Movie not found");
            error.statusCode = 404;
            throw error;
        }
        const nextMovie = buildMovie({ ...movie, ...data });
        const update = await updateMovie(
            id,
            nextMovie.title,
            nextMovie.description,
            nextMovie.duration,
            nextMovie.poster_url,
            nextMovie.release_date,
            nextMovie.director
        );
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
