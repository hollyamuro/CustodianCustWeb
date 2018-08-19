/**
 * 系統設定檔
 * @module Config.js
 */

"use strict";

module.exports = {
	production:{
		/* 系統名稱 */
		title: "Custodian Web",
		/* Communication policy http/https */
		policy: "https",
		/* Port */
		port: 8084,  

		/*backend*/
		backend: {
		},
		/*IntegratedProxyService*/
		IntegratedProxyService_api: {
		},
		/*Session database */
		default_session_database : "redis", // redis or mongodb or "" for native
		redis : {
			//dir = C:\Program Files\Redis
			host:"localhost",
			port:6379,
			expires: 60 * 60 * 1000
		},
		mongodb : {
			//dir = C:\Program Files\MongoDB\Server\3.4\bin
			url:"mongodb://localhost:27017/session",
			expires: 60 * 60 * 1000
		},
	},
	development: {
		/* 系統名稱 */
		title: "Custodian Web(development version)",
		/* Communication policy http/https */
		policy: "https",
		/* Port */
		port: 8084,
		
		/*backend*/
		backend: {
			//host: "128.110.5.43",
			host: "localhost",    //for local dev
			port: "3001",
			/*backend: (Backend request) Communication policy http/https*/
			policy: "https",
		},
		/*IntegratedProxyService*/
		IntegratedProxyService_api: {
			host: "128.110.5.43",
			// host: 'localhost',    //for local dev
			port: "8008",
			/*backend: (Backend request) Communication policy http/https*/
			policy: "https",
		},
		/*Session database */
		default_session_database : "redis", // redis or mongodb or "" for native
		redis : {
			//dir = C:\Program Files\Redis
			host:"localhost",
			port:6379,
			expires: 60 * 60 * 1000
		},
		mongodb : {
			//dir = C:\Program Files\MongoDB\Server\3.4\bin
			url:"mongodb://localhost:27017/session",
			expires: 60 * 60 * 1000
		},
	},
};