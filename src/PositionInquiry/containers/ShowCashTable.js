"use strict";

import { connect } from "react-redux";
import SinoTable from "../../SinoComponent/SinoTable";

const mapStateToProps = state => ({
	title: "Cash",
	data: state.position.cash,
	no_data_hint: "No Data.",
	column_align: {
		"Currency": "center",
		"Balance": "right",
	}
});

export default connect(mapStateToProps, null)(SinoTable);
