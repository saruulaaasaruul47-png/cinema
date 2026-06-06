const asyncHandler = require("express-async-handler");
const { newMovie } = require("../services/movie.service");

const addMovie = asyncHandler(async (req, res, next) => {
    const movie = await newMovie(req.body);
    return res.json({
        status: 200,
        message: "Movie added successfully",
    })
})

module.exports = { addMovie };