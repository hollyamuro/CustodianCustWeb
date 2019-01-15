import {
	SET_FROM_POSITION_DATE,
	SET_TO_POSITION_DATE,
	SET_ACCOUNT,
	SET_ISIN,
	SET_FROM_MATURITY_DATE,
	SET_TO_MATURITY_DATE,
	RECEIVE_LOAD_SAFEKEEPING,
	SET_SAFEKEEPING,
} from "../actions";

// search argument
export const queryPositionDate = (
	state = {
		from: "",
		to: "",
	},
	action
) => {
	switch (action.type) {
	case SET_FROM_POSITION_DATE:
		return {
			from: action.from,
			to: state.to,
		};
	case SET_TO_POSITION_DATE:
		return {
			from: state.from,
			to: action.to,
		};
	default:
		return state;
	}
};

export const account = (state = "", action) => {
	switch (action.type) {
	case SET_ACCOUNT:
		return action.account;
	default:
		return state;
	}
};

export const isin = (state = "", action) => {
	switch (action.type) {
	case SET_ISIN:
		return action.isin;
	default:
		return state;
	}
};

export const queryMaturityDate = (
	state = {
		from: "",
		to: "",
	},
	action
) => {
	switch (action.type) {
	case SET_FROM_MATURITY_DATE:
		return {
			from: action.from,
			to: state.to,
		};
	case SET_TO_MATURITY_DATE:
		return {
			from: state.from,
			to: action.to,
		};
	default:
		return state;
	}
};

// data
export const balance = (state = [], action) => {
	switch (action.type) {
	case RECEIVE_LOAD_SAFEKEEPING:
	case SET_SAFEKEEPING:
		return action.balance;
	default:
		return state;
	}
};

export const holding = (state = [], action) => {
	switch (action.type) {
	case RECEIVE_LOAD_SAFEKEEPING:
	case SET_SAFEKEEPING:
		return action.holding;
	default:
		return state;
	}
};

