"use strict";

import React from "react";
import PropTypes from "prop-types";

const Style = {
	"margin": "5px",
	"padding": "3px 10px 0px 5px",
	"display": "inline-block",
	"border-radius": "100px",
	"min-width": "100px",
};

const IconStype = {
	"opacity": "0.6",
	"padding": "5px 3px 5px 0px",
};

const SinoRoundButton = ({ text, octicons_icon, onButtonClick }) => (
	<button
		class="btn btn btn-outline-secondary"
		style={Style}
		onClick={onButtonClick} >
		{(octicons_icon !== "") ?
			(<img style={IconStype} src={"/svg/" + octicons_icon + ".svg"} />) :
			("")
		}
		{text}
	</button>
);

SinoRoundButton.propTypes = {
	text: PropTypes.string.isRequired,
	octicons_icon: PropTypes.string.isRequired,
	onButtonClick: PropTypes.func.isRequired,
};

SinoRoundButton.defaultProps = {
	text: "",
	octicons_icon: "",
	onButtonClick: () => { }
};

export default SinoRoundButton;
