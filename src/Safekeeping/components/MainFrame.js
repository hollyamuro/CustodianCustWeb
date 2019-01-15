"use strict";

import React from "react";
import ShowLoading from "../containers/ShowLoading";
import ShowMessage from "../containers/ShowMessage";
import ToolBar from "../components/ToolBar";
import ShowContentFrame from "../containers/ShowContentFrame";

import "../style.css";

const MainFrame = () => (
	<div>
		<ToolBar /> <br />
		<ShowContentFrame /><br />
		<ShowLoading />
		<ShowMessage />
	</div>
);

export default MainFrame;
