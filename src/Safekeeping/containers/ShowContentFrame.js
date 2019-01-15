"use strict";

import { connect } from "react-redux";
import ContentFrame from "../components/ContentFrame";

const mapStateToProps = state => ({
	// enable: (
	// 	(state.queryPositionDate.from !== "" && state.queryPositionDate.to !== "") &&
	// 	((state.balance && state.balance.length > 0) || (state.holding && state.holding.length > 0))
	// ),
	enable: true,
});

export default connect(mapStateToProps, null)(ContentFrame);