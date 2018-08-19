"use strict";

import {
	REQUEST_LOAD_POSITION,
	RECEIVE_LOAD_POSITION,
	START_LOADING,
	STOP_LOADING,
} from "../actions";

export const isLoading = (state=false, action) => {
	switch(action.type){
	case REQUEST_LOAD_POSITION:
	case RECEIVE_LOAD_POSITION:
	case START_LOADING:
	case STOP_LOADING:
		return action.isLoading;
	default:
		return state;
	}
};
    