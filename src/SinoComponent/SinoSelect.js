"use strict";

import React from "react";
import PropTypes from "prop-types";

const SinoSelect = ({ title, hint, options, selectedOption, onOptionChange }) => (
	<div>
		<small className="form-text text-muted">{title}</small>
		<select className="form-control" onChange={onOptionChange} value={selectedOption}>
			{(() => {
				if (hint && hint !== "") {
					return (<option selected value="">{hint}</option>);
				}
			})()}
			{
				(Array.isArray(options)) ? (
					//isArray
					options.map(o => <option key={o} value={o}> {o} </option>)
				) : (
						//not isArray
						Object.keys(options).map(o => <option key={o} value={o}> {options[o]} </option>)
					)

			}
		</select>
	</div>
);

SinoSelect.propTypes = {
	title: PropTypes.string.isRequired,
	hint: PropTypes.string.isRequired,
	options: PropTypes.object.isRequired,
	selectedOption: PropTypes.string.isRequired,
	onOptionChange: PropTypes.func.isRequired,
};

export default SinoSelect;