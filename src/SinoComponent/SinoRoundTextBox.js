"use strict";

import React from "react";
import PropTypes from "prop-types";

const Style = {
	"padding": "0px 20px",
	"display": "inline-block",
	"border-radius": "100px",
};

const SinoRoundTextBox = ({ title, hint, text, onTextChange }) => (
	<div>
		{((title === "") ? "" : (<small className="form-text text-muted">{title}</small>))}
		<input style={Style}
			className="form-control"
			type='text'
			onChange={onTextChange}
			placeholder={hint}
			value={text}
		/>
	</div>
);

SinoRoundTextBox.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	onTextChange: PropTypes.func.isRequired,
};

export default SinoRoundTextBox;
