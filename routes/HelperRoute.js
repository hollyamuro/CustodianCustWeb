/**
 * 共用函式之route
 * @module routes/HelperRoute
 */
const HelpRoute = () => {
	const express = require("express");
	const router = express.Router();
	const HelperController = require("../controllers/HelperController");
	router.post("/user", HelperController.getUserData );

	return router;
};

module.exports = HelpRoute();
