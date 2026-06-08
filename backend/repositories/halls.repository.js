const pool = require("../config/db");

const findHall = async (hall_name) => {
  const [rows] = await pool.execute(
    "SELECT * FROM cinema_halls WHERE hall_name = ? AND deleted_at IS NULL",
    [hall_name]
  );
  return rows[0];
};

const hallList = async () => {
  const [rows] = await pool.execute(
    "SELECT * FROM cinema_halls WHERE deleted_at IS NULL"
  );
  return rows;
};

const findHallById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM cinema_halls WHERE id = ? AND deleted_at IS NULL",
    [id]
  );
  return rows[0];
};

const findActiveHalls = async () => {
  const [rows] = await pool.execute(
    `SELECT id, hall_name, seat_count
     FROM cinema_halls
     WHERE deleted_at IS NULL
     ORDER BY hall_name ASC`
  );
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT id, hall_name, seat_count
     FROM cinema_halls
     WHERE id = ? AND deleted_at IS NULL
     LIMIT 1`,
    [id]
  );
  return rows[0] || null;
};

const createHall = async (hall_name, seat_count) => {
  const [result] = await pool.execute(
    "INSERT INTO cinema_halls (hall_name, seat_count) VALUES (?, ?)",
    [hall_name, seat_count]
  );
  return result;
};

const updateHall = async (id, hall_name, seat_count) => {
  const [result] = await pool.execute(
    "UPDATE cinema_halls SET hall_name = ?, seat_count = ? WHERE id = ? AND deleted_at IS NULL",
    [hall_name, seat_count, id]
  );
  return result;
};

const deleteHall = async (id) => {
  const [result] = await pool.execute(
    "DELETE FROM cinema_halls WHERE id = ?",
    [id]
  );
  return result;
};

module.exports = {
  findHall,
  hallList,
  findHallById,
  findActiveHalls,
  findById,
  createHall,
  updateHall,
  deleteHall,
};
