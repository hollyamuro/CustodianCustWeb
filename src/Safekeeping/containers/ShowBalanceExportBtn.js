"use strict";

import { connect } from "react-redux";
import SinoExportXLSX from "../../SinoComponent/SinoExportXLSX";
import { getXLSXFormat } from '../utils/helper'

const mapStateToProps = state => ({
	file_name: "PortfolioSummaryExport.xlsx",
	data: getXLSXFormat(state.balance),
});

export default connect(mapStateToProps, null)(SinoExportXLSX);