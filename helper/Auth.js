/**
 * 系統權限控管
 * @module helper/Auth.js
 */

"use strict";

/**
 * 系統權限控管
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports = async (req, res, next) => {

	const debug = require("debug")("CustodianCustWeb:Auth");
	const systemInformation = require("../helper/SystemInformation");
	const utility = require ("../helper/Utility");
	const user_type={bank:"S",normal:"C"};

	try{
		const axios = require("axios");
		const config = require("../Config");
		const skipAuthUrls = require("./UrlPolicy");
		const requestUrl = req.url.split("?")[0];
		const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;

		//create a user profile
		if(!req.hasOwnProperty("user_profile")){
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
		}

		debug("*** FULL URL:" + req.protocol + "://" + req.get("host") + req.originalUrl );
		debug("*** Access URL:" + requestUrl);

		if(!req.cookies.access_token || !req.cookies.access_token === undefined){
			//[TODO] Need check token exist or not?
			if(skipAuthUrls.indexOf(requestUrl) > -1){
				next();
			}else if(requestUrl.substring(0,7) === "/verify"){
				next();
			}else if(requestUrl.substring(0,6) === "/reset"){
				next();
			}else{
				res.redirect("/");  
			}
		}
		else{
			const jwt_user_profile = await axios.post(local + "/api/cust/jwtverify", {"data":{ "token": req.cookies.access_token,}});
			const token = jwt_user_profile.data.data.access_token;
			res.cookie("access_token", token, {
				httpOnly: true,
				secure: true
			});
			switch(jwt_user_profile.data.code.type){
			case "INFO":
				if(jwt_user_profile.data.data.system === "CustodianCustWeb"){
					req.user_profile = {
						"login":			jwt_user_profile.data.data.login,
						"user": 			jwt_user_profile.data.data.user,
						"user_name": 		jwt_user_profile.data.data.user_name,
						"type":				jwt_user_profile.data.data.type,
						"sino_account":		jwt_user_profile.data.data.sino_account,
						"permission_list":	utility.getNavbarPermission(jwt_user_profile.data.data.permission_list),
						"product_list":		jwt_user_profile.data.data.product_list,
						"role_list":		jwt_user_profile.data.data.role_list,
						"system":			jwt_user_profile.data.data.system,
					};
					///Update login info for UI
					if(skipAuthUrls.indexOf(requestUrl) > -1){
						next();
					}
					else if(requestUrl.substring(0, 7) === "/verify"){
						next();
					}
					else if(requestUrl.substring(0,6) === "/reset"){
						next();
					}
					else if(requestUrl.substring(0, 7) === "/helper"){
						next();
					}
					else if(requestUrl.substring(0, "/dashboard".length ) === "/dashboard"){
						next();
					}
					/* other helper add here... */
					else{
						let permission = req.user_profile.permission_list;
						let sys = requestUrl.substring(1, 5);
						let dir = requestUrl.substring(5, 9);
						let fun = requestUrl.substring(9, 13);
	
						if( permission.hasOwnProperty(sys) &&
								permission[sys].hasOwnProperty(dir) &&
								permission[sys][dir].hasOwnProperty(fun) ){
							next(); 
						}
						else{
							res.redirect("/");
						}
					}
					break;
				}else{
					res.render("home",  { 
						"title": systemInformation.getSystemTitle(),
						"page_title": "",
						"user_type": user_type,
						"user_profile": req.user_profile,
					});
					break;
				}			
			case "ERROR":
				utility.showAlterEJSHandler(req, res, jwt_user_profile.data.code);
				res.cookie("access_token","");
				res.render("home",  { 
					"title": systemInformation.getSystemTitle(),
					"page_title": "",
					"user_type": user_type,
					"user_profile": req.user_profile,
				});
				break;
			default:
				res.cookie("access_token","");	
				res.render("home",  { 
					"title": systemInformation.getSystemTitle(),
					"page_title": "",
					"user_type": user_type,
					"user_profile":req.user_profile,
				});
				break;
			}
		}
	}catch(err){
		debug(err);
		next(err);
	}
};
