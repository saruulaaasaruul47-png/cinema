const express = require('express');
const { addMovie } = require("../controllers/movie.controller");
const workRouter = express.Router();

workRouter.post("/newmovie", addMovie);

module.exports = workRouter;