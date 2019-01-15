"use strict";

import React from "react";
import PropTypes from "prop-types";

const style = {
	"display": "inline-block",
};

const inputStyle = {
	"padding": "0px 10px",
	"display": "inline-block",
};

const SinoTextBox = ({ title, hint, text, onTextChange }) => (
	<div style={style}>
		{((title === "") ? "" : (<small className="form-text text-muted">{title}</small>))}
		<input style={inputStyle}
			className="form-control"
			type='text'
			onChange={onTextChange}
			placeholder={hint}
			value={text}
		/>
	</div>
);

SinoTextBox.propTypes = {
	title: PropTypes.string.isRequired,
	hint: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	onTextChange: PropTypes.func.isRequired,
};

SinoTextBox.defaultProps = {
	title: "",
	hint: "",
	text: "",
	onTextChange: () => { },
};

export default SinoTextBox;
