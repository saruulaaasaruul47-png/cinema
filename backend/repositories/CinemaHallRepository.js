const CinemaHallModel = require("../models/CinemaHall");

// Cinema hall-тэй холбоотой database access-ийг service layer-ээс салгаж өгнө.
function findActiveHalls() {
  return CinemaHallModel.findActiveHalls();
}

// id-аар active hall байгаа эсэхийг хайна.
function findById(id) {
  return CinemaHallModel.findById(id);
}

module.exports = {
  findActiveHalls,
  findById,
};
