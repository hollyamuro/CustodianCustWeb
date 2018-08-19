"use strict";

import React from "react";
import PropTypes from "prop-types";
import PortfolioSummaryTable from "./PortfolioSummaryTable";
import SecuritiesHoldingsTable from "./SecuritiesHoldingsTable";


import "../style.css";

const ContentFrame = ({ enable, }) => (
	(enable) ?
		(<div>
			<PortfolioSummaryTable />
			<SecuritiesHoldingsTable />
		</div>) : ("")
);

ContentFrame.prototype = {
	enable: PropTypes.bool.isRequired,
};
ContentFrame.defaultProps = {
	enable: false
};

export default ContentFrame;
