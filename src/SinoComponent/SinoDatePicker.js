"use strict";

import React from "react";
import PropTypes from "prop-types";
import DayPickerInput from "react-day-picker/DayPickerInput";

import "react-day-picker/lib/style.css";

const Style = {
	"padding-top": "8px",
};

const SinoDatePicker = ({ title, text, disable_date, onTextChange }) => (
	<div >
		{((title === "") ? "" : (<small className="form-text text-muted">{title}</small>))}
		<div style={Style}>
			<DayPickerInput
				onDayChange={onTextChange}
				value={((text === "") ? undefined : text)}
				placeholder="YYYY-MM-DD"
				dayPickerProps={{
					selectedDays: ((text === "") ? undefined : text),
					disabledDays: disable_date,
				}}
			/>
		</div>
	</div>
);

SinoDatePicker.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	disable_date: PropTypes.object.isRequired,
	onTextChange: PropTypes.func.isRequired,
};

SinoDatePicker.defaultProps = {
	title: "",
	text: "",
	disable_date: {},
	onTextChange: () => { }
};

export default SinoDatePicker;
