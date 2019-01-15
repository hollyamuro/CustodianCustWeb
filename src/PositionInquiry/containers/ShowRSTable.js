"use strict";

import { connect } from "react-redux";
import SinoTable from "../../SinoComponent/SinoTable";

const mapStateToProps = state => ({
	title: "Reverse Repo",
	data: state.position.rs,
	no_data_hint: "No Data.",
	column_align: {
		"Product Code": "center",
		"Product Name": "left",
		"Currency": "center",
		"Nominal": "right",
		"Reference Price": "right",
		"Reference Value": "right",
	}
});

export default connect(mapStateToProps, null)(SinoTable);
