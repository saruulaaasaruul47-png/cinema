const express = require("express");
const bookingController = require("../controllers/booking.controller");

const bookingRouter = express.Router();

bookingRouter.get("/showtimes/:showtimeId/seats", bookingController.getSeatMap);
bookingRouter.get("/history", bookingController.getHistory);
bookingRouter.post("/", bookingController.createBooking);
bookingRouter.patch("/:id/cancel", bookingController.cancelBooking);

module.exports = bookingRouter;
