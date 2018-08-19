"use strict";

import { connect } from "react-redux";
import SinoDatePicker from "../../SinoComponent/SinoDatePicker";
import { setQueryDate } from "../actions";

const mapStateToProps = state => ({
	title: "Value Date",
	text: state.queryDate,
	disable_date: { after: new Date(), },
});

const mapDispatchToProps = dispatch => ({
	onTextChange: (date) => {
		const format = require("date-format");
		dispatch(setQueryDate(format("yyyy-MM-dd", date)));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoDatePicker);
