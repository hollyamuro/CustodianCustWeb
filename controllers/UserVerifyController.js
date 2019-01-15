/**
 * 使用者驗證之controllers
 * @module controllers/UserVerifyController
 */

"use strict";

/**
 * verify頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.init = async(req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");
		const debug = require("debug")("CustodianCustWeb:UserVerifyController.verify_init");
		const axios = require("axios");
		const config = require("../Config");
		const messageHandler = require("../helper/MessageHandler");
		const user_type={bank:"S",normal:"C"};
		let user_profile = {
			"login": false,
			"user": 			"",
			"user_name": 		"",
			"type":				"",
			"sino_account":		"",
			"permission_list":	[],
			"product_list":		[],
			"role_list":		[],
			"system":			"", 
		};
		const utility = require ("../helper/Utility");
		const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
	
		//let requester_ip = await utility.getUserIP();
		let requester_ip= req.headers["x-real-ip"] || req.connection.remoteAddress || req.socket.remoteAddress ||(req.connection.socket ? req.connection.socket.remoteAddress : null);
		
		const UrlOri = req.originalUrl;
		const UrlUUID = (UrlOri.split("?")[0]).split("=")[1];
		const PostData = { "data":{"type" : "url", "token" :UrlUUID},"requester":requester_ip, "token": req.cookies.access_token};
		const result = await axios.post(local + "/api/cust/url_check",PostData);
		debug(result.data);

		switch(result.data.code.type){ 
		case "INFO":
			res.render("email_verify", { 
				"title": systemInformation.getSystemTitle(),
				"requrl": UrlOri,
				"type": "url",
			});
			break;			
		case "ERROR":
			utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_URL_NOT_FOUND")); 
			res.render("home",  { 
				"title": systemInformation.getSystemTitle(),
				"page_title": "",
				"user_type": user_type,
				"user_profile": user_profile,
				
			});
			break;
		default:
			break;
		}

	}catch(e){ next(e); }
};

/**
 * 驗證碼頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.verify_code_init = async(req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");
		const utility = require ("../helper/Utility");
		const debug = require("debug")("CustodianCustWeb:UserVerifyController.verify_code_init");
		const messageHandler = require("../helper/MessageHandler");
		debug(req.body);
		utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("INFO_EMAIL_SUCCESS"));
		res.render("code_verify", {
			"title": 		systemInformation.getSystemTitle(),
			"type": 		"url",
			"UserEmail":	req.body.UserEmail,
		});

	}catch(e){ next(e); }
};

/**
 * email錯誤頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.email_fail_init = async(req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");
		const utility = require ("../helper/Utility");
		const debug = require("debug")("CustodianCustWeb:UserVerifyController.email_fail_init");
		const messageHandler = require("../helper/MessageHandler");
		debug(req.body);
		utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_EMAIL_FAIL"));
		res.render("email_verify", {
			"title": 		systemInformation.getSystemTitle(),
			"type": 		"url",
		});

	}catch(e){ next(e); }
};

/**
 * 驗證Email頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.send = async (req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");
		const debug = require("debug")("CustodianCustWeb:UserVerifyController.send");
		const config = require("../Config");
		const utility = require ("../helper/Utility");
		const axios = require("axios");
		const messageHandler = require("../helper/MessageHandler");
		const user_type={bank:"S",normal:"C"};
		let user_profile = {
			"login": false,
			"user": 			"",
			"user_name": 		"",
			"type":				"",
			"sino_account":		"",
			"permission_list":	[],
			"product_list":		[],
			"role_list":		[],
			"system":			"", 
		};
	
		//let requester_ip = await utility.getUserIP();
		let requester_ip= req.headers["x-real-ip"] || req.connection.remoteAddress || req.socket.remoteAddress ||(req.connection.socket ? req.connection.socket.remoteAddress : null);

		let isInputDataVaild = await utility.checkInputData(req.body);

		if(isInputDataVaild){
			const UrlOri = req.headers.referer;
			const UrlUUID = (UrlOri.split("?")[0]).split("=")[1];
			let  VerifyUrl = "/verify=" + UrlUUID;
			const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
			const PostData = { "data":{"useremail": req.body.UserEmail, "token":UrlUUID, "type":"url"},"requester":requester_ip, "token": req.cookies.access_token,"system": "CustodianCustWeb",};
			const result = await axios.post(local + "/api/cust/matching",PostData);
			debug(result.data);

			switch(result.data.code.type){
			case "INFO":
				utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("INFO_EMAIL_SUCCESS")); 
				res.render("next_vcode", {
					"title": 		systemInformation.getSystemTitle(),
					"UserEmail":	req.body.UserEmail,
					"type": 	"url",
				});
				break;			
			case "ERROR":
				if(result.data.code.message === "所提供的URL/Mail已經匹配三次以上而失效，需要重寄邀請。"){
					utility.showAlterEJSHandler(req, res,  messageHandler.infoHandler("ERROR_EMAIL_URL_MATCH_THREE_TIME"));
					res.render("home",  { 
						"title": systemInformation.getSystemTitle(),
						"page_title": "",
						"user_type": user_type,
						"user_profile": user_profile,
					});
				}else{
					utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_EMAIL_FAIL"));
					res.render("email_fail", { 
						"title": systemInformation.getSystemTitle(),
						"EmailUrl": 	VerifyUrl,

					});
				}
				break;
			default:
					
				break;
			}
		}else{
			utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_INPUT_DATA"));	
			res.render("home",  { 
				"title": systemInformation.getSystemTitle(),
				"page_title": "",
				"user_type": user_type,
				"user_profile": user_profile,
			});
		}
			
	}catch(e){  
		next(e); 
	}
};

/**
 * 驗證verify code頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.verify = async (req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");
		const debug = require("debug")("CustodianCustWeb:UserVerifyController.verify");
		const config = require("../Config");
		const messageHandler = require("../helper/MessageHandler");
		const user_type={bank:"S",normal:"C"};
		let user_profile = {
			"login": false,
			"user": 			"",
			"user_name": 		"",
			"type":				"",
			"sino_account":		"",
			"permission_list":	[],
			"product_list":		[],
			"role_list":		[],
			"system":			"",
		};
		const utility = require ("../helper/Utility");
		const axios = require("axios");
		
		//let requester_ip = await utility.getUserIP();
		let requester_ip= req.headers["x-real-ip"] || req.connection.remoteAddress || req.socket.remoteAddress ||(req.connection.socket ? req.connection.socket.remoteAddress : null);

		let isInputDataVaild = await utility.checkInputData(req.body);

		if(isInputDataVaild){
			const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
			const PostData={"data":{"useremail":req.body.UserEmail, "verifycode":req.body.VerifyCode, "type":"url", }, "requester":requester_ip, "system": "CustodianCustWeb",};
			const result = await axios.post(local + "/api/cust/verify",PostData);
			debug(result.data);
			let PwResetUrl = "/reset_change=" + result.data.data.token;

			switch(result.data.code.type){
			case "INFO":
				utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("INFO_VERIFYCODE_SUCCESS")); 
				res.render("password_reset_url", { 
					"title": 	systemInformation.getSystemTitle(),
					"requrl": 	PwResetUrl,
					"type": 	"url",
					"verifycode":req.body.VerifyCode,
				});
				break;			
			case "ERROR":
				if(result.data.data === "所提供的信箱驗證錯誤次數累計三次以上，需要重寄邀請信。"){
					utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_EMAIL_URL_MATCH_THREE_TIME"));
					res.render("home",  { 
						"title": systemInformation.getSystemTitle(),
						"page_title": "",
						"user_type": user_type,
						"user_profile": user_profile,
					});
				}else{
					utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_VERIFYCODE_FAIL"));
					res.render("code_verify", { 
						"title": systemInformation.getSystemTitle(),
						"UserEmail": req.body.UserEmail,
						"type": "url",
					});
				}
				break;
			default:
					
				break;
			}
		}else{
			utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_INPUT_DATA"));	
			res.render("home",  { 
				"title": systemInformation.getSystemTitle(),
				"page_title": "",
				"user_type": user_type,
				"user_profile": user_profile,
			});	
		}

	}catch(e){ 
		next(e); 
	}
};