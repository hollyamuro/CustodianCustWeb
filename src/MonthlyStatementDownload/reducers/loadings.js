"use strict";

import {
	REQUEST_LOAD_MONTHLY_STATEMENT,
	RECEIVE_LOAD_MONTHLY_STATEMENT,
	START_LOADING,
	STOP_LOADING,
} from "../actions";

export const isLoading = (state=false, action) => {
	switch(action.type){
	case REQUEST_LOAD_MONTHLY_STATEMENT:
	case RECEIVE_LOAD_MONTHLY_STATEMENT:
	case START_LOADING:
	case STOP_LOADING:
		return action.isLoading;
	default:
		return state;
	}
};