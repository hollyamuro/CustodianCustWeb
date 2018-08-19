/**
 * 系統框架路由
 * @module routes/SystemFrameRoute.js
 * log 20180710 009727 增加初始驗證畫面路由
 */

"use strict";

const systemFrameRoute = () => {
	const express = require("express");
	const router = express.Router();
	const systemFrameController = require("../controllers/SystemFrameController");
	const UserVerifyController = require("../controllers/UserVerifyController");
	const UserResetController = require("../controllers/UserResetController");

	router.get("/", systemFrameController.home );
	router.get("/register", systemFrameController.home );


	router.post("/", systemFrameController.login );
	router.all("/demo", systemFrameController.demo );
	router.all("/logout", systemFrameController.logout );
	router.all("/timeout", systemFrameController.timeout );
	/* other route add here */

	/* user verify*/
	let UrlRegexpVerify = /^\/verify([=0-9a-f]{9}-[0-9a-f]{4}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;
	router.get(UrlRegexpVerify, UserVerifyController.init );
	router.post(UrlRegexpVerify, UserVerifyController.send );

	/* user reset password*/
	let UrlRegexpReset = /^\/verify\wreset([=0-9a-f]{9}-[0-9a-f]{4}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;
	router.get(UrlRegexpReset,UserResetController.reset_init);
	router.post(UrlRegexpReset,UserResetController.verify_email);

	let UrlRegexpVerifyVc = /^\/reset\wvcode([=0-9a-f]{9}-[0-9a-f]{4}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;
	router.post(UrlRegexpVerifyVc, UserResetController.verify_code );

	let UrlRegexpVerifyPw = /^\/reset\wchange([=0-9a-f]{9}-[0-9a-f]{4}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;
	router.get(UrlRegexpVerifyPw, UserResetController.change_init );
	router.post(UrlRegexpVerifyPw, UserResetController.change );

	return router;
};

module.exports = systemFrameRoute();
