import {
	RECEIVE_LOAD_POSITION,
	SET_QUERY_DATE,
	RESET_POSITION,
} from "../actions";

export const position = ( 
	state={
		cash: [],
		bond: [],
		rp: [],
		rs: [],
	}, 
	action
) => {
	switch(action.type){
	case RECEIVE_LOAD_POSITION:
	case RESET_POSITION:
		return action.position;
	default:
		return state;
	}
};

export const queryDate = ( state = "", action) => {
	switch(action.type){
	case SET_QUERY_DATE:
		return action.queryDate;
	default:
		return state;
	}
};