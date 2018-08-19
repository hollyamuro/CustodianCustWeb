import React from "react";
import PropTypes from "prop-types";
import TableHeaderComponent from "./TableHeaderComponent";

import "../style.css";

const TableComponent = ({ columns, data, sort, no_data_hint, onSortClick }) => (

	(data.length === 0) ?
		(<div className="sino-table-no-data">{no_data_hint}</div>)
		: (
			<table className="sino-table">
				<thead className="sino-thead">
					<tr className="sino-tr">
						{columns.map((c) => (
							<th className="sino-th" key={c} onClick={() => { onSortClick(c.name); }}>
								<TableHeaderComponent
									text={c.show_name}
									status={(c.name === sort.sort_column) ? sort.sort_direct : 0}
								/>
							</th>
						))}
					</tr>
				</thead>
				{data.map((row) => {
					let cols = [];
					columns.map((col) => {
						cols.push(row.hasOwnProperty(col.name) ?
							(<td className={"sino-td " + "sino-td-align-" + col.align} data-title={col.show_name}>{row[col.name]}</td>) :
							(<td className="sino-td" data-title={col.show_name}><br /></td>));
					});

					return (
						<tr className="sino-tr">
							{cols}
						</tr>
					);
				})}
			</table>
		)
);

TableComponent.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.number.isRequired,
			show_name: PropTypes.number.isRequired,
		}).isRequired,
	).isRequired,
	data: PropTypes.array.isRequired,
	sort: PropTypes.shape({
		sort_column: PropTypes.number.isRequired,
		sort_direct: PropTypes.number.isRequired,
	}),
	no_data_hint: PropTypes.string.isRequired,
	onSortClick: PropTypes.func.isRequired,
};

TableComponent.defaultProps = {
	columns: [],
	data: [],
	sort: { sort_column: "", sort_direct: 0, },
	no_data_hint: "",
	onSortClick: () => { },
};

export default TableComponent;