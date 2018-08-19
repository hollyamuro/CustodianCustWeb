"use strict";

import { connect } from "react-redux";
import  SinoPopout from "../../SinoComponent/SinoPopout";
import { hideMessage  } from "../actions";

const mapStateToProps = state => ({
	type:   state.msg.type,
	title:  state.msg.title,
	text:   state.msg.text,
	enable: state.isMsgShown,
});

const mapDispatchToProps = dispatch => ({
	onClose: ()=>{ dispatch(hideMessage()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(SinoPopout);
