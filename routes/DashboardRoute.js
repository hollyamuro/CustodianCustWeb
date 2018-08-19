/**
 * Dashboard route
 * @module routes/DashboardRoute
 */

module.exports = (() => {
	const express = require("express");
	const router = express.Router();
	const dashboardController = require("../controllers/DashboardController");
	router.all("/", dashboardController.init);
	router.post("/read", dashboardController.read);
	return router;
})();
