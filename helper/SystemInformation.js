
/**
 * 取得系統資訊共用程式
 * @module helper/SystemInformation.js
 */

"use strict";

/**
  * 取得系統名稱
  * @return {String} 系統名稱
  */
module.exports.getSystemTitle = () => {

	try{
		const config = require("../Config");
		return config[process.env.NODE_ENV].title;
	}
	catch(err){
		throw err; 
	}
};

/**
 * 取得使用中項目標題
 * @param  {Object} system_hierarchy 權限列表
 * @param  {String} url 使用中項目URL
 */
module.exports.getPageTitle = ( url ) => {
	const systemHierarchy = require("./SystemHierarchy");
	let sys = url.substring(1, 5);
	let dir = url.substring(5, 9);
	let fun = url.substring(9, 13);
	return systemHierarchy[sys][dir][fun].name;
};

/**
 * 取得權限資訊
 * @param  {} permission 權限列表
 * @param  {} url 存取位置
 */
module.exports.getPageAuth = (permission, url) => {
	let sys = url.substring(1, 5);
	let dir = url.substring(5, 9);
	let fun = url.substring(9, 13);

	let authObj = {};
	for(let i=0;i<permission[sys][dir][fun].auth.length;i++){
		authObj[permission[sys][dir][fun].auth[i]] = true;
	}
	return authObj;
};

/**
 * 取得系統啟用日
 * @return {Object} {system_version_hash: '', system_version_date: '' }
 */
module.exports.getSystemStartVersion = () =>{
	// try{
	return {   
		system_version_hash: "",
		system_version_date: "****/**/**",	// put your release date here
	};
	// }
	// catch(err){
	// throw err; 
	// }
};

/**
 * 取的目前前端(本程式)git版本&日期
 * @return {Object} {system_version_hash: '', system_version_date: '' }
 */
module.exports.getSystemGitVersion = () => {
	const debug = require("debug")("CustodianCustWeb:Utility.getSystemGitVersion");

	try{

		const os = require("os");
		const iconv = require("iconv-lite");
		const spawn = require("cross-spawn");
		const path = require("path");
		const format = require("date-format");

		return new Promise((resolve, reject) => {
		
			debug(os.platform());
			
			let cmd = "";
			switch(os.platform().toString().trim()){
			case "win32":
				cmd = path.resolve(__dirname, "..\\bin\\version_win.bat");
				break;
			case "linux":
				cmd = path.resolve(__dirname, "../bin/version_linux.sh");
				break;
			default:
				cmd = "";
				break;
			}

			//can not get system info
			if(cmd === "") resolve(["",""]);

			let runexec = spawn(cmd, []);
			let data = [];
			let errorRecord = {};
			runexec.stdout.on("data", (std_data)=>{    
				data = ((iconv.decode(new Buffer(std_data), "BIG5")).split("\n")[0]).split("-");
			});

			runexec.stderr.on("data", (std_error)=>{
				let error = iconv.decode(new Buffer(std_error), "BIG5");
				debug("[STDERR]:" + error);
				errorRecord = new Error("ERROR_SOFT_VERSION_REQ_FAIL");
			});

			runexec.on("error", (error)=>{
				debug("[CMD ERROR]:" + error.stack);
				errorRecord = new Error("ERROR_SOFT_VERSION_REQ_FAIL");
			});

			runexec.on("close", function(code) {
				debug("[CMD CLOSING CODE]: " + code);
				if( code === 0 ){
					resolve({
						"system_version_hash": data[0].toString().trim(),
						"system_version_date": format(	"yyyy/MM/dd hh:mm:ss", new Date(data[1].toString().trim()*1000)),
					});
				}
				else{
					reject(errorRecord);
				}
			});
		});
	}
	catch(err){
		throw err; 
	}
};

/**
 * 取的目前後端git版本&日期
 * @return {Object} {system_version_hash: '', system_version_date: '' }
 */
module.exports.getRemoteSystemGitVersion = () => {

	try{
		return new Promise((resolve, reject) => {
		
			const config = require("../config");
			const policy = (config[process.env.NODE_ENV].backend.policy === "http")? require("http"): require("https");
			
			let postData = JSON.stringify({});
			let httpOption = {
				"connect":  {   
					host: config[process.env.NODE_ENV].backend.host,
					port: config[process.env.NODE_ENV].backend.port,
					path:   "/api/system_info",
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Content-Length": Buffer.byteLength(postData),
					},
				},
				"data": postData,
			};
				
			let httpReq = policy.request(httpOption.connect, function(response){

				let data = "";
				response.on("data", function (chunk) {
					data += chunk;
				});
				response.on("end", function() {
					resolve(JSON.parse(data).data);
				});

			}).on("error", function(e) {
				reject(new Error("ERROR_SOFT_VERSION_REQ_FAIL"));
			});
		
			//send data
			httpReq.write(postData);
			httpReq.end();
		});
	}
	catch(err){
		throw err; 
	}
};

/**
 * 取得系統架構資訊
 */
module.exports.getSystemHierarchyArrayList = () => {
	try
	{
		const systemHierarchy = require("./SystemHierarchy");
		let list = [];
		for(let sys in systemHierarchy ){
			for(let dir in systemHierarchy[sys] ) {
				if( dir !=="id" && dir !=="name" && dir !=="description"  ) {
					for(let fun in systemHierarchy[sys][dir] ) {
						if( fun !=="id" && fun !=="name" && fun !=="description"  ) {
							list.push({
								"sys": systemHierarchy[sys].id,
								"dir": systemHierarchy[sys][dir].id,
								"fun": systemHierarchy[sys][dir][fun].id,
								"show_name": systemHierarchy[sys].name + "/" + systemHierarchy[sys][dir].name + "/" + systemHierarchy[sys][dir][fun].name,
							});
						}
					}
				}
			}
		}
		return list;
	}
	catch(err){
		throw(err);
	}
};