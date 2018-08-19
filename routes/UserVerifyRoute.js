/**
 * 系統框架路由
 * @module routes/UserVerifyRoute.js
 */

"use strict";

const UserVerifyRoute = () => {
	const express = require("express");
	const router = express.Router();
	const UserVerifyController = require("../controllers/UserVerifyController");

	// router.post("/init", UserVerifyController.init );
	router.post("/send", UserVerifyController.send );
	router.post("/verify", UserVerifyController.verify );

	/* other route add here */

	return router;
};

module.exports = UserVerifyRoute();
