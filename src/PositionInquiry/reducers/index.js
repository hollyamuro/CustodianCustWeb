"use strict";

import { combineReducers } from "redux";
import { isLoading } from "./loadings";
import { isMsgShown, msg } from "./message";
import { queryDate, position } from "./position";

export default combineReducers({
	queryDate,
	position,
	isLoading,
	isMsgShown,
	msg,
});
