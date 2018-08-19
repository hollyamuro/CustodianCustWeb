import React from "react";
import Proptypes from "prop-types";

import "../style.css";

const TableTitleComponent = ({ title }) => (
	<div className="sino-table-table-title">
		<span>{title}</span>
	</div>
);

TableTitleComponent.prototype = {
	title: Proptypes.string.isRequired,
};

TableTitleComponent.defaultProps = {
	title: "123",
};

export default TableTitleComponent;


