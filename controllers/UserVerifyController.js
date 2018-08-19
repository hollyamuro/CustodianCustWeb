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
		const user_type={bank:"S",normal:"C"};
		const utility = require ("../helper/Utility");
		const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
	
		let requester_ip = await utility.getUserIP();
		const UrlOri = req.originalUrl;
		const UrlUUID = (UrlOri.split("?")[0]).split("=")[1];
		const PostData = { "data":{"type" : "url", "token" :UrlUUID},"requester":requester_ip};
		debug (PostData);
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
			utility.showAlterEJSHandler(req, res, { type:"ERROR", message:result.data.code.message, });
			res.render("home",  { 
				"title": systemInformation.getSystemTitle(),
				"page_title": "",
				"user_type": user_type,
				"user_profile": {
					"login": false,
					"user": 			"",
					"user_name": 		"",
					"type":				"",
					"sino_account":		"",
					"permission_list":	[],
					"product_list":		[],
					"role_list":		[],
					"system":			"",
				},
			});
			break;
		default:
			break;
		}

	}catch(e){ next(e); }
};

/**
 * verify頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.send_init = async(req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");
		const debug = require("debug")("CustodianCustWeb:UserVerifyController.verify_init");
		const axios = require("axios");
		const config = require("../Config");
		const user_type={bank:"S",normal:"C"};
		const utility = require ("../helper/Utility");
		const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
	
		let requester_ip = await utility.getUserIP();
		const UrlOri = req.originalUrl;
		const UrlUUID = (UrlOri.split("?")[0]).split("=")[1];
		const PostData = { "data":{"type" : "url", "token" :UrlUUID},"requester":requester_ip};
		debug (PostData);
		const result = await axios.post(local + "/api/cust/url_check",PostData);
		debug(result.data);

	

		res.render("email_verify", { 
			"title": systemInformation.getSystemTitle(),
			"requrl": UrlOri,
			"type": "url",
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
		const user_type={bank:"S",normal:"C"};
	
		let requester_ip = await utility.getUserIP();
		let isInputDataVaild = await utility.checkInputData(req.body);

		if(isInputDataVaild){
			debug(req.type);
			debug("IP: " + requester_ip);
			// const UrlOri0 = req.originalUrl;
			// debug(UrlOri0);
			const UrlOri = req.headers.referer;
			debug(UrlOri);
			const UrlUUID = (UrlOri.split("?")[0]).split("=")[1];
			let  VerifyUrl = "/verify=" + UrlUUID;
			debug(VerifyUrl);
			const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
			const PostData = { "data":{"useremail": req.body.UserEmail, "token":UrlUUID, "type":"url"},"requester":requester_ip};
			debug (PostData);
			const result = await axios.post(local + "/api/cust/matching",PostData);
			debug(result.data);

			switch(result.data.code.type){
			case "INFO":
				utility.showAlterEJSHandler(req, res, { type:"INFO", message:result.data.code.message, });
				res.render("code_verify", { 
					"title": systemInformation.getSystemTitle(),
					"UserEmail":PostData.data.useremail,
					"type": "url",
				});
				// res.redirect("/verify/send");
				break;			
			case "ERROR":
				utility.showAlterEJSHandler(req, res, { type:"ERROR", message:result.data.code.message, });
				// res.render("email_verify", { 
				// 	"title": systemInformation.getSystemTitle(),
				// 	"requrl": UrlOri,
				// 	"type": "url",
				// });
				res.redirect(VerifyUrl);
				// res.render("password_reset_email_fail",  { 
				// 	"title": systemInformation.getSystemTitle(),
				// 	"message":result.data.code.message,
				// });
				break;
			default:
					
				break;
			}
		}else{
			utility.showAlterEJSHandler(req, res, { type:"ERROR", message:"資料格式錯誤，請重新開始帳戶認證流程", });	
			res.render("home",  { 
				"title": systemInformation.getSystemTitle(),
				"page_title": "",
				"user_type": user_type,
				"user_profile": {
					"login": false,
					"user": 			"",
					"user_name": 		"",
					"type":				"",
					"sino_account":		"",
					"permission_list":	[],
					"product_list":		[],
					"role_list":		[],
					"system":			"", 
				},
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
		const user_type={bank:"S",normal:"C"};
		const utility = require ("../helper/Utility");
		const axios = require("axios");
		
		let requester_ip = await utility.getUserIP();
		let isInputDataVaild = await utility.checkInputData(req.body);

		if(isInputDataVaild){
			const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
			const PostData={"data":{"useremail":req.body.UserEmail, "verifycode":req.body.VerifyCode, "type":"url", }, "requester":requester_ip};
			debug (PostData);
			const result = await axios.post(local + "/api/cust/verify",PostData);
			debug(result.data);
			let PwResetUrl = "/reset_change=" + result.data.data.token;

			switch(result.data.code.type){
			case "INFO":
				utility.showAlterEJSHandler(req, res, { type:"INFO", message:result.data.code.message, }); 
				res.render("password_reset_url", { 
					"title": 	systemInformation.getSystemTitle(),
					"requrl": 	PwResetUrl,
					"type": 	"url",
					"verifycode":req.body.VerifyCode,
				});
				break;			
			case "ERROR":
				utility.showAlterEJSHandler(req, res, { type:"ERROR", message:result.data.code.message, });
				if(result.data.data === "所提供的信箱驗證錯誤次數累計三次以上，需要重寄邀請信。"){
					res.render("home",  { 
						"title": systemInformation.getSystemTitle(),
						"page_title": "",
						"user_type": user_type,
						"user_profile": {
							"login": false,
							"user": 			"",
							"user_name": 		"",
							"type":				"",
							"sino_account":		"",
							"permission_list":	[],
							"product_list":		[],
							"role_list":		[],
							"system":			"", 
						},
					});
				}else{
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
			utility.showAlterEJSHandler(req, res, { type:"ERROR", message:"資料格式錯誤，請重新開始帳戶認證流程", });	
			res.render("home",  { 
				"title": systemInformation.getSystemTitle(),
				"page_title": "",
				"user_type": user_type,
				"user_profile": {
					"login": false,
					"user": 			"",
					"user_name": 		"",
					"type":				"",
					"sino_account":		"",
					"permission_list":	[],
					"product_list":		[],
					"role_list":		[],
					"system":			"", 
				},
			});	
		}

	}catch(e){ 
		next(e); 
	}
};