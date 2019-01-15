import {
	SET_YM	
} from "../actions";

export const ym = ( state = "", action ) => {
	switch (action.type) {
	case SET_YM:
		return action.ym;
	default:
		return state;
	}
};