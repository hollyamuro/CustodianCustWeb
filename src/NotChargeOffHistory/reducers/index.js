"use strict";

import { combineReducers } from "redux";
import { isLoading } from "./loadings";
import { isMsgShown, msg } from "./message";
import { queryDate, notChargeOff } from "./notChargeOff";

export default combineReducers({
	queryDate,
	notChargeOff,
	isLoading,
	isMsgShown,
	msg,
});
