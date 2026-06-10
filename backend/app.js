require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const errorHandler = require("./middleware/errorhandler");
const { apiResponse } = require("./utils/pagination");

const showTimeRoutes = require("./routes/showTimeRoute");
const authRouter = require("./routes/router.auth");
const userRouter = require("./routes/router.user");
const movieRouter = require("./routes/router.movie");
const hallsRouter = require("./routes/router.halls");
const dashboardRouter = require("./routes/router.dashboard");
const bookingRouter = require("./routes/router.booking");
const genreRouter = require("./routes/router.genre");

const upload = multer({ dest: "uploads/" });

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/v1/health", (req, res) => {
  apiResponse(res, 200, "API is running", { service: "cinema-ticket-booking" });
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ success: true, message: "File uploaded successfully", file: req.file });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/halls", hallsRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/showtimes", showTimeRoutes);

app.use((req, res) => {
  apiResponse(res, 404, "Route not found", null, { path: req.originalUrl });
});

app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
