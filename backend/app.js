const express = require("express");
const showTimeRoutes = require("./routes/showTimeRoute");
const errorHandler = require("./middleware/errorHandler");
const { apiResponse } = require("./utils/pagination");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // File upload-д зориулсан middleware, хэрэв шаардлагатай бол ашиглана.

const app = express();
const PORT = process.env.PORT || 5050;

// Frontend-ээс ирэх хүсэлтүүдийг зөвшөөрөх CORS тохиргоо.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN || "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());

// Backend ажиллаж байгаа эсэхийг шалгах test endpoint.
app.get("/api/v1/health", (req, res) => {
  apiResponse(res, 200, "API is running", { service: "cinema-ticket-booking" });
});

// ShowTime-тэй холбоотой бүх API route-уудыг энд холбоно.
app.use("/api/v1/showtimes", showTimeRoutes);

// Дээр бүртгээгүй route дуудвал 404 response буцаана.
app.use((req, res) => {
  apiResponse(res, 404, "Route not found", null, { path: req.originalUrl });
});

// Controller/service дээр гарсан error-уудыг нэг дор барьж response болгоно.
app.use(errorHandler);

if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  const keepAlive = setInterval(() => {}, 1 << 30);

  process.on("SIGTERM", () => {
    clearInterval(keepAlive);
    server.close(() => process.exit(0));
  });
}

app.post("/upload", upload.single("file"), (req, res) => {
    res.json({ success: true, message: "File uploaded successfully", file: req.file });
});

module.exports = app;
