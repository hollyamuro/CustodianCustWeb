"use strict";

import { combineReducers } from "redux";
import { coupon } from "./dashboard";
import { isLoading } from "./loadings";
import { isMsgShown, msg } from "./message";

export default combineReducers({
	coupon,
	isLoading,
	isMsgShown,
	msg,
});
