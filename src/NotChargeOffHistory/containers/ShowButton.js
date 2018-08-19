"use strict";

import { connect } from "react-redux";
import SinoRoundButton from "../../SinoComponent/SinoRoundButton";
import { loadNotChargeOff } from "../actions";


const mapStateToProps = state => ({
	text: "Search",
	octicons_icon: "search"
});

const mapDispatchToProps = dispatch => ({
	onButtonClick: ()=>{
		dispatch(loadNotChargeOff());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoRoundButton);
