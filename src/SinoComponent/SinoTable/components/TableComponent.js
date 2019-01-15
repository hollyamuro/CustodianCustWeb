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
					<tr className="sino-tr" key="thead-row">
						{columns.map((c, colIdx) => (
							<th key={"th-" + colIdx}
								style={{ minWidth: (c.size === "") ? "auto" : c.size }}
								className="sino-th"
								onClick={() => { onSortClick(c.name); }}
							>
								<TableHeaderComponent key={"th-component-" + colIdx}
									text={c.show_name}
									status={(c.name === sort.sort_column) ? sort.sort_direct : 0}
								/>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, rowIdx) => {
						let cols = [];
						columns.map((col, colIdx) => {
							cols.push(row.hasOwnProperty(col.name) ?
								(<td key={"col-" + rowIdx + '-' + colIdx}
									style={{ minWidth: (col.size === "") ? "auto" : col.size }}
									className={"sino-td " + "sino-td-align-" + col.align}
									data-title={col.show_name}
								>
									{row[col.name]}
								</td>)
								:
								(<td key={"col-" + rowIdx + '-' + colIdx}
									style={{ minWidth: (col.size === "") ? "auto" : col.size }}
									className="sino-td" data-title={col.show_name}
								>
									<br />
								</td>)
							);
						});

						return (
							<tr className="sino-tr" key={"row-" + rowIdx}>
								{cols}
							</tr>
						);
					})}
				</tbody>
			</table>
		)
);

TableComponent.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			show_name: PropTypes.string.isRequired,
		}).isRequired,
	).isRequired,
	data: PropTypes.array.isRequired,
	sort: PropTypes.shape({
		sort_column: PropTypes.string.isRequired,
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