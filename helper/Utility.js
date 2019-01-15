/**
 * 共用程式 & middleware
 * @module helper/Utility
 */

"use strict";

// /**
//  * 設定session參數
//  * @param  {Object} session session物件
//  */
// module.exports.sessionConfigureHandler = (session) => {

// 	const uuidV1 = require("uuid/v1");
// 	const config = require("../Config");

// 	let sessionProps = {
// 		secret: uuidV1() + uuidV1(),  //recommand 128 bytes random string
// 		resave: false,
// 		saveUninitialized: false,
// 		cookie: { maxAge: 4 * 60 * 60 * 1000 }    // 4 hours
// 	};
// 	const redis = require("connect-redis")(session);
// 	const mongodb = require("connect-mongo")(session);
// 	switch (config[process.env.NODE_ENV].default_session_database.toString().trim()) {
// 		case "redis":
// 			sessionProps.store = new redis(config[process.env.NODE_ENV].redis);
// 			break;
// 		case "mongodb":
// 			sessionProps.store = new mongodb(config[process.env.NODE_ENV].mongodb);
// 			break;
// 		default:
// 			//throw error here
// 			process.exit(1);
// 			break;
// 	}

// 	return sessionProps;
// };

/**
 * 取得系統資訊 [TODO]
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 */
module.exports.systemInfoHandler = async (req, res, next) => {

	const systemInformation = require("../helper/SystemInformation");

	res.locals.version = "";
	res.locals.remote_version = "";
	try {

		res.locals.version = systemInformation.getSystemVersion();
		res.locals.remote_version = await systemInformation.getRemoteSystemVersion();
		next();

	} catch (e) {
		next(e);
	}
};

/**
 * 顯示彈跳視窗， 因為是使用locals設定請配合EJS template使用。
 * @param  {String} alterType
 * @param  {String} alterMsg
 * @see ...
 */
module.exports.showAlterEJSHandler = (req, res, alterMsg) => {
	res.locals.show_popup = true;
	res.locals.popup = { type: alterMsg.type, title: alterMsg.title, message: alterMsg.message, };
};

/**
 * 取得權限列表
 * @param  {Object} premissionList
 */
module.exports.getNavbarPermission = (permissionList) => {

	const systemHierarchy = require("./SystemHierarchy");
	// return systemHierarchy;

	let structPermission = {};
	for (let i = 0; i < permissionList.length; i++) {

		let sys = permissionList[i].System_Id;
		let dir = permissionList[i].Directory_Id;
		let fun = permissionList[i].Function_Id;
		let auth = permissionList[i].Auth;

		if (!systemHierarchy.hasOwnProperty(sys) ||
			!systemHierarchy[sys].hasOwnProperty(dir) ||
			!systemHierarchy[sys][dir].hasOwnProperty(fun))
			continue;

		if (!structPermission.hasOwnProperty(sys)) {
			structPermission[sys] = {
				name: systemHierarchy[sys].name,
			};
		}

		if (!structPermission[sys].hasOwnProperty(dir)) {
			structPermission[sys][dir] = {
				name: systemHierarchy[sys][dir].name,
			};
		}

		if (!structPermission[sys][dir].hasOwnProperty(fun)) {
			structPermission[sys][dir][fun] = {
				name: systemHierarchy[sys][dir][fun].name,
				url: systemHierarchy[sys][dir][fun].url,
				auth: auth,
			};
		}
	}

	return structPermission;
};

/**
 * 透過外部三方，認證取得確切client端IP
 * @return IP/NA
 */
module.exports.getUserIP = () => {
	try {
		const debug = require("debug")("CustodianCustWeb:Utility.getUserIP");
		const os = require("os");
		const ifaces = os.networkInterfaces();

		return new Promise((resolve, reject) => {
			Object.keys(ifaces).forEach(function (ifname) {
				let alias = 0;
				ifaces[ifname].forEach(function (iface) {
					if ("IPv4" !== iface.family || iface.internal !== false) {
						// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
						return;
					}
					if (alias >= 1) {
						// this single interface has multiple ipv4 addresses
					} else {
						// this interface has only one ipv4 adress
						debug(iface.address);
						resolve(iface.address);
					}
					++alias;
				});
			});
		});
	}
	catch (err) {
		throw (err);
	}
};

/**
 * 檢查輸入資料
 * @param  {Object} inputdata
 */
module.exports.checkInputData = async (inputdata) => {
	try {
		const debug = require("debug")("CustodianCustWeb:Utility.checkInputData");
		const InputDataRegexp = /['"/*\\]/;
		return new Promise((resolve, reject) => {
			Object.keys(inputdata).forEach(element => {
				debug(inputdata[element]);
				if (typeof (inputdata[element]) === "number") {
					inputdata[element] = inputdata[element].toString();
				}

				if (typeof (inputdata[element]) === "object") {
					for (let i = 0; i < inputdata[element].length; i++) {
						if (inputdata[element][i].search(InputDataRegexp) >= 0) {
							resolve(false);
						}
					}
				}
				else {
					if (inputdata[element].search(InputDataRegexp) >= 0) {
						resolve(false);
					}
				}

			});
			resolve(true);
		});
	}
	catch (err) {
		throw (err);
	}
};