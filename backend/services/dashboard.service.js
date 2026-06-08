const asyncHandler = require("express-async-handler");
const { getDashboardAnalytics } = require("../repository/dashboard.repository");

const getAnalytics = asyncHandler(async () => {
    return getDashboardAnalytics();
});

module.exports = {
    getAnalytics
};
