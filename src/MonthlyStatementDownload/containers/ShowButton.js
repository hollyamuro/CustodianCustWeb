"use strict";

import { connect } from "react-redux";
import SinoRoundButton from "../../SinoComponent/SinoRoundButton";
import { loadMonthlyStatement } from "../actions";


const mapStateToProps = state => ({
	text: "Search",
	octicons_icon: "search"
});

const mapDispatchToProps = dispatch => ({
	onButtonClick: ()=>{
		dispatch(loadMonthlyStatement());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoRoundButton);
