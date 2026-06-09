const bookingRepository = require("../repositories/booking.repository");

const ROWS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function createError(message, statusCode = 400, errors = null) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.errors = errors;
  return error;
}

function normalizeSeats(seats) {
  if (!Array.isArray(seats)) return [];

  return [...new Set(
    seats
      .map((seat) => String(seat || "").trim().toUpperCase())
      .filter((seat) => /^[A-Z][1-9][0-9]?$/.test(seat))
  )].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function buildSeatLayout(seatCount, bookedSeats = []) {
  const totalSeats = Math.max(Number(seatCount || 0), 1);
  const columns = totalSeats <= 60 ? 10 : 14;
  const rowCount = Math.ceil(totalSeats / columns);
  const booked = new Set(bookedSeats);
  const layout = [];
  let seatNumber = 0;

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const row = ROWS[rowIndex] || `R${rowIndex + 1}`;
    const seats = [];

    for (let col = 1; col <= columns && seatNumber < totalSeats; col += 1) {
      seatNumber += 1;
      const label = `${row}${col}`;
      seats.push({
        id: label,
        row,
        col,
        label,
        status: booked.has(label) ? "occupied" : "available",
      });
    }

    layout.push({ row, seats });
  }

  return layout;
}

function mapMovie(showtime, pricePerSeat) {
  const startDate = showtime.start_time ? new Date(showtime.start_time) : null;

  return {
    id: showtime.movie_id,
    title: showtime.movie_title,
    tagline: showtime.movie_description || "Cinema booking",
    genre: ["Cinema"],
    duration: showtime.duration || 120,
    rating: "PG",
    year: showtime.release_date ? new Date(showtime.release_date).getFullYear() : "",
    director: showtime.director || "Unknown",
    imdb: "8.0",
    poster: showtime.poster_url || "",
    backdrop: showtime.poster_url || "",
    hall: showtime.hall_name,
    hallType: "2D Digital",
    showtime: startDate
      ? startDate.toLocaleTimeString("mn-MN", { hour: "2-digit", minute: "2-digit" })
      : "",
    date: startDate
      ? startDate.toLocaleDateString("mn-MN", { year: "numeric", month: "short", day: "numeric" })
      : "",
    language: "Mongolian",
    priceAdult: pricePerSeat,
  };
}

async function getSeatMap(showtimeId) {
  const data = await bookingRepository.getShowtimeSeatData(showtimeId);
  if (!data) throw createError("Showtime not found", 404);

  return {
    showtimeId: Number(showtimeId),
    movie: mapMovie(data.showtime, data.pricePerSeat),
    seatLayout: buildSeatLayout(data.showtime.seat_count, data.bookedSeats),
    bookedSeats: data.bookedSeats,
    pricePerSeat: data.pricePerSeat,
  };
}

async function createBooking(payload, user = null) {
  const seats = normalizeSeats(payload.seats);
  if (!payload.showtimeId) throw createError("showtimeId is required", 400);
  if (seats.length === 0) throw createError("Select at least one seat", 400);
  if (seats.length > 8) throw createError("You can book up to 8 seats at once", 400);
  if (!payload.customerName) throw createError("customerName is required", 400);

  return bookingRepository.createBooking({
    showtimeId: payload.showtimeId,
    seats,
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    userId: user?.id,
  });
}

async function cancelBooking(id, user = null) {
  const booking = await bookingRepository.cancelBooking(id, user?.id);
  if (!booking) throw createError("Booking not found or already cancelled", 404);
  return booking;
}

async function getHistory(query = {}, user = null) {
  return bookingRepository.findHistory({
    userId: user?.id,
    email: query.email,
  });
}

module.exports = {
  getSeatMap,
  createBooking,
  cancelBooking,
  getHistory,
};
