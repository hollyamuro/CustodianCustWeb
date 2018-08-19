"use strict";

import { connect } from "react-redux";
import ContentFrame from "../components/ContentFrame";

const mapStateToProps = state => ({
	enable: (
		(state.queryDate.from !== "" && state.queryDate.to !== "") &&
		((state.notChargeOff.cash && state.notChargeOff.cash.length > 0) ||
			(state.notChargeOff.holdings && state.notChargeOff.holdings.length > 0))
	),
});

export default connect(mapStateToProps, null)(ContentFrame);