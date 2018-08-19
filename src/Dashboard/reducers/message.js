"use strict";

import {
	SHOW_MESSAGE,
	HIDE_MESSAGE
} from "../actions";

export const isMsgShown = (state=false, action) => {
	switch(action.type){
	case SHOW_MESSAGE:
	case HIDE_MESSAGE:
		return action.isMsgShown;
	default:
		return state;
	}
};

export const msg = (
	state = {
		type: "",
		title: "",
		text: "",
	}, 
	action
) => {
	switch(action.type){
	case SHOW_MESSAGE:
		return action.msg;
	default:
		return state;
	}
};