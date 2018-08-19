"use strict";

import {
	REQUEST_LOAD_DASHBOARD_COUPON,
	RECEIVE_LOAD_DASHBOARD_COUPON,
	START_LOADING,
	STOP_LOADING,
} from "../actions";

export const isLoading = (state=false, action) => {
	switch(action.type){
	case REQUEST_LOAD_DASHBOARD_COUPON:
	case RECEIVE_LOAD_DASHBOARD_COUPON:
	case START_LOADING:
	case STOP_LOADING:
		return action.isLoading;
	default:
		return state;
	}
};
    