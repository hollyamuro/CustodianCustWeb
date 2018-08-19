"use strict";

import { combineReducers } from "redux";
import { title, data, columns, no_data_hint, sort, filter } from "./data";

export default combineReducers({
	title,
	data,
	columns,
	no_data_hint,
	sort,
	filter,
});
