/**
 * 使用者未登入忘記密碼之controllers
 * @module controllers/UserResetController
 */

"use strict";
/**
 * 忘記密碼輸入Email頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.init = (req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");

		res.render("password_reset", { 
			"title": systemInformation.getSystemTitle(),
			
		});
	}catch(e){
		next(e); 
	}
};

/**
 * 忘記密碼驗證Email與帳戶ID頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.send = async (req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");
		const debug = require("debug")("CustodianCustWeb:UserResetController.send");
		const config = require("../Config");
		const axios = require("axios");
		const utility = require ("../helper/Utility");
		const messageHandler = require("../helper/MessageHandler");
		
		//let requester_ip = await utility.getUserIP();
		let requester_ip= req.headers["x-real-ip"] || req.connection.remoteAddress || req.socket.remoteAddress ||(req.connection.socket ? req.connection.socket.remoteAddress : null);
		let isInputDataVaild = await utility.checkInputData(req.body);
		if(isInputDataVaild){
			const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
			const PostData = { "data":{"account":req.body.UserID, "useremail" :req.body.UserEmail}, "requester":requester_ip, "token": req.cookies.access_token,"system": "CustodianCustWeb",};
			const result = await axios.post(local + "/api/staff/custs/reset_password",PostData);
			debug(result.data);

			switch(result.data.code.type){
			case "INFO":
				utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("INFO_ACCOUNT_SUCCESS"));
				res.clearCookie("access_token");
				res.render("password_reset_send_success", { 
					"title": systemInformation.getSystemTitle(),
				});
				break;			
			case "ERROR":
				utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_ACCOUNT_NOT_EXISTED"));	
				res.render("password_reset_fail",  { 
					"title": systemInformation.getSystemTitle(),
				});
				break;
			default:
					
				break;
			}
		}else{
			utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_INPUT_DATA"));
			
			res.render("password_reset", { 
				"title": systemInformation.getSystemTitle(),
				
			});
		}
	}catch(e){  
		next(e); 
	}
};

/**
 * 忘記密碼url頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.reset_init = async(req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");
		const debug = require("debug")("CustodianCustWeb:UserResetController.reset_init");
		const utility = require ("../helper/Utility");
		const user_type={bank:"S",normal:"C"};
		const axios = require("axios");
		const config = require("../Config");
		const messageHandler = require("../helper/MessageHandler");
		const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
		
		//let requester_ip = await utility.getUserIP();
		let requester_ip= req.headers["x-real-ip"] || req.connection.remoteAddress || req.socket.remoteAddress ||(req.connection.socket ? req.connection.socket.remoteAddress : null);
		const UrlOri = req.originalUrl;
		const UrlUUID = (UrlOri.split("?")[0]).split("=")[1];
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

		const PostData = { "data":{"type" : "reset_url", "token" :UrlUUID},"requester":requester_ip, "token": req.cookies.access_token,"system": "CustodianCustWeb",};
		const result = await axios.post(local + "/api/cust/url_check",PostData);
		debug(result.data);

		switch(result.data.code.type){ 
		case "INFO":
			res.render("email_verify", { 
				"title": systemInformation.getSystemTitle(),
				"type": "reset_url",
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
		const debug = require("debug")("CustodianCustWeb:UserResetController.verify_code_init");
		const messageHandler = require("../helper/MessageHandler");
		debug(req.body);
		utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("INFO_EMAIL_SUCCESS"));
		res.render("code_verify", {
			"title": 		systemInformation.getSystemTitle(),
			"type": 		"reset_url",
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
		const debug = require("debug")("CustodianCustWeb:UserResetController.email_fail_init");
		const messageHandler = require("../helper/MessageHandler");
		debug(req.body);
		utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_EMAIL_FAIL"));
		res.render("email_verify", {
			"title": 		systemInformation.getSystemTitle(),
			"type": 		"reset_url",
		});

	}catch(e){ next(e); }
};

/**
 * 忘記密碼驗證email頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.verify_email = async (req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");
		const debug = require("debug")("CustodianCustWeb:UserResetController.verify_email");
		const config = require("../Config");
		const utility = require ("../helper/Utility");
		const axios = require("axios");
		const messageHandler = require("../helper/MessageHandler");
		const user_type={bank:"S",normal:"C"};
		//let requester_ip = await utility.getUserIP();
		let requester_ip= req.headers["x-real-ip"] || req.connection.remoteAddress || req.socket.remoteAddress ||(req.connection.socket ? req.connection.socket.remoteAddress : null);
		let isInputDataVaild = await utility.checkInputData(req.body);
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
		if(isInputDataVaild){
			const UrlOri = req.headers.referer;
			const UrlUUID = (UrlOri.split("?")[0]).split("=")[1];
			let  EmailUrl = "/verify_reset=" + UrlUUID;
			const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
			const PostData = { "data":{"useremail": req.body.UserEmail, "token":UrlUUID, "type":"reset_url"},"requester":requester_ip, "token": req.cookies.access_token,"system": "CustodianCustWeb",};
			const result = await axios.post(local + "/api/cust/matching",PostData);
			debug(result.data);

			switch(result.data.code.type){
			case "INFO":
				utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("INFO_EMAIL_SUCCESS")); 
				res.render("next_vcode", {
					"title": 		systemInformation.getSystemTitle(),
					"UserEmail":	req.body.UserEmail,
					"type": 	"reset_url",
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
						"EmailUrl": 	EmailUrl,

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
 * 忘記密碼驗證verify code頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.verify_code = async (req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");
		const debug = require("debug")("CustodianCustWeb:UserResetController.verify_code");
		const config = require("../Config");
		const user_type={bank:"S",normal:"C"};
		const utility = require ("../helper/Utility");
		const axios = require("axios");
		const messageHandler = require("../helper/MessageHandler");

		//let requester_ip = await utility.getUserIP();
		let requester_ip= req.headers["x-real-ip"] || req.connection.remoteAddress || req.socket.remoteAddress ||(req.connection.socket ? req.connection.socket.remoteAddress : null);

		let isInputDataVaild = await utility.checkInputData(req.body);
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

		if(isInputDataVaild){
			const UrlOri = req.originalUrl;
			const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
			const PostData={"data":{"useremail":req.body.UserEmail, "verifycode":req.body.VerifyCode, "type":"reset_url", }, "requester":requester_ip, "token": req.cookies.access_token,"system": "CustodianCustWeb",};
			const result = await axios.post(local + "/api/cust/verify",PostData);
			debug(result.data);
			let PwResetUrl = "/reset_change=" + result.data.data.token;

			switch(result.data.code.type){
			case "INFO":
				utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("INFO_VERIFYCODE_SUCCESS")); 
				res.render("password_reset_url", { 
					"title": 	systemInformation.getSystemTitle(),
					"requrl": 	PwResetUrl,
					"type": 	"reset_url",
					"verifycode":req.body.VerifyCode,
				});
				break;			
			case "ERROR":
				
				if(result.data.code.message === "所提供的信箱驗證碼錯誤次數累計三次以上，需要重寄邀請信。"){
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
						"title": 		systemInformation.getSystemTitle(),
						"UserEmail": 	req.body.UserEmail,
						"requrl": 		UrlOri,
						"type": 		"reset_url",
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
 * 忘記密碼url輸入驗證碼與密碼頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.change = async (req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");
		const debug = require("debug")("CustodianCustWeb:UserResetController.change");
		const config = require("../Config");
		const axios = require("axios");
		const utility = require ("../helper/Utility");
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
			const UrlOri = req.originalUrl;
			const UrlUUID = (UrlOri.split("?")[0]).split("=")[1];
		
			const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
			const PostData = { "data":{"token": UrlUUID, "verifycode": req.body.VerifyCode, "password": req.body.Password}, "requester":requester_ip, "token": req.cookies.access_token,"system": "CustodianCustWeb",};
			const result = await axios.post(local + "/api/cust/verify_password ",PostData);
			debug(result.data);

			switch(result.data.code.type){
			case "INFO":
				utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("INFO_SET_PASSWORD_SUCCESS"));
				res.clearCookie("access_token");
				res.render("password_reset_url_success", { 
					"title":	systemInformation.getSystemTitle(),
					"type": 	req.body.Type,

				});
				break;			
			case "ERROR":
				utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_RESET_PASSWORD_FAIL"));	
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