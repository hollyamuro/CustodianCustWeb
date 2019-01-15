/**
 * 擔保品 controller
 * @module controllers/S001_custodian/C001_data_inquiry/F004_safekeeping_controller
 */

"use strict";

/**
 * 畫面初始
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.init = async (req, res, next) => {
	try {
		const systemInformation = require("../../../helper/SystemInformation");

		res.render("S001_custodian/C001_data_inquiry/F004_safekeeping", {
			"title": systemInformation.getSystemTitle(),
			"page_title": systemInformation.getPageTitle(req.originalUrl),
			"user_profile": req.user_profile,
			"auth": systemInformation.getPageAuth(req.user_profile.permission_list, req.originalUrl),
		});
	} catch (e) { next(e); }
};

/**
 * holding 讀取
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.readHolding = async (req, res, next) => {
	try {
		const axios = require("axios");
		const config = require("../../../Config");
		const utility = require ("../../../helper/Utility");
		const Error = require("../../../helper/CustodianCustWebError");
		const local = config[process.env.NODE_ENV].backend.policy + "://" +
			config[process.env.NODE_ENV].backend.host + ":" +
			config[process.env.NODE_ENV].backend.port;
		let isInputDataVaild = await utility.checkInputData(req.body.data);
		if(isInputDataVaild){
			const result = await axios.post(local + "/api/bank/custodian/safekeeping/holding", {
				"data": req.body.data,
				"requester": req.user_profile.user,
				"token": req.cookies.access_token,
				"system": "CustodianCustWeb",
			});
			res.send(result.data);
		}else{
			throw new Error.BadRequest();
		}
	} catch (e) { next(e); }
};

/**
 * balance 讀取
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.readBalance = async (req, res, next) => {
	try {
		const axios = require("axios");
		const config = require("../../../Config");
		const utility = require ("../../../helper/Utility");
		const Error = require("../../../helper/CustodianCustWebError");
		const local = config[process.env.NODE_ENV].backend.policy + "://" +
			config[process.env.NODE_ENV].backend.host + ":" +
			config[process.env.NODE_ENV].backend.port;
		let isInputDataVaild = await utility.checkInputData(req.body.data);
		if(isInputDataVaild){
			const result = await axios.post(local + "/api/bank/custodian/safekeeping/balance", {
				"data": req.body.data,
				"requester": req.user_profile.user,
				"token": req.cookies.access_token,
				"system": "CustodianCustWeb",
			});
			res.send(result.data);
		}else{
			throw new Error.BadRequest();
		}
	} catch (e) { next(e); }
};