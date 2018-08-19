"use strict";

import { connect } from "react-redux";
import ContentFrame from "../components/ContentFrame";

const mapStateToProps = state => ({
	enable: (
		(state.queryDate !== "") &&
                (   state.position.cash.length > 0 || 
                    state.position.bond.length > 0 ||
                    state.position.rp.length > 0 ||
                    state.position.rs.length > 0
                )
	),
});

export default connect(mapStateToProps, null)(ContentFrame);