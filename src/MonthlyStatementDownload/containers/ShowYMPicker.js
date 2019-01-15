"use strict";

import { connect } from "react-redux";
import SinoSelect from "../../SinoComponent/SinoSelect";
import { setYM } from "../actions";
import { getLeastNMonth } from '../utils/helpers'

const mapStateToProps = state => ({
	title: "",
	hint: "",
	options: getLeastNMonth(6),
	selectedOption: state.ym,
});

const mapDispatchToProps = dispatch => ({
	onOptionChange: (event) => {
		dispatch(setYM(event.target.value));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoSelect);
