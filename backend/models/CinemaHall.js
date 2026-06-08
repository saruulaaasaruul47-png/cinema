const db = require("../config/db");

async function findActiveHalls() {
  const [rows] = await db.query(
    `SELECT id, hall_name, seat_count
     FROM cinema_halls
     WHERE deleted_at IS NULL
     ORDER BY hall_name ASC`
  );

  return rows;
}

async function findById(id) {
  const [rows] = await db.query(
    `SELECT id, hall_name, seat_count
     FROM cinema_halls
     WHERE id = ? AND deleted_at IS NULL
     LIMIT 1`,
    [id]
  );

  return rows[0] || null;
}

module.exports = {
  findActiveHalls,
  findById,
};
