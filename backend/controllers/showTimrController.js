const asyncHandler = require("../middleware/asyncHandler");
const showTimeService = require("../services/showTimeService");
const { apiResponse } = require("../utils/pagination");

// Query параметрүүдээр filter, sort, pagination хийсэн showtime жагсаалт авна.
const getShowTimes = asyncHandler(async (req, res) => {
  const data = await showTimeService.getShowTimes(req.query);
  return apiResponse(res, 200, "Show times fetched successfully", data);
});

// URL дээр ирсэн id-аар нэг showtime-ийн дэлгэрэнгүй мэдээлэл авна.
const getShowTimeById = asyncHandler(async (req, res) => {
  const data = await showTimeService.getShowTimeById(req.params.id);
  return apiResponse(res, 200, "Show time fetched successfully", data);
});

// Request body-оос шинэ showtime үүсгэх мэдээллийг service рүү дамжуулна.
const createShowTime = asyncHandler(async (req, res) => {
  const data = await showTimeService.createShowTime(req.body);
  return apiResponse(res, 201, "Show time created successfully", data);
});

// Сонгосон showtime-ийн мэдээллийг шинэчилнэ.
const updateShowTime = asyncHandler(async (req, res) => {
  const data = await showTimeService.updateShowTime(req.params.id, req.body);
  return apiResponse(res, 200, "Show time updated successfully", data);
});

// Сонгосон showtime-г soft delete хийлгэнэ.
const deleteShowTime = asyncHandler(async (req, res) => {
  const data = await showTimeService.deleteShowTime(req.params.id);
  return apiResponse(res, 200, "Show time deleted successfully", data);
});

// Form дээр сонгох movie болон hall-ийн option жагсаалтыг буцаана.
const getShowTimeOptions = asyncHandler(async (req, res) => {
  const data = await showTimeService.getFormOptions();
  return apiResponse(res, 200, "Show time form options fetched successfully", data);
});

module.exports = {
  getShowTimes,
  getShowTimeById,
  createShowTime,
  updateShowTime,
  deleteShowTime,
  getShowTimeOptions,
};
