"use strict";

import { connect } from "react-redux";
import SinoRoundTextBox from "../../SinoRoundTextBox";
import { setTableFilter } from "../actions";

const mapStateToProps = state => ({
	title: "",
	hint: "Search...",
	text: state.filter,
});

const mapDispatchToProps = dispatch => ({
	onTextChange: (event) => { dispatch(setTableFilter(event.target.value)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoRoundTextBox);
