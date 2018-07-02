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

	const debug = require("debug")("CustodianWeb:Auth");
	const systemInformation = require("../helper/SystemInformation");
	const utility = require ("../helper/Utility");

	try{
		const axios = require("axios");
		const config = require("../Config");
		const skipAuthUrls = require("./UrlPolicy");
		let requestUrl = req.url.split("?")[0];
		const local = config[process.env.NODE_ENV].backend.policy + "://" + config[process.env.NODE_ENV].backend.host + ":" + config[process.env.NODE_ENV].backend.port;

		//create a user profile
		if(!req.hasOwnProperty("user_profile")){
			req.user_profile = {
				"login": 		false,
				"user": 		"",
				"user_name": 	"",
				"dept": 		"",
				"dept_name": 	"",
				"permission":	[],
			};
		}

		debug("*** FULL URL:" + req.protocol + "://" + req.get("host") + req.originalUrl );
		debug("*** Access URL:" + requestUrl);

		const jwt_user_profile = await axios.post(local + "/api/staff/users/verify", { "token": req.cookies.access_token});
		req.user_profile = {
			"login": jwt_user_profile.data.data.login,
			"user": jwt_user_profile.data.data.user,
			"user_name": jwt_user_profile.data.data.user_name,
			"dept": jwt_user_profile.data.data.dept,
			"dept_name": jwt_user_profile.data.data.dept_name,
			"permission": utility.getNavbarPermission(jwt_user_profile.data.data.permission_list),
		};

		if(!req.cookies.access_token){
			//[TODO] Need check token exist or not?
			next(); /*passed*/
		}
		else if(!jwt_user_profile.data.data.login){
			/* Check the url needs auth or not */
			if(skipAuthUrls.indexOf(requestUrl) > -1){   
				next(); /*passed*/
			}
			else{ /* Not Login and redirect to home */
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
			}
		}
		else{
			switch(jwt_user_profile.data.code.type){
				case "INFO":
					debug("Login !!!!")
					///Update login info for UI
					if(skipAuthUrls.indexOf(requestUrl) > -1){
						next(); /*passed*/
					}
					else if(requestUrl.substring(0, 7) === "/helper"){
						next(); /*passed*/
					}
					/* other helper add here... */
					else{
						/* check permission here */
						let permission = req.user_profile.permission;
						let sys = requestUrl.substring(1, 5);
						let dir = requestUrl.substring(5, 9);
						let fun = requestUrl.substring(9, 13);
						
						if( permission.hasOwnProperty(sys) &&
							permission[sys].hasOwnProperty(dir) &&
							permission[sys][dir].hasOwnProperty(fun) ){
							next(); /*passed*/
						}
						else{
							res.redirect("/");  /* no permission */
						}
					}
					break;
							
				case "ERROR":
					debug("ERROR ")
				default:
					req.user_profile = {
						"login": false,
						"user": "",
						"user_name": "",
						"dept": "",
						"dept_name": "",
						"permission": [],
					};
					res.render("home", { 
						"title": systemInformation.getSystemTitle(),
						"page_title": "",
						"user_profile" : req.user_profile
					});
					debug("ERROR !!!!")
					break;
				}
		}

	}catch(err){
		debug(err);
		next(err);
	}
};
