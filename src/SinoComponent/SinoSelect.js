"use strict";

import React from "react";
import PropTypes from "prop-types";

const style = {
	"display": "inline-block",
};

const SinoSelect = ({ title, hint, options, selectedOption, onOptionChange }) => (
	<div style={style}>
		<small className="form-text text-muted">{title}</small>
		<select className="form-control" onChange={onOptionChange} value={selectedOption}>
			{(() => {
				if (hint && hint !== "") {
					return (<option value={hint}>{hint}</option>);
				}
			})()}
			{options.map(o => <option key={o} value={o}> {o} </option>)}
		</select>
	</div>
);

SinoSelect.propTypes = {
	title: PropTypes.string.isRequired,
	hint: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	selectedOption: PropTypes.string.isRequired,
	onOptionChange: PropTypes.func.isRequired,
};

SinoSelect.defaultProps = {
	title: "",
	hint: "",
	options: [],
	selectedOption: "",
	onOptionChange: () => { },
};


export default SinoSelect;