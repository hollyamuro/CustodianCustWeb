/**
 * 庫存查詢 controller
 * @module controllers/S001_custodian/C001_data_inquiry/F002_not_charge_off_history_controller
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

		res.render("S001_custodian/C001_data_inquiry/F002_not_charge_off_history", { 
			"title": systemInformation.getSystemTitle(),
			"page_title": systemInformation.getPageTitle(req.originalUrl),
			"user_profile" : req.user_profile,
			"auth": systemInformation.getPageAuth(req.user_profile.permission_list, req.originalUrl),
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
		const config = require("../../../Config");
		const utility = require ("../../../helper/Utility");
		const Error = require("../../../helper/CustodianCustWebError");
		const local = 	config[process.env.NODE_ENV].backend.policy + "://" + 
						config[process.env.NODE_ENV].backend.host + ":" +
						config[process.env.NODE_ENV].backend.port;
		let isInputDataVaild = await utility.checkInputData(req.body.data);
		if(isInputDataVaild){
			const result = await axios.post( local + "/api/cust/custodian/not_charge_off_history",{
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