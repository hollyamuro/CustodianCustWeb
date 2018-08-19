"use strict";

/**
 * action type & action creators
 */

import axios from "axios";
import { Unauthorized, NotFound } from "../../SinoComponent/SinoErrorHander";

export const REQUEST_LOAD_MONTHLY_STATEMENT = "REQUEST_LOAD_MONTHLY_STATEMENT";
export const RECEIVE_LOAD_MONTHLY_STATEMENT = "RECEIVE_LOAD_MONTHLY_STATEMENT";
export const LOAD_MONTHLY_STATEMENT = "LOAD_MONTHLY_STATEMENT";

export const requestLoadMonthlyStatement = () => ({
	type: REQUEST_LOAD_MONTHLY_STATEMENT,
	isLoading: true,
});
export const receiveLoadMonthlyStatement = () => ({
	type: RECEIVE_LOAD_MONTHLY_STATEMENT,
	isLoading: false,
});
export const loadMonthlyStatement = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(requestLoadMonthlyStatement());

			// //do get user data
			// const user = await axios.post(location.protocol + "//" + location.host + "/helper/user");

			// // do request 
			// let result = await axios.post(
			// 	location.protocol + "//" + location.host + "/S001C001F003/read", {
			// 		data: {
			// 			"account": user.data.data.user,
			// 			"begin_date": getState().queryDate.from,
			// 			"end_date": getState().queryDate.to,
			// 		}
			// 	}
			// );

			// // validate
			// if (!result.data.code) throw new Unauthorized();
			// if (result.data.code.type === "ERROR") throw Error(result.data.code.message);
			// if (result.data.data.cash.length === 0 &&
			// 	result.data.data.holdings.length === 0 ) throw new NotFound();

			// do reponse
			dispatch(receiveLoadMonthlyStatement());
		} catch (err) {
			dispatch(setQueryYM(""));
			dispatch(showMessage({
				type: "ERROR",
				title: "ERROR",
				text: err.message,
			}));
			dispatch(stopLoading());
		}
	};
};



//set inquiry month
export const SET_QUERY_YM = "SET_QUERY_YM";
export const setQueryYM = (ym) => ({
	type: SET_QUERY_YM,
	ym,
});



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

