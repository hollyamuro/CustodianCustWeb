/**
 * 系統錯誤處理
 * @module helper/CustodianCustWebError
 * @see reference: https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status
 */

"use strict";

/* Basic error format */
class CustodianCustWebError extends Error {
	constructor(message, type,title, status) {
		super(message);
                
		this.name = this.constructor.name;
		this.type = type;
		this.type = title;
		this.status = status;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports.SignInFail = class extends CustodianCustWebError {
	constructor(message) { super(message || "ERROR_SIGN_IN_FAIL", "ERROR","System Message", 403); }
};

module.exports.BadRequest = class extends CustodianCustWebError {
	constructor(message) { super(message || "ERROR_BAD_REQUEST", "ERROR","System Message", 400); }
};

module.exports.Unauthorized = class extends CustodianCustWebError {
	constructor(message) { super(message || "ERROR_UNAUTHORIZED", "ERROR","System Message", 401); }
};

module.exports.Forbidden = class extends CustodianCustWebError {
	constructor(message) { super(message || "ERROR_FORBIDDEN", "ERROR","System Message", 403); }
};

module.exports.NotFoundError = class extends CustodianCustWebError {
	constructor(message) { super(message || "ERROR_NOT_FOUND", "ERROR","System Message", 404); }
};

module.exports.InternalServerError = class extends CustodianCustWebError {
	constructor(message) { super(message || "ERROR_INTERNAL_SERVER_ERROR", "ERROR","System Message", 500); }
};
