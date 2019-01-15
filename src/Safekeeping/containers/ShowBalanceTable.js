"use strict";

import { connect } from "react-redux";
import SinoTable from "../../SinoComponent/SinoTable";

const mapStateToProps = state => ({
	title: "Portfolio Summary",
	data: state.balance,
	no_data_hint: "No Data.",
	column_align: {
		"Position Date": "center",
		"ID": "left",
		"Client Acoount": "center",
		"Currency": "center",
		"Amount": "right",
	}
});

export default connect(mapStateToProps, null)(SinoTable);