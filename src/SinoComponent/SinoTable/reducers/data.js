"use strict";
import {
	SET_TABLE_TITLE,
	SET_TABLE_DATA,
	SET_TABLE_COLUMNS,
	SET_NO_DATA_HINT,
	SET_TABLE_SORT,
	SET_TABLE_FILTER,
} from "../actions";

export const title = (state = "", action) => {
	switch (action.type) {
	case SET_TABLE_TITLE:
		return action.title;
	default:
		return state;
	}
};

export const data = (state = [], action) => {
	switch (action.type) {
	case SET_TABLE_DATA:
		return action.data;
	default:
		return state;
	}
};

export const columns = (state = [], action) => {
	switch (action.type) {
	case SET_TABLE_COLUMNS:
		return action.columns;
	default:
		return state;
	}
};

export const no_data_hint = (state = "", action) => {
	switch (action.type) {
	case SET_NO_DATA_HINT:
		return action.hint;
	default:
		return state;
	}
};

export const sort = (
	state = {
		sort_column: "",
		sort_direct: 0,
	},
	action
) => {
	switch (action.type) {
	case SET_TABLE_SORT:
		return (state.sort_column === action.sort_column) ? (
			{
				sort_column: action.sort_column,
				sort_direct: state.sort_direct * -1
			}
		) : (
			{
				sort_column: action.sort_column,
				sort_direct: 1,
			}
		);
	default:
		return state;
	}
};

export const filter = (state = "", action) => {
	switch (action.type) {
	case SET_TABLE_FILTER:
		return action.filter;
	default:
		return state;
	}
};
