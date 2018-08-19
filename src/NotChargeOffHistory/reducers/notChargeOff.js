import {
	RECEIVE_LOAD_NOT_CHARGE_OFF,
	SET_FROM_QUERY_DATE,
	SET_TO_QUERY_DATE,
	RESET_NOT_CHARGE_OFF,
} from "../actions";

export const notChargeOff = (
	state = {
		cash: [],
		holdings: [],
	},
	action
) => {
	switch (action.type) {
	case RECEIVE_LOAD_NOT_CHARGE_OFF:
	case RESET_NOT_CHARGE_OFF:
		return action.notChargeOff;
	default:
		return state;
	}
};

export const queryDate = (
	state = {
		from: "",
		to: "",
	},
	action
) => {
	switch (action.type) {
	case SET_FROM_QUERY_DATE:
		return {
			from: action.from,
			to: state.to,
		};
	case SET_TO_QUERY_DATE:
		return {
			from: state.from,
			to: action.to,
		};
	default:
		return state;
	}
};