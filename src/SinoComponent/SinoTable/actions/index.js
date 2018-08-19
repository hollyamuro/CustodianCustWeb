"use strict";

/**
 * action type & action creators
 */

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

const getCombinedColumns = (data) => {
	let allKeys = [];
	data.map((row) => {
		Object.keys(row).map((key) => {
			if (!allKeys.includes(key)) allKeys.push(key);
		});
	});
	return allKeys;
};

const setColumns = (customizedColumnNames, customizedColumnAlign, columns) => {
	return columns.map((col) => ({
		name: col,
		show_name: (customizedColumnNames.hasOwnProperty(col) ? customizedColumnNames[col] : col),
		align: (customizedColumnAlign.hasOwnProperty(col) ? customizedColumnAlign[col] : "left"),
	}));
};


export const SET_TABLE_COLUMNS = "SET_TABLE_COLUMNS";
export const setTableColumns = (data, col_name, col_align) => {
	return {
		type: SET_TABLE_COLUMNS,
		columns: setColumns(col_name, col_align, getCombinedColumns(data)),
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