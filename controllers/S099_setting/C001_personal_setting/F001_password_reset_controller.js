/**
 * 使用者登入重新設定密碼之controllers
 * @module controllers/S099_setting/C001_personal_setting/F001_password_reset_controller
 */

"use strict";

/**
 * F001_password_reset頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.init = function(req, res, next) {

	// const message_handler = require("../../../helper/message_handler");        
	// const debug = require("debug")("CustodianCustWeb:F001_password_reset_controller.init");
	const systemInformation = require("../../../helper/SystemInformation");

	try{
		res.render("S099_setting/C001_personal_setting/F001_password_reset", { 
			"title": systemInformation.getSystemTitle(),
			"page_title": systemInformation.getPageTitle(req.originalUrl),
			"user_profile" : req.user_profile
		});

	}catch(e){
		next(e);
	}

};

/**
 * F001_password_reset重設密碼controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.send = async(req, res, next) =>{
	try{
		// const message_handler = require("../../../helper/message_handler");        
		const debug = require("debug")("CustodianCustWeb:F001_password_reset_controller.send");
		const systemInformation = require("../../../helper/SystemInformation");
		const config = require("../../../Config");
		const utility = require ("../../../helper/Utility");
		const axios = require("axios");
		const Error = require("../../../helper/CustodianCustWebError");
		const messageHandler = require("../../../helper/MessageHandler");

		let isInputDataVaild = await utility.checkInputData(req.body);
		if(isInputDataVaild){
			const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
			const jwt_user_profile = await axios.post(local + "/api/cust/jwtverify", {
				"data":"",
				"requester":req.user_profile.user,
				"token": req.cookies.access_token,
				"system": "CustodianCustWeb",
			});
			debug(jwt_user_profile.data);
			const PostData = {  "data":  {
				"account"       : jwt_user_profile.data.data.user,
				"sinoaccount"   : jwt_user_profile.data.data.sino_account,
				"oldpassword"   : req.body.OldPassword,
				"newpassword"   : req.body.Password,
			},
			"requester":req.user_profile.user,
			"token": req.cookies.access_token,
			"system": "CustodianCustWeb", };
			debug (PostData);
			const result = await axios.post(local + "/api/cust/reset_password ",PostData);
			debug (result.data);

			switch(result.data.code.type){ 
			case "INFO":
				res.clearCookie("access_token");
				utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("INFO_RESET_PASSWORD_SUCCESS"));
				res.render("password_reset_success", { 
					"title": systemInformation.getSystemTitle(),
				});
				break;			
			case "ERROR":
				utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_RESET_PASSWORD_FAIL"));
				res.render("password_reset_fail",  { 
					"title": systemInformation.getSystemTitle(),
					"message": result.data.data,
				
				});
				break;
			default:
				break;
			}
		}else{
			throw new Error.BadRequest();
		}
	}catch(e){
		next(e); 
	}

};

