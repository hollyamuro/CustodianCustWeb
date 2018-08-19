"use strict";

/**
 * action type & action creators
 */

import axios from "axios";
import { Unauthorized, NotFound } from "../../SinoComponent/SinoErrorHander";

export const REQUEST_LOAD_NOT_CHARGE_OFF = "REQUEST_LOAD_NOT_CHARGE_OFF";
export const RECEIVE_LOAD_NOT_CHARGE_OFF = "RECEIVE_LOAD_NOT_CHARGE_OFF";
export const LOAD_NOT_CHARGE_OFF = "LOAD_NOT_CHARGE_OFF";

export const requestLoadNotChargeOff = () => ({
	type: REQUEST_LOAD_NOT_CHARGE_OFF,
	isLoading: true,
});
export const receiveLoadNotChargeOff = (notChargeOff) => ({
	type: RECEIVE_LOAD_NOT_CHARGE_OFF,
	isLoading: false,
	notChargeOff,
});
export const loadNotChargeOff = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(requestLoadNotChargeOff());

			//do get user data
			const user = await axios.post(location.protocol + "//" + location.host + "/helper/user");

			// do request 
			let result = await axios.post(
				location.protocol + "//" + location.host + "/S001C001F002/read", {
					data: {
						"account": user.data.data.user,
						"begin_date": getState().queryDate.from,
						"end_date": getState().queryDate.to,
					}
				}
			);

			// validate
			if (!result.data.code) throw new Unauthorized();
			if (result.data.code.type === "ERROR") throw Error(result.data.code.message);
			if (result.data.data.cash.length === 0 &&
				result.data.data.holdings.length === 0 ) throw new NotFound();

			// do reponse
			dispatch(receiveLoadNotChargeOff(result.data.data));

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
export const SET_FROM_QUERY_DATE = "SET_FROM_QUERY_DATE";
export const SET_TO_QUERY_DATE = "SET_TO_QUERY_DATE";
export const setFromQueryDate = (from) => ({
	type: SET_FROM_QUERY_DATE,
	from,
});
export const setToQueryDate = (to) => ({
	type: SET_TO_QUERY_DATE,
	to,
});



// reset screen
export const RESET_NOT_CHARGE_OFF = "RESET_NOT_CHARGE_OFF";
export const resetNotChargeOff = () => ({
	type: RESET_NOT_CHARGE_OFF,
	notChargeOff: {
		cash: [],
		holdings: [],
	},
});

export const RESET_ALL = "RESET_ALL";
export const resetAll = () => {
	return (dispatch)=>{
		try{
			dispatch(setFromQueryDate(""));
			dispatch(setToQueryDate(""));
			dispatch(resetNotChargeOff());
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

