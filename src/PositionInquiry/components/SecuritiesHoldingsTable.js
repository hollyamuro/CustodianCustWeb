import React from "react";
import ShowBondTable from "../containers/ShowBondTable";
import ShowRPTable from "../containers/ShowRPTable";
import ShowRSTable from "../containers/ShowRSTable";

import "../style.css";

const SecuritiesHoldingsTable = () => (
	<div>
		<p className="position-title">Securities Holdings</p>

		<div className="bond-table">
			<ShowBondTable />
		</div><br />

		<div className="rp-table">
			<ShowRPTable />
		</div><br />

		<div className="rs-table">
			<ShowRSTable />
		</div><br />
	</div>
);

export default SecuritiesHoldingsTable;