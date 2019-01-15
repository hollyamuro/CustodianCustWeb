import React from "react";
import ShowYMPicker from "../containers/ShowYMPicker";
import ShowDownLoadButton from "../containers/ShowDownLoadButton";

import "../style.css";

const ToolBar = () => (
	<div className="flex-container">
		<div>
			<ShowYMPicker />
		</div>
		<div className="align-right-mobile">
			<ShowDownLoadButton />
		</div>
		<div></div>
	</div>
);

export default ToolBar;