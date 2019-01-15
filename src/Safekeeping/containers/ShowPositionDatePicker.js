"use strict";

import { connect } from "react-redux";
import SinoRangeDatePicker from "../../SinoComponent/SinoRangeDatePicker";
import { setFromPositionDate, setToPositionDate } from "../actions";

const mapStateToProps = state => ({
	title: "",
	show_hint: false,
	date: state.queryPositionDate,
});

const mapDispatchToProps = dispatch => ({
	onFromChange: (from) => { 
		const format = require("date-format");
		dispatch(setFromPositionDate(format("yyyy-MM-dd", from)));
	},
	onToChange: (to) => { 
		const format = require("date-format");
		dispatch(setToPositionDate(format("yyyy-MM-dd", to)));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoRangeDatePicker);
