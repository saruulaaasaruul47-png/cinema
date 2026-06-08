const MovieModel = require("../models/Movie");

// Movie-тэй холбоотой database access-ийг service layer-ээс салгаж өгнө.
function findActiveMovies() {
  return MovieModel.findActiveMovies();
}

// id-аар active movie байгаа эсэхийг хайна.
function findById(id) {
  return MovieModel.findById(id);
}

module.exports = {
  findActiveMovies,
  findById,
};
