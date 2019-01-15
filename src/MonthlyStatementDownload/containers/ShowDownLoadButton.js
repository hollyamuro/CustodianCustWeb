"use strict";

import { connect } from "react-redux";
import DownLoadButton from "../components/DownLoadButton";

const mapStateToProps = state => ({
	YM: state.ym
});

export default connect(mapStateToProps, null)(DownLoadButton);
