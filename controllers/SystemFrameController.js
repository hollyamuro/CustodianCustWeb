/**
 * 系統主體架構之controllers
 * @module controllers/SystemFrameController
 * 
 * log: 20180627 009727 針對規格開發login 
 * 		改login/home，增加user_type，發送給後台API的json物件追加登入腳色資料
 * 
 */

"use strict";

/**
 * 客戶端登入 呼叫/api/cust/login
 * @param  {} req {"account":"XXXXX","password":"xxxxx","user_type":"S/C","g-recaptcha":"google_recaptcha verify token"}
 * @param  {} res render畫面
 * @param  {} next
 */
module.exports.login = async (req, res, next) => {
	// const debug = require("debug")("CustodianCustWeb:SystemFrameController.login");
	try{
		const debug = require("debug")("CustodianCustWeb:systmeFrameRouteController.login");
		const user_type={bank:"S",normal:"C"};
		const axios = require("axios");
		const utility = require("../helper/Utility");
		const config = require("../Config");
		const systemInformation = require("../helper/SystemInformation");
		// const error =  require("../helper/CustodianCustWebError");	
		//get user ip
		let user_ip = await utility.getUserIP();
		debug(user_ip+ " type = "+req.body.user_type);
		const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
		if(req.body["g-recaptcha-response"] === "")
		{
			utility.showAlterEJSHandler(req, res, { type:"WARN", message:"請先完成google圖形驗證", });
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
				utility.showAlterEJSHandler(req, res, { type:"ERROR", message:"機器人認證失敗。", });
			}
			// get new data( Cust login):
			const [user_profile, ] = await axios.all([ 
				axios.post(local + "/api/cust/login", { "data": { "account": req.body.account, "password": req.body.password, "type": req.body.user_type, "googletoken":req.body["g-recaptcha-response"],},"requester": user_ip}), 
			]);
			// debug(user_profile.data);
			// show page
			if(user_profile.data.code.type==="ERROR")
			{
				utility.showAlterEJSHandler(req, res, { type:"ERROR", message:user_profile.data.code.message,}); 
				// set login fail
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
									
				// pages
				res.render("home", { 
					"title": systemInformation.getSystemTitle(),
					"page_title": "",
					"user_type":user_type,
					"user_profile" : req.user_profile
				});
			}
			else if(user_profile.data.data.system === "CustodianCustWeb")
			{
				// show result
				utility.showAlterEJSHandler(req, res, user_profile.data.code);
				// set access token in cookie
				const token = user_profile.data.data.access_token;
				res.cookie("access_token", token, {
					httpOnly: true,
					secure: true
				});
				// debug(token);
				//set login success
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
				// debug(req.user_profile);
											
				// //render page
				// res.render("home", { 
				// 	"title": systemInformation.getSystemTitle(),
				// 	"page_title": "",
				// 	"user_type":user_type,
				// 	"user_profile" : req.user_profile
				// });

				res.redirect("/dashboard");
				
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
		
		/* clean token */
		res.cookie("access_token","");

		/* show popups */
		utility.showAlterEJSHandler(req, res, { type:"INFO", message:"登出成功。", });

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
		debug("timeout");
		/* clean token */
		res.cookie("access_token","");

		/* show popups */
		utility.showAlterEJSHandler(req, res, { type:"INFO", message:"操作逾時請重新登入。", });

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
		res.render("home", { 
			"title": systemInformation.getSystemTitle(),
			"page_title": "",
			"user_type":user_type,
			"user_profile" : req.user_profile
		});
	}catch(e){ next(e); }
};

/**
 * demo頁面controller
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.demo = (req, res, next) => {
	try{
		const systemInformation = require("../helper/SystemInformation");
		res.render("demo", { 
			"title": systemInformation.getSystemTitle(),
			"page_title": "",
			"user_profile" : req.user_profile,
			"verify":	true,
		});
	}catch(e){ next(e); }
};