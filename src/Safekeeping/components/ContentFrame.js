"use strict";

import React from "react";
import PropTypes from "prop-types";
import ShowHoldingTable from "../containers/ShowHoldingTable";
import ShowBalanceTable from "../containers/ShowBalanceTable";
import ShowBalanceExportBtn from "../containers/ShowBalanceExportBtn";
import ShowHoldingExportBtn from "../containers/ShowHoldingExportBtn";

import "../style.css";

const ContentFrame = ({ enable, }) => (
	(enable) ?
		(
			<div>
				<ShowBalanceExportBtn/>
				<div className="balance-table">
					<ShowBalanceTable />
				</div>
				<br />
				<ShowHoldingExportBtn/>
				<div className="holding-table">
					<ShowHoldingTable />
				</div>
				<br />
			</div>
		) : ("")
);

ContentFrame.propTypes = {
	enable: PropTypes.bool.isRequired,
};
ContentFrame.defaultProps = {
	enable: false
};

export default ContentFrame;
