"use strict";

import { connect } from "react-redux";
import SinoRangeDatePicker from "../../SinoComponent/SinoRangeDatePicker";
import { setFromQueryDate, setToQueryDate } from "../actions";

const mapStateToProps = state => ({
	title: "Value Date",
	date: state.queryDate,
});

const mapDispatchToProps = dispatch => ({
	onFromChange: (from) => { 
		const format = require("date-format");
		dispatch(setFromQueryDate(format("yyyy-MM-dd", from)));
	},
	onToChange: (to) => { 
		const format = require("date-format");
		dispatch(setToQueryDate(format("yyyy-MM-dd", to)));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoRangeDatePicker);
