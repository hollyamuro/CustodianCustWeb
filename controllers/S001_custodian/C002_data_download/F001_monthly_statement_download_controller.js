/**
 * 庫存查詢 controller
 * @module controllers/S001_custodian/C002_data_download/F001_monthly_statement_download_controller.js
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
		const systemInformation = require("../../../helper/SystemInformation");

		res.render("S001_custodian/C002_data_download/F001_monthly_statement_download", { 
			"title": systemInformation.getSystemTitle(),
			"page_title": systemInformation.getPageTitle(req.originalUrl),
			"user_profile" : req.user_profile,
			"auth": systemInformation.getPageAuth(req.user_profile.permission_list, req.originalUrl),
		});
	}catch(e){ next(e); }
};

// /**
//  * 讀取
//  * @param  {} req
//  * @param  {} res
//  * @param  {} next
//  */
// module.exports.read = async (req, res, next) => {
// 	try{
// 		const axios = require("axios");
// 		const config = require("../../../Config");
// 		const local = 	config[process.env.NODE_ENV].backend.policy + "://" + 
// 						config[process.env.NODE_ENV].backend.host + ":" +
// 						config[process.env.NODE_ENV].backend.port;
// 		const result = await axios.post( local + "/api/cust/custodian/charge_off_history",{"data": req.body.data, "requester":req.user_profile.user }); //todo
// 		res.send(result.data); 

// 	}catch(e){ next(e); }
// };