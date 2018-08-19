"use strict";

import { connect } from "react-redux";
import SinoTable from "../../SinoComponent/SinoTable";

const mapStateToProps = state => ({
	title: "Coupon Payment in 1 week",
	data: state.coupon,
	no_data_hint: "No Data.",
	column_align: {
		"Payment Date (Estimate)": "left",
		"Product Code": "center",
		"Product Name": "left",
	}
});

export default connect(mapStateToProps, null)(SinoTable);