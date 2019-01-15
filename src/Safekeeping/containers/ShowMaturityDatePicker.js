"use strict";

import { connect } from "react-redux";
import SinoRangeDatePicker from "../../SinoComponent/SinoRangeDatePicker";
import { setFromMaturityDate, setToMaturityDate } from "../actions";

const mapStateToProps = state => ({
	title: "",
	show_hint: false,
	date: state.queryMaturityDate,
});

const mapDispatchToProps = dispatch => ({
	onFromChange: (from) => { 
		const format = require("date-format");
		dispatch(setFromMaturityDate(format("yyyy-MM-dd", from)));
	},
	onToChange: (to) => { 
		const format = require("date-format");
		dispatch(setToMaturityDate(format("yyyy-MM-dd", to)));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoRangeDatePicker);
