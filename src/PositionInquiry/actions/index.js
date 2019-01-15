"use strict";

/**
 * action type & action creators
 */

import axios from "axios";
import { NotFound } from "../../SinoComponent/SinoErrorHandler";

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
				location.protocol + "//" + location.host + "/S001C001F001/read", {
					data: {
						"account": user.data.data.user,
						"query_date": getState().queryDate,
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
				// 	result.data.data.bond.length === 0 &&
				// 	result.data.data.rp.length === 0 &&
				// 	result.data.data.rs.length === 0) throw new NotFound();
			}

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
export const SET_POSITION = "SET_POSITION";
export const setPosition = (cash, bond, rp, rs) => ({
	type: SET_POSITION,
	position: {
		cash,
		bond,
		rp,
		rs,
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

			//do get previous work day
			const result = await axios.post(location.protocol + "//" + location.host + "/helper/previous_work_day");

			// unauthorized
			if (!result.data.code) {
				window.location = location.protocol + "//" + location.host;
				return;
			}
			else {
				if (result.data.code.type === "ERROR") throw Error(result.data.code.message);
			}

			dispatch(setQueryDate(require("date-format")("yyyy-MM-dd", new Date(result.data.data))));
			dispatch(setPosition([], [], [], []));

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

export const REQUEST_INIT_QUERY = 'REQUEST_INIT_QUERY';
export const RECEIVE_INIT_QUERY = 'RECEIVE_INIT_QUERY';
export const INIT_QUERY = 'INIT_QUERY';
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

			//do get previous work day
			const previous = await axios.post(location.protocol + "//" + location.host + "/helper/previous_work_day");

			// unauthorized
			if (!previous.data.code) {
				window.location = location.protocol + "//" + location.host;
				return;
			}
			else {
				if (previous.data.code.type === "ERROR") throw Error(previous.data.code.message);
			}

			dispatch(setQueryDate(require("date-format")("yyyy-MM-dd", new Date(previous.data.data))));

			//do get user data
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
				location.protocol + "//" + location.host + "/S001C001F001/read", {
					data: {
						"account": user.data.data.user,
						"query_date": getState().queryDate,
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
				// 	result.data.data.bond.length === 0 &&
				// 	result.data.data.rp.length === 0 &&
				// 	result.data.data.rs.length === 0) throw new NotFound();
			}

			// do reponse
			dispatch(setPosition(
				result.data.data.cash,
				result.data.data.bond,
				result.data.data.rp,
				result.data.data.rs
			));

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
	}
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

