"use strict";

/**
 * action type & action creators
 */

import axios from "axios";
import { NotFound } from "../../SinoComponent/SinoErrorHandler";

// load safekeeping data
export const REQUEST_LOAD_SAFEKEEPING = "REQUEST_LOAD_SAFEKEEPING";
export const RECEIVE_LOAD_SAFEKEEPING = "RECEIVE_LOAD_SAFEKEEPING";
export const DO_LOAD_SAFEKEEPING = "DO_LOAD_SAFEKEEPING";
export const requestLoadSafekeeping = () => ({
	type: REQUEST_LOAD_SAFEKEEPING,
	isLoading: true,
});
export const receiveLoadSafekeeping = (balance, holding) => ({
	type: RECEIVE_LOAD_SAFEKEEPING,
	isLoading: false,
	balance,
	holding,
});
export const doLoadSafekeeping = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(requestLoadSafekeeping());

			// do request 
			let balance = await axios.post(
				location.protocol + "//" + location.host + "/S001C001F004/read/balance", {
					data: {
						"begin_pdate": getState().queryPositionDate.from,
						"end_pdate": getState().queryPositionDate.to,
						"client_account": getState().account,
					}
				}
			);

			let holding = await axios.post(
				location.protocol + "//" + location.host + "/S001C001F004/read/holding", {
					data: {
						"begin_pdate": getState().queryPositionDate.from,
						"end_pdate": getState().queryPositionDate.to,
						"client_account": getState().account,
						"isin": getState().isin,
						"begin_mdate": getState().queryMaturityDate.from,
						"end_mdate": getState().queryMaturityDate.to,
					}
				}
			);

			// validate
			if (!balance.data.code || !holding.data.code) {
				window.location = location.protocol + "//" + location.host;
				return;
			} else {
				if (balance.data.code.type === "ERROR") throw Error(balance.data.code.message);
				if (holding.data.code.type === "ERROR") throw Error(holding.data.code.message);
				// if (balance.data.data.length === 0 &&
				// 	holding.data.data.length === 0) throw new NotFound();
			}

			// do reponse
			dispatch(receiveLoadSafekeeping(balance.data.data, holding.data.data));

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


//set position data
export const SET_FROM_POSITION_DATE = "SET_FROM_POSITION_DATE";
export const SET_TO_POSITION_DATE = "SET_TO_POSITION_DATE";
export const setFromPositionDate = (from) => ({
	type: SET_FROM_POSITION_DATE,
	from,
});
export const setToPositionDate = (to) => ({
	type: SET_TO_POSITION_DATE,
	to,
});

//set maturity data
export const SET_FROM_MATURITY_DATE = "SET_FROM_MATURITY_DATE";
export const SET_TO_MATURITY_DATE = "SET_TO_MATURITY_DATE";
export const setFromMaturityDate = (from) => ({
	type: SET_FROM_MATURITY_DATE,
	from,
});
export const setToMaturityDate = (to) => ({
	type: SET_TO_MATURITY_DATE,
	to,
});

// set account
export const SET_ACCOUNT = "SET_ACCOUNT";
export const setAccount = (account) => ({
	type: SET_ACCOUNT,
	account,
});

// set isin
export const SET_ISIN = "SET_ISIN";
export const setIsin = (isin) => ({
	type: SET_ISIN,
	isin,
});


//reset
export const SET_SAFEKEEPING = "SET_SAFEKEEPING";
export const setSafekeeping = ( balance, holding) => ({
	type: SET_SAFEKEEPING,
	balance,
	holding,
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

			dispatch(setFromPositionDate(require("date-format")("yyyy-MM-dd", new Date(result.data.data))));
			dispatch(setToPositionDate(require("date-format")("yyyy-MM-dd", new Date())));
			dispatch(setFromMaturityDate(""));
			dispatch(setToMaturityDate(""));
			dispatch(setAccount(""));
			dispatch(setIsin(""));
			dispatch(setSafekeeping([],[]));

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
export const INIT_QUERY = 'INIT_QUERY'
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
			const result = await axios.post(location.protocol + "//" + location.host + "/helper/previous_work_day");

			// unauthorized
			if (!result.data.code) {
				window.location = location.protocol + "//" + location.host;
				return;
			}
			else {
				if (result.data.code.type === "ERROR") throw Error(result.data.code.message);
			}

			dispatch(setFromPositionDate(require("date-format")("yyyy-MM-dd", new Date(result.data.data))));
			dispatch(setToPositionDate(require("date-format")("yyyy-MM-dd", new Date())));
			dispatch(setFromMaturityDate(""));
			dispatch(setToMaturityDate(""));
			dispatch(setAccount(""));
			dispatch(setIsin(""));
			
			// do request 
			let balance = await axios.post(
				location.protocol + "//" + location.host + "/S001C001F004/read/balance", {
					data: {
						"begin_pdate": getState().queryPositionDate.from,
						"end_pdate": getState().queryPositionDate.to,
						"client_account": getState().account,
					}
				}
			);

			let holding = await axios.post(
				location.protocol + "//" + location.host + "/S001C001F004/read/holding", {
					data: {
						"begin_pdate": getState().queryPositionDate.from,
						"end_pdate": getState().queryPositionDate.to,
						"client_account": getState().account,
						"isin": getState().isin,
						"begin_mdate": getState().queryMaturityDate.from,
						"end_mdate": getState().queryMaturityDate.to,
					}
				}
			);

			// validate
			if (!balance.data.code || !holding.data.code) {
				window.location = location.protocol + "//" + location.host;
				return;
			} else {
				if (balance.data.code.type === "ERROR") throw Error(balance.data.code.message);
				if (holding.data.code.type === "ERROR") throw Error(holding.data.code.message);
				// if (balance.data.data.length === 0 &&
				// 	holding.data.data.length === 0) throw new NotFound();
			}

			// do reponse
			dispatch(setSafekeeping(balance.data.data, holding.data.data));

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

