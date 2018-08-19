"use strict";

import React from "react";
import PropTypes from "prop-types";
import DayPickerInput from "react-day-picker/DayPickerInput";

import "react-day-picker/lib/style.css";

const Style = {
	"padding-top": "8px",
};

const TitleStyle = {
	"padding-right": "10px",
	"opacity": "0.8",
};
const SinoDatePicker = ({ title, date, onFromChange, onToChange }) => (
	<div style={Style}>
		{(title !== "") ? (<span style={TitleStyle}>{title}</span>) : ("")}
		<div className="inline">
			<div className="inline" >
				<small className="form-text text-muted">From</small>
				<DayPickerInput
					onDayChange={onFromChange}
					value={date.from}
					placeholder="YYYY-MM-DD"
				/>
			</div>
			<span>{" - "}</span>
			<div className="inline" >
				<small className="form-text text-muted">To</small>
				<DayPickerInput
					onDayChange={onToChange}
					value={date.to}
					placeholder="YYYY-MM-DD"
				/>
			</div>
		</div>
	</div>
);

SinoDatePicker.propTypes = {
	title: PropTypes.string.isRequired,
	date: PropTypes.shape({
		from: PropTypes.string.isRequired,
		to: PropTypes.string.isRequired,
	}).isRequired,
	onFromChange: PropTypes.func.isRequired,
	onToChange: PropTypes.func.isRequired,
};

SinoDatePicker.defaultProps = {
	title: "",
	date: {
		from: "",
		to: "",
	},
	onFromChange: (from) => { },
	onToChange: (to) => { },
};

export default SinoDatePicker;

