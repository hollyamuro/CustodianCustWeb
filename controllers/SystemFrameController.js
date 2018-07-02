/**
 * 系統主體架構之controllers
 * @module controllers/SystemFrameController
 * 
 * log: 20180627 009727 針對規格開發login 
 * 		改login/home，增加user_type，發送給後台API的json物件追加登入腳色資料
 */

"use strict";

/**
 * 登入
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.login = (req, res, next) => {
	try{
		const debug = require("debug")("CustodianCustWeb:systmeFrameRouteController");
		const user_type={bank:"bank",normal:"normal"};
		const utility = require("../helper/Utility");
		const config = require("../Config");
		const systemInformation = require("../helper/SystemInformation");
		const error =  require("../helper/CustodianCustWebError");

		debug("*** / POST REQ login:" +req.body.account +" "+req.body.password+" "+req.body.user_type);
		if(req.body.user_type===undefined)
		{
			debug("*** / POST REQ login user type not selected!!!");
		}

		const dataHandler = (data)=>{

			let obj = JSON.parse(data);
			switch(obj.code.type){
			case "INFO":
				//show popups
				utility.showAlterEJSHandler(req, res, obj.code);
				debug("*** / POST REQ callback login");
				//set login success
				req.session.user_profile = {
					"login": true,
					"user": obj.data.user,
					"user_name": obj.data.user_name,
					"dept": obj.data.dept,
					"dept_name": obj.data.dept_name,
					//"permission":obj.data.permission_list,
					"permission": utility.getNavbarPermission(obj.data.permission_list),
				};
										
				//render page
				res.render("home", { 
					"title": systemInformation.getSystemTitle(),
					"page_title": "",
					"user_profile" : req.session.user_profile,
					"user_type":user_type,
					"prev":user_type,
					"next":user_type
				});
				break;
					
			case "ERROR":
				//show popups
				utility.showAlterEJSHandler(req, res, obj.code);

				//set login fail
				req.session.user_profile = {
					"login": false,
					"user": "",
					"user_name": "",
					"dept": "",
					"dept_name": "",
					"permission": [],
				};
							
				//pages
				res.render("home", { 
					"title": systemInformation.getSystemTitle(),
					"page_title": "",
					"user_profile" : req.session.user_profile
				});
				break;
					
			default:
				next(new error.SignInFail());
			}  
		};

		const errorHandler = (e) => { next(new error.SignInFail()); };

		debug("*** / POST REQ SendRequest to API server");
		utility.sendRequestHandler(
			{
				policy: config[process.env.NODE_ENV].backend.policy,
				host:   config[process.env.NODE_ENV].backend.host,
				port:   config[process.env.NODE_ENV].backend.port,
				path:   "/",	//[TODO]
				method: "POST",
			},
			{ "account" : req.body.user, "password" : req.body.pwd,"user_type":req.body.user_type },
			req.body.user,
			dataHandler,
			errorHandler,
		);

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
		const user_type={bank:"bank",normal:"normal"};
		const systemInformation = require("../helper/SystemInformation");
		const utility = require ("../helper/Utility");

		/* delete session data */
		req.session.destroy();

		/* show popups */
		utility.showAlterEJSHandler(req, res, { type:"INFO", message:"登出成功", });

		/* redirect to home */
		res.render("home",  { 
			"title": systemInformation.getSystemTitle(),
			"page_title": "",
			"user_profile": {
				"login": false,
				"user": "",
				"user_name": "",
				"user_type":user_type,
				"dept": "",
				"dept_name": "",
				"permission": [], 
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
		const debug = require("debug")("CustodianCustWeb:systmeFrameRouteController");
		const user_type={bank:"bank",normal:"normal"};
		const systemInformation = require("../helper/SystemInformation");

		debug("*** / POST REQ Home");

		res.render("home", { 
			"title": systemInformation.getSystemTitle(),
			"page_title": "",
			"user_profile" : req.session.user_profile,
			"user_type":user_type,
			"prev":user_type,
			"next":user_type
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
			"user_profile" : req.session.user_profile
		});
	}catch(e){ next(e); }
};