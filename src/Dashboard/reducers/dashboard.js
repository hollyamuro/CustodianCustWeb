"use strict";

import {
	RECEIVE_LOAD_DASHBOARD_COUPON,
} from "../actions";

export const coupon = (state = [], action) => {
	switch(action.type){
    
	case RECEIVE_LOAD_DASHBOARD_COUPON:
		return action.coupon;

	default:
		return state;
	}
};