/**
 * 系統框架路由
 * @module routes/UserResetRoute.js
 */

"use strict";

const UserResetRoute = () => {
	const express = require("express");
	const router = express.Router();
	const UserResetController = require("../controllers/UserResetController");
    
	router.get("/init", UserResetController.init );
	router.post("/send", UserResetController.send );
	router.post("/change", UserResetController.change );
	router.post("/email", UserResetController.verify_email );
	router.post("/verify", UserResetController.verify_code );
   
	/* other route add here */

	return router;
};

module.exports = UserResetRoute();
