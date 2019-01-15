"use strict";

import { connect } from "react-redux";
import SinoTextBox from "../../SinoComponent/SinoTextBox";
import { setAccount } from "../actions";

const mapStateToProps = state => ({
	title: "",
	hint: "",
	text: state.account,
});

const mapDispatchToProps = dispatch => ({
	onTextChange: (event) => {
		dispatch(setAccount(event.target.value));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoTextBox);
