"use strict";

import { connect } from "react-redux";
import SinoRoundButton from "../../SinoComponent/SinoRoundButton";
import { loadPosition } from "../actions";


const mapStateToProps = state => ({
	text: "Search",
	octicons_icon: "search"
});

const mapDispatchToProps = dispatch => ({
	onButtonClick: (event)=>{
		dispatch(loadPosition());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoRoundButton);
