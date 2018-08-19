"use strict";

import { connect } from "react-redux";
import SinoTable from "../../SinoComponent/SinoTable";

const mapStateToProps = state => ({
	title: "Cash",
	data: state.notChargeOff.cash,
	no_data_hint: "No Data.",
	column_align: {
		"Trade Date": "center",
		"Value Date": "center",
		"Product Code": "center",
		"Product Name": "left",
		"Description": "left",
		"Currency": "center",
		"Amount": "right",
	}
});

export default connect(mapStateToProps, null)(SinoTable);
