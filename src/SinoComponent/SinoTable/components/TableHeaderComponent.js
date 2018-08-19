import React from "react";
import PropTypes from "prop-types";

import "../style.css";

const TableHeaderComponent = ({ text, status, onItemClick }) => (
	<div>
		<span className="sino-table-header-sort">{text}</span>
		{(status === 0) ? (
			<div className="inline">
				<img className="sino-table-header-sort-none" src="/svg/triangle-down.svg" />
				<img className="sino-table-header-sort-none" src="/svg/triangle-up.svg" />
			</div>
		) : ("")}
		{(status === 1) ? (
			<div className="inline">
				<img className="sino-table-header-sort-show" src="/svg/triangle-down.svg" />
				<img className="sino-table-header-sort-hide" src="/svg/triangle-up.svg" />
			</div>
		) : ("")}
		{(status === -1) ? (
			<div className="inline">
				<img className="sino-table-header-sort-show" src="/svg/triangle-up.svg" />
				<img className="sino-table-header-sort-hide" src="/svg/triangle-down.svg" />
			</div>
		) : ("")}
	</div>
);

TableHeaderComponent.propTypes = {
	text: PropTypes.string.isRequired,
	status: PropTypes.number.isRequired,
};

TableHeaderComponent.defaultProps = {
	text: "",
	status: 0, //{asc=1, desc=-1, none=0}
};

export default TableHeaderComponent;