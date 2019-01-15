"use strict";

import { connect } from "react-redux";
import SinoTable from "../../SinoComponent/SinoTable";

const mapStateToProps = state => ({
	title: "Securities Holdings",
	data: state.holding,
	no_data_hint: "No Data.",
	column_align: {
		"Position Date": "center",
		"ID": "center",
		"Client Account": "center",
		"ISIN Code": "center",
		"Product Name": "left",
		"Nominal": "right",
		"Currency": "center",
		"Ref. Price": "right",
		"Hair Cut": "right",
		"Reference Value": "right",
		"Maturity Date": "center",
	},
	column_size: {
		"Position Date": "100px",
		"ID": "100px",
		"Client Account": "100px",
		"ISIN Code": "100x",
		"Product Name": "300px",
		"Nominal": "100x",
		"Currency": "100px",
		"Ref. Price": "100px",
		"Hair Cut": "100px",
		"Reference Value": "100px",
		"Maturity Date": "100px",
	}
});

export default connect(mapStateToProps, null)(SinoTable);