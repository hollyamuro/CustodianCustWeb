"use strict";

import React from "react";
import PropTypes from "prop-types";

import "./SinoPopout.css";

const getStyle = (type) => {
	switch (type) {
	case "INFO":
		return "secondary";
	case "ERROR":
		return "danger";
	case "SUCCESS":
		return "success";
	default:
		return "primary";
	}
};

const SinoPopout = ({ type, title, text, enable, onClose }) => {
	return ((enable) ?
		(
			<div>
				<div className="mask"></div>
				<div className="popout-wrapper">
					<div className="popout show-animate">
						<div className={"popout-wrapper-" + getStyle(type)}>
							<div className={"popout-title-wrapper-" + getStyle(type)}>{title}</div>
							<hr className="divider" />
							<div className="popout-text-wrapper">{text}</div>
							<hr className="divider" />
							<div className="align-right">
								<button className={"btn btn-" + getStyle(type)}
									id="close-button" onClick={() => {
										onClose();
									}}>Close</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
		:
		(<div></div>));
};

SinoPopout.propTypes = {
	type: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	enable: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

SinoPopout.defaultProps = {
	type: "INFO", /*INFO, ERROR, SUCCESS*/
	title: "訊息",
	text: "",
	enable: true,
	onClose: () => { },
};

export default SinoPopout;

