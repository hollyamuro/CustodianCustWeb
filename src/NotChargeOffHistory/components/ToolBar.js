import React from "react";
import ShowDatePicker from "../containers/ShowDatePicker";
import ShowButton from "../containers/ShowButton";

import "../style.css";

const ToolBar = () => (
	<div>
		<div className="row">
			<div className="col-sm-6">
				<ShowDatePicker/>
			</div>
			<div className="col-sm-6 align-right-mobile">
				<small><br /></small>
				<ShowButton />
			</div>
		</div>
	</div>
);

export default ToolBar;