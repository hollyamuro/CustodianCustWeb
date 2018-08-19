"use strict";

import React from "react";
import ToolBar from "./ToolBar";
import ShowLoading from "../containers/ShowLoading";
import ShowMessage from "../containers/ShowMessage";
import ShowContentFrame from "../containers/ShowContentFrame";

import "../style.css";

const MainFrame = () => (
	<div>
		<ToolBar /><br />
		<ShowContentFrame />
		<ShowLoading />
		<ShowMessage />
	</div>
);

export default MainFrame;
