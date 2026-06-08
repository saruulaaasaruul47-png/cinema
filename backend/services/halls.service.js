const {
  findHall,
  hallList,
  createHall,
  updateHall,
  findHallById,
  deleteHall,
} = require("../repositories/halls.repository");

function createError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

const getHalls = async () => hallList();

const addHall = async (data) => {
  const { hall_name, seat_count } = data;
  const existing = await findHall(hall_name);
  if (existing) throw createError("Hall already exist", 409);

  return createHall(hall_name, seat_count);
};

const updateHallService = async (id, data) => {
  const hall = await findHallById(id);
  if (!hall) throw createError("Hall not found", 404);

  return updateHall(id, data.hall_name, data.seat_count);
};

const deleteHallService = async (id) => deleteHall(id);

module.exports = {
  getHalls,
  addHall,
  updateHallService,
  deleteHallService,
};
