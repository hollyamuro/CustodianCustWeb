import React from "react";
import ShowYMPicker from "../containers/ShowYMPicker";
import ShowButton from "../containers/ShowButton";

import "../style.css";

const ToolBar = () => (
	<div>
		<div className="row">
			<div className="col-sm-4">
				<ShowYMPicker/>
			</div>
			<div className="col-sm-2 align-right-mobile">
				<ShowButton />
			</div>
			<div className="col-sm-6"></div>
		</div>
	</div>
);

export default ToolBar;