const showtimeRepository = require("../repositories/showtime.repository");
const movieRepository = require("../repositories/movie.repository");
const hallsRepository = require("../repositories/halls.repository");
const { parsePagination, buildPagination } = require("../utils/pagination");

function createError(message, statusCode = 400, errors = null) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.errors = errors;
  return error;
}

function normalizeShowTime(row) {
  if (!row) return null;

  return {
    ...row,
    genres: row.genres ? row.genres.split(", ") : [],
  };
}

function validateDateTime(value, fieldName) {
  if (!value) return `${fieldName} is required`;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return `${fieldName} must be a valid date time`;
  return null;
}

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

async function getShowTimes(query) {
  const pagination = parsePagination(query);
  const filters = buildFilters(query);
  const { rows, total } = await showtimeRepository.findAll(filters, pagination);
  const content = rows.map(normalizeShowTime);

  return buildPagination(content, pagination.page, pagination.size, total);
}

async function getShowTimeById(id) {
  const showTime = normalizeShowTime(await showtimeRepository.findById(id));
  if (!showTime) throw createError("Show time not found", 404);

  return showTime;
}

async function ensureRelations(payload) {
  const [movie, hall] = await Promise.all([
    movieRepository.findById(payload.movie_id),
    hallsRepository.findById(payload.hall_id),
  ]);

  if (!movie) throw createError("Movie not found", 404);
  if (!hall) throw createError("Cinema hall not found", 404);
}

async function ensureNoConflict(payload, ignoredShowTimeId = null) {
  const hasConflict = await showtimeRepository.hasHallTimeConflict(
    payload.hall_id,
    payload.start_time,
    payload.end_time,
    ignoredShowTimeId
  );

  if (hasConflict) {
    throw createError("This hall already has a show time in the selected time range", 400);
  }
}

async function createShowTime(payload) {
  validatePayload(payload);
  await ensureRelations(payload);
  await ensureNoConflict(payload);

  return normalizeShowTime(await showtimeRepository.create(payload));
}

async function updateShowTime(id, payload) {
  validatePayload(payload);

  const existing = await showtimeRepository.findById(id);
  if (!existing) throw createError("Show time not found", 404);

  await ensureRelations(payload);
  await ensureNoConflict(payload, id);

  return normalizeShowTime(await showtimeRepository.update(id, payload));
}

async function deleteShowTime(id) {
  const deleted = await showtimeRepository.softDelete(id);
  if (!deleted) throw createError("Show time not found", 404);

  return { id: Number(id) };
}

async function getFormOptions() {
  const [movies, halls] = await Promise.all([
    movieRepository.findActiveMovies(),
    hallsRepository.findActiveHalls(),
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
