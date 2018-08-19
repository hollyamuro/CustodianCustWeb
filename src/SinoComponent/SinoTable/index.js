"use strict";

import React from "react";
import PropTypes from "prop-types";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import reducer from "./reducers";
import MainFrame from "./components/MainFrame";
import { setTableTitle, setTableData, setTableColumns, setNoDataHint } from "./actions";

class App extends React.Component {

	constructor(props) {
		super(props);
		let middleWare = [thunkMiddleware];
		if (process.env.NODE_EN + "" !== "production") {
			middleWare = [...middleWare, createLogger()];
		}
		this.store = createStore(reducer, applyMiddleware(...middleWare));
		this.store.dispatch(setTableTitle(this.props.title));
		this.store.dispatch(setTableData(this.props.data));
		this.store.dispatch(setTableColumns(this.props.data, this.props.column_names, this.props.column_align));
		this.store.dispatch(setNoDataHint(this.props.no_data_hint));
	}

	componentWillReceiveProps(nextProps) {
		this.store.dispatch(setTableTitle(nextProps.title));
		this.store.dispatch(setTableData(nextProps.data));
		this.store.dispatch(setTableColumns(nextProps.data, nextProps.column_names, nextProps.column_align));
		this.store.dispatch(setNoDataHint(nextProps.no_data_hint));
	}

	render() {
		return (
			<Provider store={this.store}>
				<MainFrame />
			</Provider>
		);
	}
}

App.propTypes = {
	title: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	column_names: PropTypes.object.isRequired,
	column_align: PropTypes.object.isRequired, /* left, right, center */
	no_data_hint: PropTypes.string.isRequired,
};
App.defaultProps = {
	title: "",
	data: [],
	column_names: {},
	column_align: {},
	no_data_hint: "No Data",
};

export default App;