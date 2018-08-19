"use strict";

/**
 * action type & action creators
 */

import axios from "axios";
import { Unauthorized, NotFound } from "../../SinoComponent/SinoErrorHander";

export const REQUEST_LOAD_POSITION = "REQUEST_LOAD_POSITION";
export const RECEIVE_LOAD_POSITION = "RECEIVE_LOAD_POSITION";
export const LOAD_POSITION = "LOAD_POSITION";

export const requestLoadPosition = () => ({
	type: REQUEST_LOAD_POSITION,
	isLoading: true,
});
export const receiveLoadPosition = (position) => ({
	type: RECEIVE_LOAD_POSITION,
	isLoading: false,
	position,
});
export const loadPosition = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(requestLoadPosition());

			//do get user data
			const user = await axios.post(location.protocol + "//" + location.host + "/helper/user");

			// do request 
			let result = await axios.post(
				location.protocol + "//" + location.host + "/S001C001F001/read", {
					data: {
						"account": user.data.data.user,
						"query_date": getState().queryDate,
					}
				}
			);

			// validate
			if (!result.data.code) throw new Unauthorized();
			if (result.data.code.type === "ERROR") throw Error(result.data.code.message);
			if (result.data.data.cash.length === 0 &&
				result.data.data.bond.length === 0 &&
				result.data.data.rp.length === 0 &&
				result.data.data.rs.length === 0) throw new NotFound();

			// do reponse
			dispatch(receiveLoadPosition(result.data.data));

		} catch (err) {
			dispatch(resetAll());
			dispatch(showMessage({
				type: "ERROR",
				title: "ERROR",
				text: err.message,
			}));
			dispatch(stopLoading());
		}
	};
};



//set inquiry data
export const SET_QUERY_DATE = "SET_QUERY_DATE";
export const setQueryDate = (queryDate) => ({
	type: SET_QUERY_DATE,
	queryDate,
});


// reset screen
export const RESET_POSITION = "RESET_POSITION";
export const resetPosition = () => ({
	type: RESET_POSITION,
	position: {
		cash: [],
		bond: [],
		rp: [],
		rs: [],
	},
});

export const RESET_ALL = "RESET_ALL";
export const resetAll = () => {
	return (dispatch)=>{
		try{
			dispatch(setQueryDate(""));
			dispatch(resetPosition());
		} catch (err) {
			dispatch(showMessage({
				type: "ERROR",
				title: "ERROR",
				text: err.message,
			}));
		}
	};
};

//show message alert
export const SHOW_MESSAGE = "SHOW_MESSAGE";
export const HIDE_MESSAGE = "HIDE_MESSAGE";

export const showMessage = (msg) => ({
	type: SHOW_MESSAGE,
	isMsgShown: true,
	msg,
});
export const hideMessage = () => ({
	type: HIDE_MESSAGE,
	isMsgShown: false,
});



//stop loading
export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";

export const startLoading = () => ({
	type: START_LOADING,
	isLoading: true,
});
export const stopLoading = () => ({
	type: STOP_LOADING,
	isLoading: false,
});

