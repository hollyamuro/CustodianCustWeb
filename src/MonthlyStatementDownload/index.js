"use strict";

import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import reducer from "./reducers";
import MainFrame from "./components/MainFrame";
import { setYM, checkPermission } from "./actions";

class App extends React.Component {

	constructor(props) {
		super(props);
		let middleWare = [thunkMiddleware];
		if (process.env.NODE_EN + "" !== "production") {
			middleWare = [...middleWare, createLogger()];
		}
		this.store = createStore(reducer, applyMiddleware(...middleWare));
	}

	componentDidMount() {
		//permission
		this.store.dispatch(checkPermission());

		//set default
		let pre = new Date((new Date).setMonth((new Date).getMonth() - 1));
		pre.getFullYear() + "/" + (((pre.getMonth() + 1) >= 10) ? "" : "0") + (pre.getMonth() + 1);
		this.store.dispatch(setYM(pre.getFullYear() + "/" + (((pre.getMonth() + 1) >= 10) ? "" : "0") + (pre.getMonth() + 1)));
	}

	componentDidUpdate() {
		//permission
		this.store.dispatch(checkPermission());

		//set default
		let pre = new Date((new Date).setMonth((new Date).getMonth() - 1));
		pre.getFullYear() + "/" + (((pre.getMonth() + 1) >= 10) ? "" : "0") + (pre.getMonth() + 1);
		this.store.dispatch(setYM(pre.getFullYear() + "/" + (((pre.getMonth() + 1) >= 10) ? "" : "0") + (pre.getMonth() + 1)));
	}

	render() {
		return (
			<Provider store={this.store}>
				<MainFrame />
			</Provider>
		);
	}
}

export default App;

