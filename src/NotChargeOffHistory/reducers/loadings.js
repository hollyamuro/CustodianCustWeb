"use strict";

import {
	REQUEST_LOAD_NOT_CHARGE_OFF,
	RECEIVE_LOAD_NOT_CHARGE_OFF,
	START_LOADING,
	STOP_LOADING,
} from "../actions";

export const isLoading = (state=false, action) => {
	switch(action.type){
	case REQUEST_LOAD_NOT_CHARGE_OFF:
	case RECEIVE_LOAD_NOT_CHARGE_OFF:
	case START_LOADING:
	case STOP_LOADING:
		return action.isLoading;
	default:
		return state;
	}
};