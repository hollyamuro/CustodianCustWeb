"use strict";

import { connect } from "react-redux";
import TableComponent from "../components/TableComponent";
import { setTableSort } from "../actions";
import { getSortData, getFilterData } from '../utils/helpers'

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
