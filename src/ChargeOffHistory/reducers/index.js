"use strict";

import { combineReducers } from "redux";
import { isLoading } from "./loadings";
import { isMsgShown, msg } from "./message";
import { queryDate, chargeOff } from "./chargeOff";

export default combineReducers({
	queryDate,
	chargeOff,
	isLoading,
	isMsgShown,
	msg,
});
