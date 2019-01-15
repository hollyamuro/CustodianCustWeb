"use strict";

import {
	REQUEST_CHECK_PERMISSION,
	RECEIVE_CHECK_PERMISSION,
	START_LOADING,
	STOP_LOADING,
} from "../actions";

export const isLoading = (state = false, action) => {
	switch (action.type) {
	case REQUEST_CHECK_PERMISSION:
	case RECEIVE_CHECK_PERMISSION:
	case START_LOADING:
	case STOP_LOADING:
		return action.isLoading;
	default:
		return state;
	}
};