"use strict";

import { connect } from "react-redux";
import TableTitleComponent from "../components/TableTitleComponent";

const mapStateToProps = state => ({
	title: state.title,
});

export default connect(mapStateToProps, null)(TableTitleComponent);
