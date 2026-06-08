const { getDashboardAnalytics } = require("../repositories/dashboard.repository");

const getAnalytics = async () => getDashboardAnalytics();

module.exports = {
  getAnalytics,
};
