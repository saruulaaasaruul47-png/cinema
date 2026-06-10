const asyncHandler = require("express-async-handler");
const { getAnalytics } = require("../services/dashboard.service");
const { apiResponse } = require("../utils/pagination");

const getDashboardController = asyncHandler(async (req, res) => {
    const analytics = await getAnalytics();
    return apiResponse(res, 200, "Dashboard analytics fetched successfully", analytics);
});

module.exports = {
    getDashboardController,
};
