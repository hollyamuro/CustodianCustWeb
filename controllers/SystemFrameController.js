/**
 * 系統主體架構之controllers
 * @module controllers/SystemFrameController
 */

"use strict";

/**
 * 登入
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports.login = async (req, res, next) => {

	try{
		const axios = require("axios");
		const utility = require("../helper/Utility");
		const config = require("../Config");
		const systemInformation = require("../helper/SystemInformation");
		const error =  require("../helper/CustodianCustWebError");
	
		const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;
		
		// get new data:
		const [user_profile, ] = await axios.all([ 
			axios.post(local + "/api/staff/users/login", { "data": { "account": req.body.account, "password": req.body.password, } }), 
		]);
		// show result
		utility.showAlterEJSHandler(req, res, user_profile.data.code);

		// show page
		switch(user_profile.data.code.type){
		case "INFO":
			//set access token in cookie
			const token = user_profile.data.data.access_token;
			res.cookie('access_token', token, {
				httpOnly: true,
				secure: true
			});
				
			//set login success
			req.user_profile = {
				"login": true,
				"user": user_profile.data.data.user,
				"user_name": user_profile.data.data.user_name,
				"dept": user_profile.data.data.dept,
				"dept_name": user_profile.data.data.dept_name,
				"permission": utility.getNavbarPermission(user_profile.data.data.permission_list),
			};
										
			//render page
			res.render("home", { 
				"title": systemInformation.getSystemTitle(),
				"page_title": "",
				"user_profile" : req.user_profile
			});
			break;
					
		case "ERROR":
		default:
			// set login fail
			req.user_profile = {
				"login": false,
				"user": "",
				"user_name": "",
				"dept": "",
				"dept_name": "",
				"permission": [],
			};
								
			// pages
			res.render("home", { 
				"title": systemInformation.getSystemTitle(),
				"page_title": "",
				"user_profile" : req.user_profile
			});
			break;
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
		const systemInformation = require("../helper/SystemInformation");
		const utility = require ("../helper/Utility");
		
		/* delete session data */
		req.session.destroy();
		res.cookie("access_token","");	// clean token

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
		const systemInformation = require("../helper/SystemInformation");
		res.render("home", { 
			"title": systemInformation.getSystemTitle(),
			"page_title": "",
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
			"user_profile" : req.user_profile
		});
	}catch(e){ next(e); }
};