const express = require("express");
const { getDashboardController } = require("../controllers/dashboard.controller");

const dashboardRouter = express.Router();

dashboardRouter.get("/analytics", getDashboardController);

module.exports = dashboardRouter;
