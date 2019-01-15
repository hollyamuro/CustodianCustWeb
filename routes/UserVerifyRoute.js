/**
 * 系統框架路由
 * @module routes/UserVerifyRoute
 */

"use strict";

const UserVerifyRoute = () => {
	const express = require("express");
	const router = express.Router();
	const UserVerifyController = require("../controllers/UserVerifyController");

	// router.post("/init", UserVerifyController.init );
	router.post("/send", UserVerifyController.send );
	router.post("/verify", UserVerifyController.verify );
	router.post("/vcode_init", UserVerifyController.verify_code_init );

	/* other route add here */

	return router;
};

module.exports = UserVerifyRoute();
