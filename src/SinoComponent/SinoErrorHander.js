/**
 * client-side 錯誤處理
 * @module /src/helper/ReactErrorHander.js
 * @see reference: https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status
 * */

"use strict";

/* Basic error format */
class SinoError extends Error {
	constructor(message, type, status) {
		super(message);

		this.name = this.constructor.name;
		this.type = type;
		this.status = status;
	}
}

export const Unauthorized = class extends SinoError {
	constructor(message) { super(message || "Unauthorized, please login in first.", "ERROR", 401); }
};

// export const Forbidden = class extends SinoError {
// 	constructor(message) { super(message || "Forbidden.", "ERROR", 403); }
// };

export const NotFound = class extends SinoError {
	constructor(message) { super(message || "No Data.", "ERROR", 404); }
};

export const InternalServerError = class extends SinoError {
	constructor(message) { super(message || "Error, please contact the customer service.", "ERROR", 500); }
};
