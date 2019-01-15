"use strict";

/**
 * action type & action creators
 */
import { setColumns, getCombinedColumns } from '../utils/helpers'

export const SET_TABLE_TITLE = "SET_TABLE_TITLE";
export const setTableTitle = (title) => ({
	type: SET_TABLE_TITLE,
	title,
});

export const SET_TABLE_DATA = "SET_TABLE_DATA";
export const setTableData = (data) => ({
	type: SET_TABLE_DATA,
	data,
});

export const SET_NO_DATA_HINT = "SET_NO_DATA_HINT";
export const setNoDataHint = (hint) => ({
	type: SET_NO_DATA_HINT,
	hint,
});

export const SET_TABLE_COLUMNS = "SET_TABLE_COLUMNS";
export const setTableColumns = (data, col_name, col_align, col_size) => {
	return {
		type: SET_TABLE_COLUMNS,
		columns: setColumns(col_name, col_align, col_size, getCombinedColumns(data)),
	};
};

export const SET_TABLE_SORT = "SET_TABLE_SORT";
export const setTableSort = (sortColumn) => ({
	type: SET_TABLE_SORT,
	sort_column: sortColumn,
});

export const SET_TABLE_FILTER = "SET_TABLE_FILTER";
export const setTableFilter = (filter) => ({
	type: SET_TABLE_FILTER,
	filter,
});