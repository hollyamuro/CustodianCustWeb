"use strict";

import { connect } from "react-redux";
import SinoTextBox from "../../SinoComponent/SinoTextBox";
import { setIsin } from "../actions";

const mapStateToProps = state => ({
	title: "",
	hint: "",
	text: state.isin,
});

const mapDispatchToProps = dispatch => ({
	onTextChange: (event) => {
		dispatch(setIsin(event.target.value));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoTextBox);
