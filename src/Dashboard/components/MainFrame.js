"use strict";

import React from "react";
import CouponShowTable from "../containers/CouponShowTable";
import ShowLoading from "../containers/ShowLoading";
import ShowMessage from "../containers/ShowMessage";

const MainFrame = () => (
	<div>
		<CouponShowTable/>
		<ShowLoading/>
		<ShowMessage/>
	</div>
);

export default MainFrame;
