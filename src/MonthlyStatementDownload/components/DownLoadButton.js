"use strict";

import React, { Component } from "react";
import Proptypes from "prop-types";
import SinoRoundButton from "../../SinoComponent/SinoRoundButton";

class DownLoadButton extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<form
				action={location.protocol + "//" + location.host + "/S001C002F001/download"}
				method="post"
			>
				<SinoRoundButton
					text={"Download"}
					octicons_icon={"cloud-download"}
				/>
				<input type="hidden" id="YM" name="YM" value={this.props.YM} hidden />
			</form>
		);
	}
}

DownLoadButton.propTypes = {
	YM: Proptypes.string.isRequired,
};

DownLoadButton.defaultProps = {
	YM: "",
};

export default DownLoadButton;