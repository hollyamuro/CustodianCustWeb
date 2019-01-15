
/**
 * 取得系統資訊共用程式
 * @module helper/SystemInformation
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
 */
module.exports.getSystemStartVersion = () => {
	return ''; // put your release date here
};

/**
 * 取的目前前端版本
 * @return {String} X.X.X
 * 第一碼 大改版(例如:其他商品加入本系統)
 * 第二碼 新功能
 * 第三碼 修正bug
 * 一次只變更一碼
 */
module.exports.getSystemVersion = () => {
	try {
		const config = require("../Config");
		return config[process.env.NODE_ENV].version;
	}
	catch (err) {
		throw err;
	}
};

/**
 * 取的目前後端版本
 * @return {String} X.X.X
 * 第一碼 大改版(例如:其他商品加入本系統)
 * 第二碼 新功能
 * 第三碼 修正bug
 * 一次只變更一碼
 */
module.exports.getRemoteSystemVersion = (requester) => {
	const axios = require("axios");
	const config = require("../Config");
	try {
		
		const local = config[process.env.NODE_ENV].backend.policy + "://" +
			config[process.env.NODE_ENV].backend.host + ":" +
			config[process.env.NODE_ENV].backend.port;
	
		return axios.post(local + "/version", { "data": {}, "requester": requester })
		.then((response) => {
			return response.data.data;
		})
		.catch((error) => {
			throw (error);
		})
	}
	catch (err) {
		throw (err);
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