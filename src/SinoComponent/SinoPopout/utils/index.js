"use strict";

/**
 * @param  {} type
 */
export const getStyle = (type) => {
	switch (type) {
		case "INFO":
			return "secondary";
		case "ERROR":
			return "danger";
		case "SUCCESS":
			return "success";
		default:
			return "primary";
	}
};