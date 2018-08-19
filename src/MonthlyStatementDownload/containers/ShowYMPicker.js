"use strict";

import { connect } from "react-redux";
import SinoSelect from "../../SinoComponent/SinoSelect";
import { setQueryYM } from "../actions";

const getLeastNMonth = (n = 0) => {
	let returnValue = [];
	for (let i = 0; i < n; i++) {
		returnValue.push(i);
	}

	let current = new Date();
	return ["", ...(returnValue.map((i) => {
		let pre = new Date((new Date).setMonth((new Date).getMonth() - i));
		return returnValue = pre.getFullYear() + "/" + (((pre.getMonth() + 1)>=10)?"":"0") + (pre.getMonth() + 1);
	}))];
}

const mapStateToProps = state => ({
	title: "",
	hint: "",
	options: getLeastNMonth(6),
	selectedOption: state.ym,
});

const mapDispatchToProps = dispatch => ({
	onOptionChange: (event) => {
		dispatch(setQueryYM(event.target.value));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoSelect);
