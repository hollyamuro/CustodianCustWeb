/**
 * 系統主體架構之controllers
 * @module controllers/SystemFrameController
 */

"use strict";

/**
 * 客戶端登入 呼叫/api/cust/login
 * @param  {} req {"account":"XXXXX","password":"xxxxx","user_type":"S/C","g-recaptcha":"google_recaptcha verify token"}
 * @param  {} res render畫面
 * @param  {} next
 */
module.exports.login = async (req, res, next) => {
	try{
		const debug = require("debug")("CustodianCustWeb:systmeFrameRouteController.login");
		const user_type={bank:"S",normal:"C"};
		const axios = require("axios");
		const utility = require("../helper/Utility");
		const config = require("../Config");
		const messageHandler = require("../helper/MessageHandler");
		const systemInformation = require("../helper/SystemInformation");
		//get user ip
		//let user_ip = await utility.getUserIP();
		let user_ip= req.headers["x-real-ip"] || req.connection.remoteAddress || req.socket.remoteAddress ||(req.connection.socket ? req.connection.socket.remoteAddress : null);
		debug(user_ip+ " type = "+req.body.user_type);
		const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
		if(req.body["g-recaptcha-response"] === "")
		{
			utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("WARN_GOOGLE_VERIFY"));
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
			debug("*** / POST REQ login:\n" +req.body.account +" "+req.body.password+" "+req.body.user_type+" "+req.body["g-recaptcha-response"]);
			if((req.body.user_type===undefined) || (req.body.user_type===""))
			{
				debug("*** / POST REQ login user type not selected!!!");
			}
			// check google token
			const humanCheck = await axios.post("https://www.google.com/recaptcha/api/siteverify?secret=6LcIUGEUAAAAADhZJN7OcfJtBUisRh1TP7L8qeQX&response="+req.body["g-recaptcha-response"]+"&remoteip="+user_ip);
			if(typeof(humanCheck)!=undefined && humanCheck.success==false)
			{
				debug("機器人認證失敗");
				/* show popups */
				utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("ERROR_RACAPTCHA_CHECK_FAIL")); 
			}
			// get new data( Cust login):
			const [user_profile, ] = await axios.all([ 
				axios.post(local + "/api/cust/login", { 
					"data": { "account": req.body.account, "password": req.body.password, "type": req.body.user_type, "googletoken":req.body["g-recaptcha-response"],},
					"requester": user_ip,
					"token": req.cookies.access_token,
					"system": "CustodianCustWeb",
				}), 
			]);

			if(user_profile.data.code.type==="ERROR")
			{
				utility.showAlterEJSHandler(req, res, user_profile.data.code); 
				/* set login fail */
				req.user_profile = {
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
									
				res.render("home", { 
					"title": systemInformation.getSystemTitle(),
					"page_title": "",
					"user_type":user_type,
					"user_profile" : req.user_profile
				});
			}
			else if(user_profile.data.data.system === "CustodianCustWeb")
			{
				/* show result */
				utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("INFO_LOGIN_SUCCESS"));
				/* set access token in cookie */
				const token = user_profile.data.data.access_token;
				res.cookie("access_token", token, {
					httpOnly: config[process.env.NODE_ENV].cookie.httpOnly, 
					secure: config[process.env.NODE_ENV].cookie.secure
				});
				/* set login success */
				req.user_profile = {
					"login": 			true,
					"user": 			user_profile.data.data.user,
					"user_name": 		user_profile.data.data.user_name,
					"type":				user_profile.data.data.type,
					"sino_account":		user_profile.data.data.sino_account,
					"permission_list":	utility.getNavbarPermission(user_profile.data.data.permission_list),
					"product_list":		user_profile.data.data.product_list,
					"role_list":		user_profile.data.data.role_list,
					"system":			user_profile.data.data.system,
				};
											
				// //render page
				// res.render("home", { 
				// 	"title": systemInformation.getSystemTitle(),
				// 	"page_title": "",
				// 	"user_type":user_type,
				// 	"user_profile" : req.user_profile
				// });

				//res.redirect("/dashboard");
				debug(req.user_profile);
				res.render("dashboard", { 
					"title": systemInformation.getSystemTitle(),
					"page_title": "Dashboard",
					"user_profile" : req.user_profile,
				});
				
			}else{
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
		}  
	}catch(e){ next(e); }
};

/**
 * 登出controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.logout = (req, res, next) => {

	try{
		const user_type={bank:"S",normal:"C"};
		const systemInformation = require("../helper/SystemInformation");
		const utility = require ("../helper/Utility");
		const messageHandler = require("../helper/MessageHandler");
		
		/* clean token */

		res.clearCookie("access_token");
		/* show popups */
		utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("INFO_LOGOUT_SUCCESS"));

		/* redirect to home */
		res.render("home",  { 
			"title": systemInformation.getSystemTitle(),
			"page_title": "",
			"user_type":user_type,
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
	}catch(e){ next(e); }   
};

/**
 * 登出controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.timeout = (req, res, next) => {

	try{
		const user_type={bank:"S",normal:"C"};
		const systemInformation = require("../helper/SystemInformation");
		const utility = require ("../helper/Utility");
		const debug = require("debug")("CustodianCustWeb:systmeFrameRouteController.timeout");
		const messageHandler = require("../helper/MessageHandler");
		debug("timeout");
		/* clean token */

		res.clearCookie("access_token");

		/* show popups */
		utility.showAlterEJSHandler(req, res, messageHandler.infoHandler("INFO_TIMEOUT"));

		/* redirect to home */
		res.render("home",  { 
			"title": systemInformation.getSystemTitle(),
			"page_title": "",
			"user_type":user_type,
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
	}catch(e){ next(e); }   
};

/**
 * 主頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.home = (req, res, next) => {
	try{
		const debug = require("debug")("CustodianCustWeb:systmeFrameRouteController.home");
		const user_type={bank:"S",normal:"C"};
		const systemInformation = require("../helper/SystemInformation");
	
		debug("*** / POST REQ Home");
		if(req.user_profile!=undefined && req.user_profile.login)
		{
			//res.redirect("/dashboard");
			res.render("dashboard", { 
				"title": systemInformation.getSystemTitle(),
				"page_title": "Dashboard",
				"user_profile" : req.user_profile,
			});
		}
		else
		{
			res.render("home", { 
				"title": systemInformation.getSystemTitle(),
				"page_title": "",
				"user_type":user_type,
				"user_profile" : req.user_profile
			});
		}
	}catch(e){ next(e); }
};