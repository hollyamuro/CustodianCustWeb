"use strict";

import React from "react";
import PropTypes from "prop-types";

import "./SinoLoading.css";

const SinoLoading = ({ text, enable }) => {

	return ((enable) ?
		(
			<div className="mask">
				<div className="dot-circle">
					<div className="dot-animate">
						<svg height="100" width="100" >
							<circle cx="50" cy="20" r="5" fill="rgba(0, 0, 0, 1.0)" id="top" />
							<circle cx="65" cy="25" r="5" fill="rgba(0, 0, 0, 0.0)" />
							<circle cx="75" cy="35" r="5" fill="rgba(0, 0, 0, 0.0)" />
							<circle cx="80" cy="50" r="5" fill="rgba(0, 0, 0, 0.1)" id="right" />
							<circle cx="75" cy="65" r="5" fill="rgba(0, 0, 0, 0.2)" />
							<circle cx="65" cy="75" r="5" fill="rgba(0, 0, 0, 0.3)" />
							<circle cx="50" cy="80" r="5" fill="rgba(0, 0, 0, 0.4)" id="bottom" />
							<circle cx="25" cy="65" r="5" fill="rgba(0, 0, 0, 0.5)" />
							<circle cx="35" cy="75" r="5" fill="rgba(0, 0, 0, 0.6)" />
							<circle cx="20" cy="50" r="5" fill="rgba(0, 0, 0, 0.7)" id="left" />
							<circle cx="25" cy="35" r="5" fill="rgba(0, 0, 0, 0.8)" />
							<circle cx="35" cy="25" r="5" fill="rgba(0, 0, 0, 0.9)" />
						</svg>
					</div>
					<div className="loading-text">{text}</div>
				</div>
			</div>
		)
		:
		(<div></div>));
};

SinoLoading.propTypes = {
	text: PropTypes.string.isRequired,
	enable: PropTypes.bool.isRequired,
};
SinoLoading.defaultProps = {
	text: "LOADING...",
	enable: true,
};

export default SinoLoading;
