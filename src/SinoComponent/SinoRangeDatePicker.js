"use strict";

import React from "react";
import PropTypes from "prop-types";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate, } from 'react-day-picker/moment';

import "react-day-picker/lib/style.css";

const Style = {
	"display": "inline-block",
	"paddingTop": "8px",
};

const TitleStyle = {
	"paddingRight": "10px",
	"opacity": "0.8",
};

const SinoRangeDatePicker = ({ title, show_hint, date, onFromChange, onToChange }) => (
	<div style={Style}>
		{(title !== "") ? (<span style={TitleStyle}>{title}</span>) : ("")}
		<div className="inline">
			<div className="inline" >
				{show_hint ? (<small className="form-text text-muted">From</small>) : ""}
				<DayPickerInput
					onDayChange={onFromChange}
					value={date.from}
					format="YYYY-MM-DD"
					formatDate={formatDate}
					parseDate={parseDate}
					placeholder="YYYY-MM-DD"
				/>
			</div>
			<span>{" - "}</span>
			<div className="inline" >
				{show_hint ? (<small className="form-text text-muted">To</small>) : ""}
				<DayPickerInput
					onDayChange={onToChange}
					value={date.to}
					format="YYYY-MM-DD"
					formatDate={formatDate}
					parseDate={parseDate}
					placeholder="YYYY-MM-DD"
				/>
			</div>
		</div>
	</div>
);

SinoRangeDatePicker.propTypes = {
	title: PropTypes.string.isRequired,
	show_hint: PropTypes.bool.isRequired,
	date: PropTypes.shape({
		from: PropTypes.string.isRequired,
		to: PropTypes.string.isRequired,
	}).isRequired,
	onFromChange: PropTypes.func.isRequired,
	onToChange: PropTypes.func.isRequired,
};

SinoRangeDatePicker.defaultProps = {
	title: "",
	show_hint: true,
	date: {
		from: "",
		to: "",
	},
	onFromChange: (from) => { },
	onToChange: (to) => { },
};

export default SinoRangeDatePicker;

