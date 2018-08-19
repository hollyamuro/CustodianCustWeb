/**
 * 共用函式之controller
 * @module controllers/HelperController
 */

"use strict";

/**
 * 前端用取使用者資料
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.getUserData = async (req, res, next) => {

	// const systemInformation = require("../helper/SystemInformation");
	const debug = require("debug")("CustodianCustWeb:HelperController.getUserData");
	const config = require("../Config");
	const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
	const axios = require("axios");
    
	try{
		const JwtUserProfile = await axios.post(local + "/api/cust/jwtverify", {"data":{ "token": req.cookies.access_token,}});
		const Data = {
			"user":				JwtUserProfile.data.data.user,
			"user_name":		JwtUserProfile.data.data.user_name,
			"sino_account":		JwtUserProfile.data.data.sino_account,
			"dept":				JwtUserProfile.data.data.dept,
			"dept_name":		JwtUserProfile.data.data.dept_name,
		};

		res.send({ "code" : { "type": "INFO", "message":  "請求成功。", }, "data" : Data });

	}catch(e){
		debug(e.stack);
		next(e); 
	}
};


