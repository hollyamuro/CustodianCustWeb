"use strict";

import { connect } from "react-redux";
import SinoLoading from "../../SinoComponent/SinoLoading";

const mapStateToProps = state => ({
	text: "Loading...",
	enable: state.isLoading,
});

export default connect(mapStateToProps, null)(SinoLoading);
