/**
 * 系統訊息代碼列表
 * @module helper/MessageHandler
 */

"use strict";

module.exports = {
	"ERROR" : {

		
		/* general */
		"ERROR_TOKEN":            			{ "type": "ERROR","title": "System Message", "message":  "Network error.", },
		"ERROR_URL_NOT_FOUND":            	{ "type": "ERROR","title": "System Message", "message":  "The web page not found.", },
		"ERROR_DATE":            		{ "type": "ERROR","title": "System Message", "message":  "Invalid date format.", },

		/*Verify */
		"ERROR_EMAIL_FAIL":           		{ "type": "ERROR","title": "System Message", "message":  "Please input the valid email address.", },
		"ERROR_SET_PASSWORD_FAIL":      	{ "type": "ERROR","title": "System Message", "message":  "Your password not set properly.", },
		"ERROR_RACAPTCHA_CHECK_FAIL":      	{ "type": "ERROR","title": "System Message", "message":  "Robot authentication fail.", },

		/*Reset Password */
		"ERROR_INPUT_DATA":            		{ "type": "ERROR","title": "System Message", "message":  "Invalid data format.", },
		"ERROR_ACCOUNT_NOT_EXISTED":   		{ "type": "ERROR","title": "System Message", "message":  "The account does not exist.", },
		"ERROR_VERIFYCODE_FAIL":   			{ "type": "ERROR","title": "System Message", "message":  "Incorrect verification code.", },
		"ERROR_EMAIL_URL_MATCH_THREE_TIME":	{ "type": "ERROR","title": "System Message", "message":  "You entered wrong email address 3 times, please contact your sales.", },
		"ERROR_RESET_PASSWORD_FAIL":      	{ "type": "ERROR","title": "System Message", "message":  "Your password not set properly.", },
		

	},
	"WARN": {
		"WARN_GOOGLE_VERIFY":      			{ "type": "WARN","title": "System Message", "message":  "Please complete the robot verification process.", },
	},
	"INFO": {

		/* general */
		"INFO_OK":							{ "type": "INFO","title": "System Message", "message":  "OK", },
		"INFO_LOGIN_SUCCESS":				{ "type": "INFO","title": "System Message", "message":  "You have successfully logged in.", },
		"INFO_LOGOUT_SUCCESS":				{ "type": "INFO","title": "System Message", "message":  "You have successfully logged out.", },
		"INFO_TIMEOUT":						{ "type": "INFO","title": "Session Has Expired", "message":  "You've been idle too long.\nPlease re-login to renew your session.", },

		/*Verify */
		"INFO_SET_PASSWORD_SUCCESS":      	{ "type": "INFO","title": "System Message", "message":  "Your password has been reset. Please login again.", },

		/*Reset Password */
		"INFO_ACCOUNT_SUCCESS":           	{ "type": "INFO","title": "System Message", "message":  "The account matched.", },
		"INFO_EMAIL_SUCCESS":           	{ "type": "INFO","title": "System Message", "message":  "The email matched.", },
		"INFO_VERIFYCODE_SUCCESS":          { "type": "INFO","title": "System Message", "message":  "The verification code matched.", },
		"INFO_RESET_PASSWORD_SUCCESS":      { "type": "INFO","title": "System Message", "message":  "Your password has been reset. Please login again.", },
			
		
	},
	/*Add other defined codes here ...*/
};