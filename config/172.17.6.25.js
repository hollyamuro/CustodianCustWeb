/**
 * 系統設定檔
 * @module Config
 */

"use strict";

module.exports = {
	production: {
		version: "1.0.0",
		title: "SinoPac Custody Service",
		policy: "https",
		port: 8084,

		/*backend*/
		backend: {
			host: "128.110.232.66",
			port: "3051",
			policy: "https",
		},
		/*IntegratedProxyService*/
		IntegratedProxyService_api: {
			host: "128.110.232.66",
			port: "8018",
			policy: "https",
		},
		// /*Session database */
		// default_session_database: "redis", // redis or mongodb or "" for native
		// redis: {
		// 	//dir = C:\Program Files\Redis
		// 	host: "localhost",
		// 	port: 6379,
		// 	expires: 60 * 60 * 1000
		// },
		// mongodb: {
		// 	//dir = C:\Program Files\MongoDB\Server\3.4\bin
		// 	url: "mongodb://localhost:27017/session",
		// 	expires: 60 * 60 * 1000
		// },
		cookie: {
			httpOnly: true,
			secure: true,
		},
	},
	development: {},
	debug: {},
};