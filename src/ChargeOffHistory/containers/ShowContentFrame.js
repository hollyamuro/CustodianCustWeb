"use strict";

import { connect } from "react-redux";
import ContentFrame from "../components/ContentFrame";

const mapStateToProps = state => ({
	enable: (
		(state.queryDate.from !== "" && state.queryDate.to !== "") &&
		((state.chargeOff.cash && state.chargeOff.cash.length > 0) ||
			(state.chargeOff.holdings && state.chargeOff.holdings.length > 0))
	),
});

export default connect(mapStateToProps, null)(ContentFrame);