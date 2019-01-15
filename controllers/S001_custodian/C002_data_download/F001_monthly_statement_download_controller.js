/**
 * 庫存查詢 controller
 * @module controllers/S001_custodian/C002_data_download/F001_monthly_statement_download_controller
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

		res.render("S001_custodian/C002_data_download/F001_monthly_statement_download", {
			"title": systemInformation.getSystemTitle(),
			"page_title": systemInformation.getPageTitle(req.originalUrl),
			"user_profile": req.user_profile,
			"auth": systemInformation.getPageAuth(req.user_profile.permission_list, req.originalUrl),
		});
	} catch (e) { next(e); }
};

/**
 * 讀取
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.download = async (req, res, next) => {

	try {

		const axios = require("axios");
		const config = require("../../../Config");
		const systemInformation = require("../../../helper/SystemInformation");
		const messageHandler = require("../../../helper/MessageHandler");
		const local = config[process.env.NODE_ENV].backend.policy + "://" +
			config[process.env.NODE_ENV].backend.host + ":" +
			config[process.env.NODE_ENV].backend.port;

		// get date
		if (req.body.YM && req.body.YM.search(/[0-9][0-9][0-9][0-9]\/[0-1][0-9]/) !== -1) {

			// request
			const ym = req.body.YM.split("/");
			const result = await axios.post(local + "/api/cust/custodian/statement_report", {
				"data": {
					"account": req.user_profile.user,
					"year": ym[0],
					"month": ym[1],
				},
				"requester": req.user_profile.user,
				"token": req.cookies.access_token,
				"system": "CustodianCustWeb",
			});

			// send file back
			res.set("Content-Type", "application/pdf; charset=utf-8");
			res.set("Content-Disposition", "inline; filename=download.pdf");
			res.set("Content-Length", new Buffer(result.data.data).length);
			res.send(new Buffer(result.data.data));
		}
		else {
			//show message
			require("../../../helper/Utility").showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_DATE")); //[TODO]

			//show page
			res.render("S001_custodian/C002_data_download/F001_monthly_statement_download", {
				"title": systemInformation.getSystemTitle(),
				"page_title": systemInformation.getPageTitle(req.originalUrl),
				"user_profile": req.user_profile,
				"auth": systemInformation.getPageAuth(req.user_profile.permission_list, req.originalUrl),
			});
		}

	} catch (e) { next(e); }
};