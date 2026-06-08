const ShowTimeModel = require("../models/ShowTime");

// Showtime-ийн database query-үүдийг service layer-ээс тусгаарлаж өгч байгаа repository.
function findAll(filters, pagination) {
  return ShowTimeModel.findAll(filters, pagination);
}

// id-аар нэг showtime хайна.
function findById(id) {
  return ShowTimeModel.findById(id);
}

// Шинэ showtime database-д үүсгэнэ.
function create(showTime) {
  return ShowTimeModel.create(showTime);
}

// Байгаа showtime-ийн мэдээллийг шинэчилнэ.
function update(id, showTime) {
  return ShowTimeModel.update(id, showTime);
}

// Showtime-г бүр устгахгүйгээр deleted_at бөглөж нууж өгнө.
function softDelete(id) {
  return ShowTimeModel.softDelete(id);
}

// Нэг hall дээр цаг давхцаж байгаа эсэхийг шалгана.
function hasHallTimeConflict(hallId, startTime, endTime, ignoredShowTimeId = null) {
  return ShowTimeModel.hasHallTimeConflict(hallId, startTime, endTime, ignoredShowTimeId);
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  softDelete,
  hasHallTimeConflict,
};
