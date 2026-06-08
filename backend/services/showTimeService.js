const ShowTimeRepository = require("../repositories/ShowTimeRepository");
const MovieRepository = require("../repositories/MovieRepository");
const CinemaHallRepository = require("../repositories/CinemaHallRepository");
const { parsePagination, buildPagination } = require("../utils/pagination");

// Service layer дээр statusCode-той error үүсгээд controller-ийн error handler рүү дамжуулна.
function createError(message, statusCode = 400, errors = null) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.errors = errors;
  return error;
}

// Database-аас ирсэн genre string-ийг frontend-д хэрэглэх array хэлбэрт оруулна.
function normalizeShowTime(row) {
  if (!row) return null;

  return {
    ...row,
    genres: row.genres ? row.genres.split(", ") : [],
  };
}

// Огноо хоосон эсвэл буруу format-тай эсэхийг шалгана.
function validateDateTime(value, fieldName) {
  if (!value) return `${fieldName} is required`;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return `${fieldName} must be a valid date time`;
  return null;
}

// Create/update хийхийн өмнө шаардлагатай талбарууд болон цагийн дарааллыг шалгана.
function validatePayload(payload) {
  const errors = {};

  if (!payload.movie_id) errors.movie_id = "movie_id is required";
  if (!payload.hall_id) errors.hall_id = "hall_id is required";

  const startError = validateDateTime(payload.start_time, "start_time");
  if (startError) errors.start_time = startError;

  const endError = validateDateTime(payload.end_time, "end_time");
  if (endError) errors.end_time = endError;

  if (!startError && !endError && new Date(payload.end_time) <= new Date(payload.start_time)) {
    errors.end_time = "end_time must be after start_time";
  }

  if (Object.keys(errors).length > 0) {
    throw createError("Validation failed", 400, errors);
  }
}

// Frontend-ээс ирсэн query-г зөвшөөрөгдсөн filter/sort утгууд болгон цэвэрлэнэ.
function buildFilters(query) {
  const allowedSorts = ["title", "start_time", "end_time", "duration", "release_date", "hall_name"];
  const sort = allowedSorts.includes(query.sort) ? query.sort : "start_time";
  const order = String(query.order || "asc").toLowerCase() === "desc" ? "desc" : "asc";

  return {
    search: query.search || "",
    genre: query.genre || "",
    date: query.date || "",
    movie_id: query.movie_id || "",
    hall_id: query.hall_id || "",
    sort,
    order,
  };
}

// Showtime жагсаалтыг filter, sort, pagination-тэй авч frontend-д тохирох бүтэцтэй буцаана.
async function getShowTimes(query) {
  const pagination = parsePagination(query);
  const filters = buildFilters(query);
  const { rows, total } = await ShowTimeRepository.findAll(filters, pagination);
  const content = rows.map(normalizeShowTime);

  return buildPagination(content, pagination.page, pagination.size, total);
}

// id-аар нэг showtime хайж, байхгүй бол 404 error үүсгэнэ.
async function getShowTimeById(id) {
  const showTime = normalizeShowTime(await ShowTimeRepository.findById(id));
  if (!showTime) throw createError("Show time not found", 404);

  return showTime;
}

// Showtime үүсгэх/засах үед сонгосон movie болон hall үнэхээр байгаа эсэхийг шалгана.
async function ensureRelations(payload) {
  const [movie, hall] = await Promise.all([
    MovieRepository.findById(payload.movie_id),
    CinemaHallRepository.findById(payload.hall_id),
  ]);

  if (!movie) throw createError("Movie not found", 404);
  if (!hall) throw createError("Cinema hall not found", 404);
}

// Нэг танхимд давхардсан цагийн хуваарь үүсэхээс хамгаална.
async function ensureNoConflict(payload, ignoredShowTimeId = null) {
  const hasConflict = await ShowTimeRepository.hasHallTimeConflict(
    payload.hall_id,
    payload.start_time,
    payload.end_time,
    ignoredShowTimeId
  );

  if (hasConflict) {
    throw createError("This hall already has a show time in the selected time range", 400);
  }
}

// Validation, relation, conflict шалгалтуудыг давсны дараа шинэ showtime үүсгэнэ.
async function createShowTime(payload) {
  validatePayload(payload);
  await ensureRelations(payload);
  await ensureNoConflict(payload);

  return normalizeShowTime(await ShowTimeRepository.create(payload));
}

// Байгаа showtime-г шалгаад шинэ мэдээллээр update хийнэ.
async function updateShowTime(id, payload) {
  validatePayload(payload);

  const existing = await ShowTimeRepository.findById(id);
  if (!existing) throw createError("Show time not found", 404);

  await ensureRelations(payload);
  await ensureNoConflict(payload, id);

  return normalizeShowTime(await ShowTimeRepository.update(id, payload));
}

// Мөрийг бүр устгахгүй, deleted_at бөглөж soft delete хийнэ.
async function deleteShowTime(id) {
  const deleted = await ShowTimeRepository.softDelete(id);
  if (!deleted) throw createError("Show time not found", 404);

  return { id: Number(id) };
}

// Frontend form дээр ашиглах active movies болон halls жагсаалтыг зэрэг авна.
async function getFormOptions() {
  const [movies, halls] = await Promise.all([
    MovieRepository.findActiveMovies(),
    CinemaHallRepository.findActiveHalls(),
  ]);

  return { movies, halls };
}

module.exports = {
  getShowTimes,
  getShowTimeById,
  createShowTime,
  updateShowTime,
  deleteShowTime,
  getFormOptions,
};
