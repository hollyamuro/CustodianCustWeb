/**
 * Dashboard Controller
 * @module controllers/DashboardController
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
		const utility = require ("../helper/Utility");
		const Error = require("../helper/CustodianCustWebError");
		const local = 	config[process.env.NODE_ENV].backend.policy + "://" + 
						config[process.env.NODE_ENV].backend.host + ":" +
						config[process.env.NODE_ENV].backend.port;
		let isInputDataVaild = await utility.checkInputData(req.body.data);
		if(isInputDataVaild){
			const result = await axios.post( local + "/api/cust/dashboard",{
				"data": req.body.data, 
				"requester":req.user_profile.user,
				"token": req.cookies.access_token,
				"system": "CustodianCustWeb",
			});
			res.send(result.data);
		}else{
			throw new Error.BadRequest();
		} 

	}catch(e){ next(e); }
};