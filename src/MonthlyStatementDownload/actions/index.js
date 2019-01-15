"use strict";

/**
 * action type & action creators
 */
import axios from "axios";

export const REQUEST_CHECK_PERMISSION = "REQUEST_CHECK_PERMISSION";
export const RECEIVE_CHECK_PERMISSION = "RECEIVE_CHECK_PERMISSION";
export const CHECK_PERMISSION = "CHECK_PERMISSION";
export const requestCheckPermission = () => ({
	type: REQUEST_CHECK_PERMISSION,
	isLoading: true,
});
export const receiveCheckPermission = () => ({
	type: RECEIVE_CHECK_PERMISSION,
	isLoading: false,
});
export const checkPermission = ()=>{
	return async (dispatch, getState) => {
		try {
			dispatch(requestCheckPermission());

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

			// do reponse
			dispatch(receiveCheckPermission());

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


//set YM
export const SET_YM = "SET_YM";
export const setYM = (ym) => ({
	type: SET_YM, 
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

