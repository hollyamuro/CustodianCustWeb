"use strict";

import { connect } from "react-redux";
import TableComponent from "../components/TableComponent";
import { setTableSort } from "../actions";

const getFilterData = (data, filter) => {
	return data.filter((r) => {
		return Object.keys(r).map((key) => {
			return (r[key] && (r[key] + "").includes(filter));
		}).includes(true);
	});
};

const getSortData = (data, sortColumn, sortDirect) => {
	data.sort((a, b) => {
		let sortA = (a.hasOwnProperty(sortColumn)) ? a[sortColumn] : undefined;
		let sortB = (b.hasOwnProperty(sortColumn)) ? b[sortColumn] : undefined;
		return sortDirect * ((sortA < sortB) ? (-1) : ((sortA > sortB) ? (1) : 0));
	});
	return data;
};

const mapStateToProps = state => ({
	columns: state.columns,
	data: getSortData(getFilterData(state.data, state.filter), state.sort.sort_column, state.sort.sort_direct),
	sort: state.sort,
	no_data_hint: state.no_data_hint,
});

const mapDispatchToProps = dispatch => ({
	onSortClick: (column) => { dispatch(setTableSort(column)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
