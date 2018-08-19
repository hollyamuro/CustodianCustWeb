"use strict";

import { combineReducers } from "redux";
import { isLoading } from "./loadings";
import { isMsgShown, msg } from "./message";
import { ym } from "./ym";

export default combineReducers({
	ym,
	isLoading,
	isMsgShown,
	msg,
});
