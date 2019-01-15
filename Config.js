/**
 * 系統設定檔
 * @module Config
 */

"use strict";

module.exports = {
	production: {},
	development: {},
	debug: {
		version: "0.0.0",
		title: "SinoPac Custody Service(Debug Version)",
		policy: "http",
		port: 8084,

		/*backend*/
		backend: {
			host: "localhost",
			port: "3001",
			policy: "http",
		},
		/*IntegratedProxyService*/
		IntegratedProxyService_api: {
			host: "localhost",
			port: "8008",
			policy: "http",
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
			secure: false,
		},
	},
};