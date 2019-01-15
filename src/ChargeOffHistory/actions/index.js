"use strict";

/**
 * action type & action creators
 */

import axios from "axios";
import { NotFound } from "../../SinoComponent/SinoErrorHandler";

export const REQUEST_LOAD_CHARGE_OFF = "REQUEST_LOAD_CHARGE_OFF";
export const RECEIVE_LOAD_CHARGE_OFF = "RECEIVE_LOAD_CHARGE_OFF";
export const LOAD_CHARGE_OFF = "LOAD_CHARGE_OFF";

export const requestLoadChargeOff = () => ({
	type: REQUEST_LOAD_CHARGE_OFF,
	isLoading: true,
});
export const receiveLoadChargeOff = (chargeOff) => ({
	type: RECEIVE_LOAD_CHARGE_OFF,
	isLoading: false,
	chargeOff,
});
export const loadChargeOff = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(requestLoadChargeOff());

			// do get user data
			const user = await axios.post(location.protocol + "//" + location.host + "/helper/user");

			// unauthorized
			if (!user.data.code) {
				window.location = location.protocol + "//" + location.host;
				return;
			}
			else {
				if (user.data.code.type === "ERROR") throw Error(user.data.code.message);
			}

			// do request 
			let result = await axios.post(
				location.protocol + "//" + location.host + "/S001C001F003/read", {
					data: {
						"account": user.data.data.user,
						"begin_date": getState().queryDate.from,
						"end_date": getState().queryDate.to,
					}
				}
			);

			// unauthorized
			if (!result.data.code) {
				window.location = location.protocol + "//" + location.host;
				return;
			}
			else {
				if (result.data.code.type === "ERROR") throw Error(result.data.code.message);
				// if (result.data.data.cash.length === 0 &&
				// 	result.data.data.holdings.length === 0) throw new NotFound();
			}

			// do reponse
			dispatch(receiveLoadChargeOff(result.data.data));

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
export const SET_CHARGE_OFF = "SET_CHARGE_OFF";
export const setChargeOff = (cash, holdings) => ({
	type: SET_CHARGE_OFF,
	chargeOff: {
		cash,
		holdings,
	},
});

export const REQUEST_RESET_ALL = "REQUEST_RESET_ALL";
export const RECEIVE_RESET_ALL = "RECEIVE_RESET_ALL";
export const RESET_ALL = "RESET_ALL";
export const requestResetAll = () => ({
	type: REQUEST_RESET_ALL,
	isLoading: true,
});
export const receiveResetAll = () => ({
	type: RECEIVE_RESET_ALL,
	isLoading: false,
});
export const resetAll = () => {
	return async (dispatch) => {
		try {
			dispatch(requestResetAll());

			// do get previous work day
			const result = await axios.post(location.protocol + "//" + location.host + "/helper/previous_work_day");

			// unauthorized
			if (!result.data.code) {
				window.location = location.protocol + "//" + location.host;
				return;
			}
			else {
				if (result.data.code.type === "ERROR") throw Error(result.data.code.message);
			}

			dispatch(setFromQueryDate(require("date-format")("yyyy-MM-dd", new Date(result.data.data))));
			dispatch(setToQueryDate(require("date-format")("yyyy-MM-dd", new Date())));
			dispatch(setChargeOff([], []));

			dispatch(receiveResetAll());
		} catch (err) {
			dispatch(showMessage({
				type: "ERROR",
				title: "ERROR",
				text: err.message,
			}));
			dispatch(stopLoading());
		}
	};
};



// init
export const REQUEST_INIT_QUERY = "REQUEST_INIT_QUERY";
export const RECEIVE_INIT_QUERY = "RECEIVE_INIT_QUERY";
export const INIT_QUERY = "INIT_QUERY";

export const requestInitQuery = () => ({
	type: REQUEST_INIT_QUERY,
	isLoading: true,
});
export const receiveInitQuery = () => ({
	type: RECEIVE_INIT_QUERY,
	isLoading: false,
});
export const initQuery = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(requestInitQuery());

			// do get previous work day
			const previous = await axios.post(location.protocol + "//" + location.host + "/helper/previous_work_day");

			// unauthorized
			if (!previous.data.code) {
				window.location = location.protocol + "//" + location.host;
				return;
			}
			else {
				if (previous.data.code.type === "ERROR") throw Error(previous.data.code.message);
			}

			dispatch(setFromQueryDate(require("date-format")("yyyy-MM-dd", new Date(previous.data.data))));
			dispatch(setToQueryDate(require("date-format")("yyyy-MM-dd", new Date())));

			// do get user data
			const user = await axios.post(location.protocol + "//" + location.host + "/helper/user");

			// unauthorized
			if (!user.data.code) {
				window.location = location.protocol + "//" + location.host;
				return;
			}
			else {
				if (user.data.code.type === "ERROR") throw Error(user.data.code.message);
			}

			// do request 
			let result = await axios.post(
				location.protocol + "//" + location.host + "/S001C001F003/read", {
					data: {
						"account": user.data.data.user,
						"begin_date": getState().queryDate.from,
						"end_date": getState().queryDate.to,
					}
				}
			);

			// unauthorized
			if (!result.data.code) {
				window.location = location.protocol + "//" + location.host;
				return;
			}
			else {
				if (result.data.code.type === "ERROR") throw Error(result.data.code.message);
				// if (result.data.data.cash.length === 0 &&
				// 	result.data.data.holdings.length === 0) throw new NotFound();
			}

			dispatch(setChargeOff(result.data.data.cash, result.data.data.holdings));

			dispatch(receiveInitQuery());
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
}

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

