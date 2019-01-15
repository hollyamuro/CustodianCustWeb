"use strict";

import {
	REQUEST_LOAD_POSITION,
	RECEIVE_LOAD_POSITION,
	REQUEST_RESET_ALL,
	RECEIVE_RESET_ALL,
	REQUEST_INIT_QUERY,
	RECEIVE_INIT_QUERY,
	START_LOADING,
	STOP_LOADING,
} from "../actions";

export const isLoading = (state = false, action) => {
	switch (action.type) {
	case REQUEST_LOAD_POSITION:
	case RECEIVE_LOAD_POSITION:
	case REQUEST_RESET_ALL:
	case RECEIVE_RESET_ALL:
	case REQUEST_INIT_QUERY:
	case RECEIVE_INIT_QUERY:
	case START_LOADING:
	case STOP_LOADING:
		return action.isLoading;
	default:
		return state;
	}
};
