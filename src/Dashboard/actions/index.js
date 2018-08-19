"use strict";

/**
 * action type & action creators
 */
import axios from "axios";
import { Unauthorized } from "../../SinoComponent/SinoErrorHander";

/* load coupon payment */
export const REQUEST_LOAD_DASHBOARD_COUPON = "REQUEST_LOAD_DASHBOARD_COUPON";
export const RECEIVE_LOAD_DASHBOARD_COUPON = "RECEIVE_LOAD_DASHBOARD_COUPON";
export const LOAD_DASHBOARD_COUPON = "LOAD_DASHBOARD_COUPON";

export const requestLoadDashboardCoupon = () => ({
	type: REQUEST_LOAD_DASHBOARD_COUPON,
	isLoading: true,
});
export const receiveLoadDashboardCoupon = (coupon) => ({
	type: RECEIVE_LOAD_DASHBOARD_COUPON,
	isLoading: false,
	coupon,
});
export const loadDashboardCoupon = () => {
	return async (dispatch)=>{
		try{
            
			//start request
			dispatch(requestLoadDashboardCoupon());
            
			//do get user data
			const user = await axios.post(location.protocol + "//" + location.host + "/helper/user");
            
			//do request
			const result = await axios.post(
				location.protocol + "//" + location.host + "/dashboard/read",{ data: { "account": user.data.data.user, } });
        
			//validate
			if(!result.data.code) throw new Unauthorized();
			if(result.data.code.type === "ERROR") throw Error(result.data.code.message);

			//end of request
			dispatch(receiveLoadDashboardCoupon(result.data.data));
           
		}catch(err){
			dispatch(showMessage({ type: "ERROR", title: "ERROR", text: err.message, }));
			dispatch(stopLoading());
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

