"use strict";

/**
 * get combined columns for table
 * @param  {Array.<object>} data
 */
export const getCombinedColumns = (data) => {
	let allKeys = [];
	data.map((row) => {
		Object.keys(row).map((key) => {
			if (!allKeys.includes(key)) allKeys.push(key);
		});
	});
	return allKeys;
};

/**
 * set column UI properties
 * @param  {Object} customizedColumnNames object describes show names of columns
 * @param  {Object} customizedColumnAlign object describes align of columns
 * @param  {Object} customizedColumnSize object describes size of columns
 * @param  {Array.<string>} columns array of columns
 */
export const setColumns = (customizedColumnNames, customizedColumnAlign, customizedColumnSize, columns) => {
	return columns.map((col) => ({
		name: col,
		show_name: (customizedColumnNames.hasOwnProperty(col) ? customizedColumnNames[col] : col),
		align: (customizedColumnAlign.hasOwnProperty(col) ? customizedColumnAlign[col] : "left"),
		size: (customizedColumnSize.hasOwnProperty(col) ? customizedColumnSize[col] : ""),
	}));
};

/**
 * @param  {} data
 * @param  {} filter
 */
export const getFilterData = (data, filter) => {
	return data.filter((r) => {
		return Object.keys(r).map((key) => {
			return (r[key] && (r[key] + "").includes(filter));
		}).includes(true);
	});
};

/**
 * @param  {} data
 * @param  {} sortColumn
 * @param  {} sortDirect
 */
export const getSortData = (data, sortColumn, sortDirect) => {
	if (sortColumn === "" || sortDirect === 0) return data;
	data.sort((a, b) => {
		let normalizeA = (a.hasOwnProperty(sortColumn)) ?
			((typeof a[sortColumn] === 'string') ? a[sortColumn].replace(/,/g, "") : a[sortColumn]) : undefined;
		let normalizeB = (b.hasOwnProperty(sortColumn)) ?
			((typeof b[sortColumn] === 'string') ? b[sortColumn].replace(/,/g, "") : b[sortColumn]) : undefined;
		let sortA = isNaN(normalizeA) ? normalizeA : (new Number(normalizeA));
		let sortB = isNaN(normalizeB) ? normalizeB : (new Number(normalizeB));
		return sortDirect * ((sortA < sortB) ? (-1) : ((sortA > sortB) ? (1) : 0));
	});
	return data;
};