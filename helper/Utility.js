/**
 * 共用程式 & middleware
 * @module helper/Utility.js
 */

 "use strict";

/**
 * 設定session參數
 * @param  {Object} session session物件
 */
module.exports.sessionConfigureHandler = (session)=>{

	const uuidV1 = require("uuid/v1");
	const config = require("../Config");
    
	let sessionProps = {
		secret: uuidV1() + uuidV1(),  //recommand 128 bytes random string
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 4 * 60 * 60 * 1000 }    // 4 hours
	};

	switch(config[process.env.NODE_ENV].default_session_database.toString().trim()){
	case "redis":
		const redis = require("connect-redis")(session);
	        sessionProps.store = new redis(config[process.env.NODE_ENV].redis);
		break;
	case "mongodb":
		const mongodb = require("connect-mongo")(session);
		sessionProps.store = new mongodb(config[process.env.NODE_ENV].mongodb);
	default:
		//throw error here
		process.exit(1);
		break;
	}

	return sessionProps;
};

/**
 * 取得系統資訊 [TODO]
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 */
module.exports.systemInfoHandler = (req, res, next) => {
	const debug = require("debug")("CustodianCustWeb:Utility.systemInfoHandler");
	const systemInformation = require("./SystemInformation");

	let startDate = "";
	let sysHash = "";
	let sysDate = "";
	let remoteSysHash = "";
	let remoteSysDate = "";

	Promise.all([
		systemInformation.getSystemStartVersion(),
		systemInformation.getSystemGitVersion(), 
		systemInformation.getRemoteSystemGitVersion()
	])
		.then(function(values) {

			startDate = values[0].system_version_date;
			sysHash = values[1].system_version_hash.substring(0, 8);
			sysDate = values[1].system_version_date;
			remoteSysHash = values[2].system_version_hash.substring(0, 8);
			remoteSysDate = values[2].system_version_date;	
			next();
        
		})
		.catch((err) => { 
			debug(err.stack);
			startDate = "";
			sysHash = "";
			sysDate = "";
			remoteSysHash = "";
			remoteSysDate = "";
			next();
		});
	// .finally(()=>{
	//     switch(process.env.NODE_ENV){
	//         case "production":
	//             res.locals.version = "目前版本: 正式版" + ( startDate === "" ) ? "" : ("(" + startDate + "啟用)");
	//             if ( sysDate !== "" ){ res.locals.system_info = "[網站版本]:" + sysDate ; }
	//             if ( remoteSysDate !== "" ){ res.locals.system_info_remote = "[伺服器版本]:" + remoteSysDate ; }
	//             break;
	//         case "development":
	//             res.locals.version = "目前版本: 測試版" + ( startDate === "") ? "" : ("(" + startDate + "啟用)");
	//             if ( sysDate !== "" || sysHash !== "" ){ res.locals.system_info = "[網站版本]:" + sysDate + "(" + sysHash + ")"; }
	//             if ( remoteSysDate !== "" || remoteSysHash !=="" ){ res.locals.system_info_remote = "[伺服器版本]:" + remoteSysDate + "(" + remoteSysHash + ")"; }
	//             break;
        
	//         default:
	//             res.locals.version = "目前版本: 版本錯誤，請聯絡資訊處";
	//             res.locals.system_info = "";
	//             res.locals.system_info_remote = "";
	//             break;
	//         }
	//     next();
	// });
};

/**
 * 顯示彈跳視窗， 因為是使用locals設定請配合EJS template使用。
 * @param  {String} alterType
 * @param  {String} alterMsg
 * @see ...
 */
module.exports.showAlterEJSHandler = (req, res, alterMsg) => {
	res.locals.show_popup = true;
	res.locals.popup = { type: alterMsg.type, message: alterMsg.message, };
};

/**
 * 送出http/https請求
 * @param  {Object} target 請求設定
 * target:{
        policy: https / http,
        host:   host,
        port:   port,
        path:   url path,
        method: GET/POST/PUSH/DELETE
    }, 
 * @param  {Object} data 資料
 * @param  {String} requester 送出請求人員
 * @param  {Function} dataHandler 處理回送資料callback
 * @param  {Function} errorHandler 處理回送錯誤callback
 */
module.exports.sendRequestHandler = function( target, data, requester, dataHandler, errorHandler){
	
	try{
        
		const policy = (target.policy === "http")? require("http"): require("https");
		const postData = JSON.stringify({ "data": data, "requester":  requester });
		const httpOption = {
			"connect":  {   
				host: target.host,
				port: target.port,
				path: target.path,
				method: target.method,
				headers: {
					"Content-Type": "application/json",
					"Content-Length": Buffer.byteLength(postData),
				},
			},
			"data": postData,
		};
        
		const httpReq = policy.request(httpOption.connect, function(response){
			let data = "";
			response.on("data", (chunk) => { data += chunk; });
			response.on("end", () => { dataHandler(data); });
		}).on("error", (e) => { errorHandler(e); });

		httpReq.write(postData);
		httpReq.end();

	}catch(e){
		errorHandler(e);
	}
};

/**
 * 取得權限列表
 * @param  {Object} premissionList
 */
module.exports.getNavbarPermission = (premissionList) => {
	
	const systemHierarchy = require("./SystemHierarchy");
	return systemHierarchy;
}
