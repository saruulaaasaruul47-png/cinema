const asyncHandler = require("../middleware/asyncHandler");
const bookingService = require("../services/booking.service");
const { apiResponse } = require("../utils/pagination");

const getSeatMap = asyncHandler(async (req, res) => {
  const data = await bookingService.getSeatMap(req.params.showtimeId);
  return apiResponse(res, 200, "Seat map fetched successfully", data);
});

const createBooking = asyncHandler(async (req, res) => {
  const data = await bookingService.createBooking(req.body, req.user);
  return apiResponse(res, 201, "Booking created successfully", data);
});

const cancelBooking = asyncHandler(async (req, res) => {
  const data = await bookingService.cancelBooking(req.params.id, req.user);
  return apiResponse(res, 200, "Booking cancelled successfully", data);
});

const getHistory = asyncHandler(async (req, res) => {
  const data = await bookingService.getHistory(req.query, req.user);
  return apiResponse(res, 200, "Booking history fetched successfully", data);
});

module.exports = {
  getSeatMap,
  createBooking,
  cancelBooking,
  getHistory,
};
