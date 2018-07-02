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
module.exports = function (req, res, next) {

	// const message_handler = require("../helper/message_handler");
	const debug = require("debug")("CustodianCustWeb:Auth");

	try{
		const skipAuthUrls = require("./UrlPolicy");
		let requestUrl = req.url.split("?")[0];

		/* create an empty user profile */
		if(!req.session.hasOwnProperty("user_profile")){
			req.session.user_profile = {
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
		debug("*** session:" + req.body.sid);   // for report

		if(req.body.sid){
			//[TODO] Need check sid is validate or not?
			next(); /*passed*/
		}
		else if(!req.session.user_profile.login){ /* Not login*/ 
			
			/* deal with react inner call here */
			// if(req.body.data){
			//  res.send({ 	"code": message_handler.error_handler(new Error("ERROR_TIMEOUT")), "data": [], });
			// }

			/* Check the url needs auth or not */
			if(skipAuthUrls.indexOf(requestUrl) > -1){   
				next(); /*passed*/
			}
			else{ /* Not Login and redirect to home */
				res.redirect("/");
			}
		}
		else{   /* Login */ 
			
			//Update login info for UI
			if(skipAuthUrls.indexOf(requestUrl) > -1){
				next(); /*passed*/
			}
			else if(requestUrl.substring(0, 7) === "/helper"){
				next(); /*passed*/
			}
			/* other helper add here... */
			else{

				/* check permission here */
				let permission =  req.session.user_profile.permission;
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
		}

	}catch(err){
		next(err);
	}
};
