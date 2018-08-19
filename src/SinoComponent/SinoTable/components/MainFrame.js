"use strict";

import React from "react";
import ShowTable from "../containers/ShowTable";
import ShowTitle from "../containers/ShowTitle";
import ShowSearch from "../containers/ShowSearch";

const MainFrame = () => (
	<div>
		<div className="row">
			<div className="col-sm-4"><ShowTitle /></div>
			<div className="col-sm-4"></div>
			<div className="col-sm-4 align-right"><ShowSearch /></div>
		</div>
		<ShowTable />
	</div>
);

export default MainFrame;
