/**
 * forever套件用相關共用功能
 * @module controllers/CommonMethod.js
 */

"use strict";

/**
 * 停止在forever下運行的服務
 * @param {String} keyword 服務名稱
 */
module.exports.killForeverPid = function(keyword) {
	
	const debug = require("debug")("CustodianCustWeb:CommonMethod.killForeverPid");
	const forever = require("forever");

	forever.list("", function(err, results) {
		if (results === "{}" || results === "undefined" || results === null) {
			debug("No Forever processing.");
			return;
		} else {
			results.forEach(function(element) {
				if (element.file.indexOf(keyword) > -1) {
					forever.cli.stop(element.pid);
				}
			});
		}
	});
};

/**
 * 當服務重新啟動時，發信通知。
 */
module.exports.foreverCheck = function() {

	const forever = require("forever");
	const debug = require("debug")("CustodianCustWeb:CommonMethod.foreverCheck");
	const config = require("../Config");
	const monitorConfig = require("../MonitorConfig");
	const axios = require("axios");

	let policy = (config[process.env.NODE_ENV].policy === "http") ? require("http") : require("https");
   
	const axiosRequest = axios.create({
		httpsAgent: new policy.Agent({
			//[TODO: need fix this issue in the future]
			rejectUnauthorized: false
		})
	});

	forever.list("", function(err, results) {
		let server_path =   config[process.env.NODE_ENV].IntegratedProxyService_api.policy + "://" + 
                            config[process.env.NODE_ENV].IntegratedProxyService_api.host + ":" + 
                            config[process.env.NODE_ENV].IntegratedProxyService_api.port;

		let mail_api_path = "/api/mail_controller/send";
		if (results === "{}" || results === "undefined" || results === null) {
			debug("No Forever processing.");
			return;
		} 
		else {
			results.forEach(element => {
				debug(element.id);
				if(element.id === "CustodianCustWeb"){
					debug(element.restarts);
					let restart_content = "Forever restart CustodianCustWeb script for " + element.restarts + " time. ";
					if (element.restarts > 0) {
						axiosRequest.post(server_path + mail_api_path, {
							receivers: monitorConfig[process.env.NODE_ENV].developers.mail,
							subject: "System is restarted with code. ",
							content: restart_content,
						})
							.then(function(response) {
								// debug(response);
							})
							.catch(function(error) {
								// debug(error);
							});
						debug("Forever restart CustodianCustWeb script for " + element.restarts + " time");
					}
				}
			});
		}
	});
};