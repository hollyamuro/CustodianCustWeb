"use strict";

import { connect } from "react-redux";
import SinoRoundButton from "../../SinoComponent/SinoRoundButton";
import { loadChargeOff } from "../actions";


const mapStateToProps = state => ({
	text: "Search",
	octicons_icon: "search"
});

const mapDispatchToProps = dispatch => ({
	onButtonClick: ()=>{
		dispatch(loadChargeOff());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoRoundButton);
