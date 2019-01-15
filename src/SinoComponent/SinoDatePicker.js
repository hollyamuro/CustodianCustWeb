"use strict";

import React from "react";
import PropTypes from "prop-types";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate, } from 'react-day-picker/moment';

import "react-day-picker/lib/style.css";

const style = {
	"display": "inline-block",
};

const componentStyle = {
	"paddingTop": "8px",
};

const SinoDatePicker = ({ title, text, disable_date, onTextChange }) => (
	<div style={style}>
		{((title === "") ? "" : (<small className="form-text text-muted">{title}</small>))}
		<div style={componentStyle}>
			<DayPickerInput
				onDayChange={onTextChange}
				value={text}
				format="YYYY-MM-DD"
				formatDate={formatDate}
				parseDate={parseDate}
				placeholder="YYYY-MM-DD"
				dayPickerProps={{
					selectedDays: text,
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
