/**
 * 系統訊息處理
 * @module helper/MessageHandler
 */

"use strict";

/**
 * 反饋訊息處理
 * @param  {String} msgCode
 */
module.exports.infoHandler = (msgCode) => {
	
	const messageCodes = require("./MessageCodes");
	const debug = require("debug")("CustodianCustWeb:MessageHandler.infoHandler");

	try
	{
		debug("取得訊息碼"+msgCode);
		if(messageCodes.INFO[msgCode]){
			return {
				"type": 	messageCodes.INFO[msgCode].type,
				"title": 	messageCodes.INFO[msgCode].title,
				"message": 	messageCodes.INFO[msgCode].message,
			};
		}

		if(messageCodes.ERROR[msgCode]){
			return {
				"type": 	messageCodes.ERROR[msgCode].type,
				"title": 	messageCodes.ERROR[msgCode].title,
				"message": 	messageCodes.ERROR[msgCode].message,
			};
		}

		if(messageCodes.WARN[msgCode]){
			return {
				"type": 	messageCodes.WARN[msgCode].type,
				"title": 	messageCodes.WARN[msgCode].title,
				"message": 	messageCodes.WARN[msgCode].message,
			};
		}

		//default
		return {
			"type": 	messageCodes.INFO.INFO_OK.type,
			"title": 	messageCodes.INFO.INFO_OK.type,
			"message": 	messageCodes.INFO.INFO_OK.message,
		};

	}
	catch(err){
		debug(err.stack);
		throw(err);
	}
};