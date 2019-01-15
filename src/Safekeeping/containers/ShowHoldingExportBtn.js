"use strict";

import { connect } from "react-redux";
import SinoExportXLSX from "../../SinoComponent/SinoExportXLSX";
import { getXLSXFormat } from '../utils/helper'

const mapStateToProps = state => ({
	file_name: "SecuritiesHoldingsExport.xlsx",
	data: getXLSXFormat(state.holding),
});

export default connect(mapStateToProps, null)(SinoExportXLSX);