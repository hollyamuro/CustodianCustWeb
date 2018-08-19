import React from "react";
import ShowDatePicker from "../containers/ShowDatePicker";
import ShowButton from "../containers/ShowButton";

import "../style.css";

const ToolBar = () => (
	<div className="row">
		<div className="col-sm-4">
			<ShowDatePicker />
		</div>
		<div className="col-sm-4 align-right-mobile">
			<small><br /></small>
			<ShowButton />
		</div>
		<div className="col-sm-4"></div>
	</div>
);

export default ToolBar;