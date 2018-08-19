"use strict";

import React from "react";
import ToolBar from "./ToolBar";
import ShowLoading from "../containers/ShowLoading";
import ShowMessage from "../containers/ShowMessage";

import "../style.css";

const MainFrame = () => (
	<div>
		<ToolBar /><br />
		<ShowLoading />
		<ShowMessage />
	</div>
);

export default MainFrame;
