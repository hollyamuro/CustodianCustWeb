import React from "react";
import ShowPositionDatePicker from "../containers/ShowPositionDatePicker";
import ShowMaturityDatePicker from "../containers/ShowMaturityDatePicker";
import ShowAccountText from "../containers/ShowAccountText";
import ShowIsinText from "../containers/ShowIsinText";
import ShowButton from "../containers/ShowButton";

import "../style.css";

const ToolBar = () => (
	<div>
		<div className="inline">
			<div className="row-item">
				<div className="input-column-title">Position Date</div>
				<div className="input-column">
					<ShowPositionDatePicker />
				</div>
			</div>
			<div className="row-item">
				<div className="input-column-title">Client Account</div>
				<div className="input-column">
					<ShowAccountText />
				</div>
			</div>
			<div className="row-item">
				<div className="input-column-title">Isin</div>
				<div className="input-column">
					<ShowIsinText />
				</div>
			</div>
			<div className="row-item">
				<div className="input-column-title">Maturity Date</div>
				<div className="input-column">
					<ShowMaturityDatePicker />
				</div>
			</div>
		</div>
		<div id="search-button">
			<ShowButton />
		</div>
	</div>
);

export default ToolBar;