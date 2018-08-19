"use strict";

import React from "react";
import PropTypes from "prop-types";
import ShowCashTable from "../containers/ShowCashTable";
import ShowHoldingsTable from "../containers/ShowHoldingsTable";

import "../style.css";

const ContentFrame = ({ enable, }) => (
	(enable) ?
		(<div>
			<div>
				<div className="cash-table">
					<ShowCashTable />
				</div>
				<br />
				<div className="holdings-table">
					<ShowHoldingsTable />
				</div>
				<br />
			</div>
		</div>) : ("")
);

ContentFrame.prototype = {
	enable: PropTypes.bool.isRequired,
};
ContentFrame.defaultProps = {
	enable: false
};

export default ContentFrame;
