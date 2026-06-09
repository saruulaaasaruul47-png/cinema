const pool = require("../config/db");

const BOOKING_PRICE = 15000;

const ensureBookingTable = async (connection = pool) => {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NULL,
      showtime_id INT NOT NULL,
      customer_name VARCHAR(120) NOT NULL,
      customer_email VARCHAR(180) NULL,
      seats JSON NOT NULL,
      total_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
      status ENUM('confirmed', 'cancelled') NOT NULL DEFAULT 'confirmed',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_bookings_showtime_status (showtime_id, status),
      INDEX idx_bookings_user (user_id)
    )
  `);
};

const parseSeats = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
};

const normalizeBooking = (booking) => {
  if (!booking) return null;

  return {
    ...booking,
    seats: parseSeats(booking.seats),
    total_price: Number(booking.total_price || 0),
  };
};

const findShowtimeForBooking = async (connection, showtimeId) => {
  const [rows] = await connection.query(
    `SELECT
        st.id,
        st.movie_id,
        st.hall_id,
        st.start_time,
        st.end_time,
        m.title AS movie_title,
        m.description AS movie_description,
        m.duration,
        m.release_date,
        m.poster_url,
        m.director,
        h.hall_name,
        h.seat_count
     FROM show_times st
     JOIN movies m ON st.movie_id = m.id
     JOIN cinema_halls h ON st.hall_id = h.id
     WHERE st.id = ?
       AND st.deleted_at IS NULL
       AND m.deleted_at IS NULL
       AND h.deleted_at IS NULL
     LIMIT 1`,
    [showtimeId]
  );

  return rows[0] || null;
};

const getConfirmedSeatsForUpdate = async (connection, showtimeId) => {
  const [rows] = await connection.query(
    `SELECT seats
     FROM bookings
     WHERE showtime_id = ? AND status = 'confirmed'
     FOR UPDATE`,
    [showtimeId]
  );

  return rows.flatMap((row) => parseSeats(row.seats));
};

const getConfirmedSeats = async (showtimeId) => {
  await ensureBookingTable();

  const [rows] = await pool.query(
    `SELECT seats
     FROM bookings
     WHERE showtime_id = ? AND status = 'confirmed'`,
    [showtimeId]
  );

  return rows.flatMap((row) => parseSeats(row.seats));
};

const getShowtimeSeatData = async (showtimeId) => {
  await ensureBookingTable();

  const connection = await pool.getConnection();
  try {
    const showtime = await findShowtimeForBooking(connection, showtimeId);
    if (!showtime) return null;

    const bookedSeats = await getConfirmedSeats(showtimeId);
    return { showtime, bookedSeats, pricePerSeat: BOOKING_PRICE };
  } finally {
    connection.release();
  }
};

const findBookingById = async (id) => {
  await ensureBookingTable();

  const [rows] = await pool.query(
    `SELECT b.*, m.title AS movie_title, h.hall_name, st.start_time
     FROM bookings b
     LEFT JOIN show_times st ON b.showtime_id = st.id
     LEFT JOIN movies m ON st.movie_id = m.id
     LEFT JOIN cinema_halls h ON st.hall_id = h.id
     WHERE b.id = ?
     LIMIT 1`,
    [id]
  );

  return normalizeBooking(rows[0]);
};

const createBooking = async ({ showtimeId, seats, customerName, customerEmail, userId }) => {
  await ensureBookingTable();

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const showtime = await findShowtimeForBooking(connection, showtimeId);
    if (!showtime) {
      const error = new Error("Showtime not found");
      error.statusCode = 404;
      throw error;
    }

    const bookedSeats = await getConfirmedSeatsForUpdate(connection, showtimeId);
    const bookedSet = new Set(bookedSeats);
    const conflicts = seats.filter((seat) => bookedSet.has(seat));

    if (conflicts.length > 0) {
      const error = new Error("Selected seats are already booked");
      error.statusCode = 409;
      error.errors = { seats: conflicts };
      throw error;
    }

    const totalPrice = seats.length * BOOKING_PRICE;
    const [result] = await connection.query(
      `INSERT INTO bookings
        (user_id, showtime_id, customer_name, customer_email, seats, total_price, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'confirmed', NOW(), NOW())`,
      [
        userId || null,
        showtimeId,
        customerName,
        customerEmail || null,
        JSON.stringify(seats),
        totalPrice,
      ]
    );

    await connection.commit();
    return findBookingById(result.insertId);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const cancelBooking = async (id, userId = null) => {
  await ensureBookingTable();

  const values = [id];
  let ownerClause = "";
  if (userId) {
    ownerClause = "AND (user_id = ? OR user_id IS NULL)";
    values.push(userId);
  }

  const [result] = await pool.query(
    `UPDATE bookings
     SET status = 'cancelled', updated_at = NOW()
     WHERE id = ? AND status = 'confirmed' ${ownerClause}`,
    values
  );

  return result.affectedRows > 0 ? findBookingById(id) : null;
};

const findHistory = async ({ userId, email } = {}) => {
  await ensureBookingTable();

  const values = [];
  const where = [];

  if (userId) {
    where.push("b.user_id = ?");
    values.push(userId);
  }

  if (email) {
    where.push("b.customer_email = ?");
    values.push(email);
  }

  const clause = where.length ? `WHERE ${where.join(" OR ")}` : "";
  const [rows] = await pool.query(
    `SELECT b.*, m.title AS movie_title, h.hall_name, st.start_time
     FROM bookings b
     LEFT JOIN show_times st ON b.showtime_id = st.id
     LEFT JOIN movies m ON st.movie_id = m.id
     LEFT JOIN cinema_halls h ON st.hall_id = h.id
     ${clause}
     ORDER BY b.created_at DESC
     LIMIT 50`,
    values
  );

  return rows.map(normalizeBooking);
};

module.exports = {
  createBooking,
  cancelBooking,
  findHistory,
  getShowtimeSeatData,
};
