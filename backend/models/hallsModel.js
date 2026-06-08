const toHallDTO = (hall) => ({
  id: hall.id,
  hallName: hall.hall_name,
  seatCount: hall.seat_count,
});

module.exports = { toHallDTO };
