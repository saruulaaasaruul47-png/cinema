const asyncHandler = require("express-async-handler");
const { getAnalytics } = require("../services/dashboard.service");

const getDashboardController = asyncHandler(async (req, res) => {
    const analytics = await getAnalytics();

    return res.json({
        status: 200,
        message: "Dashboard analytics fetched successfully",
        analytics
    });
});

module.exports = {
    getDashboardController
};
