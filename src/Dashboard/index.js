"use strict";

import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import reducer from "./reducers";
import MainFrame from "./components/MainFrame";
import { loadDashboardCoupon } from "./actions";

let middleWare = [ thunkMiddleware ];
if(process.env.NODE_EN + "" !== "production"){
	middleWare = [...middleWare, createLogger()];
}
const store = createStore(reducer,applyMiddleware(...middleWare));

const App = () => (
	<Provider store={store}>
		<MainFrame />
	</Provider>
);

store.dispatch(loadDashboardCoupon());

export default App;
