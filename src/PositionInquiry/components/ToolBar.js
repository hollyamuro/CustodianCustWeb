import React from "react";
import ShowDatePicker from "../containers/ShowDatePicker";
import ShowButton from "../containers/ShowButton";

import "../style.css";

const ToolBar = () => (
	<div className="flex-container">
		<div>
			<ShowDatePicker />
		</div>
		<div className="align-right-mobile">
			<ShowButton />
		</div>
	</div>
);

export default ToolBar;