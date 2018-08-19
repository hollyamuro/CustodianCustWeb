import React from "react";
import ShowCashTable from "../containers/ShowCashTable";

import "../style.css";

const PortfolioSummaryTable = () => (
	<div>
		<p className="position-title">Portfolio Summary</p>
		<div className="cash-table">
			<ShowCashTable />
		</div>
		<br />
	</div>
);

export default PortfolioSummaryTable;