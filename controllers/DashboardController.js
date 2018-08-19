/**
 * Dashboard Controller
 * @module controllers/DashboardController.js
 */

"use strict";

/**
 * 畫面初始
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.init = async (req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");

		res.render("dashboard", { 
			"title": systemInformation.getSystemTitle(),
			"page_title": "Dashboard",
			"user_profile" : req.user_profile,
		});
	}catch(e){ next(e); }
};

/**
 * 讀取
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.read = async (req, res, next) => {
	try{
		const axios = require("axios");
		const config = require("../Config");
		const local = 	config[process.env.NODE_ENV].backend.policy + "://" + 
						config[process.env.NODE_ENV].backend.host + ":" +
						config[process.env.NODE_ENV].backend.port;
		const result = await axios.post( local + "/api/cust/dashboard",{"data": req.body.data, "requester":req.user_profile.user });
		res.send(result.data); 

	}catch(e){ next(e); }
};