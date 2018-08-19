"use strict";

import { connect } from "react-redux";
import SinoTable from "../../SinoComponent/SinoTable";

const mapStateToProps = state => ({
	title: "Securities Holdings",
	data: state.chargeOff.holdings,
	no_data_hint: "No Data.",
	column_align: {
		"Trade Date": "center",
		"Value Date": "center",
		"Buy/Sell": "center",
		"Product Type": "center",
		"Product Code": "center",
		"Product Name": "left",
		"Currency": "center",
		"Nominal": "right",
	}
});

export default connect(mapStateToProps, null)(SinoTable);